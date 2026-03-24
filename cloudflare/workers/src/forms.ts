import { Hono } from "hono";
import type { Bindings } from "./types";
import { createResendMailer, createGmailSmtpMailer, type Mailer, createMailgunMailer } from "./mailer";
import { buildEmailHtml, buildEmailText, type EmailTemplateInput, type StoredFile } from "./templates";

const forms = new Hono<{ Bindings: Bindings }>();

// 🔒 Allowed forms config
const ALLOWED_FORMS: Record<
	string,
	{
		recipientEnv: "FORMS_RECIPIENT_CAREER" | "FORMS_RECIPIENT_AUDIT";
		maxFields: number;
		maxFileSizeMB: number;
		subject?: string;
	}
> = {
	career: {
		recipientEnv: "FORMS_RECIPIENT_CAREER",
		maxFields: 10,
		maxFileSizeMB: 5,
		subject: "New career form submission",
	},
	audit: {
		recipientEnv: "FORMS_RECIPIENT_AUDIT",
		maxFields: 15,
		maxFileSizeMB: 5,
		subject: "New audit form submission",
	},
};

const MAX_FILENAME_LENGTH = 120;
const SAFE_FILENAME_RE = /[^A-Za-z0-9._-]/g;

const toSafeFilename = (name: string) => {
	const sanitized = name.replace(SAFE_FILENAME_RE, "_").replace(/[_]+/g, "_");
	return sanitized.slice(0, MAX_FILENAME_LENGTH) || "file";
};

let ACTIVE_MAILER: Mailer | null = null;

const getActiveMailer = (env: Bindings): Mailer => {
	// return getResendMailer(env);
	// return getSMTPMailer(env);
	return getMailgunMailer(env);
};

const getResendMailer = (env: Bindings): Mailer => {
	if (!env.RESEND_API_KEY || !env.RESEND_FROM) {
		throw new Error("Email not configured");
	}

	if (!ACTIVE_MAILER) {
		ACTIVE_MAILER = createResendMailer({
			apiKey: env.RESEND_API_KEY,
			from: env.RESEND_FROM,
		});
	}

	return ACTIVE_MAILER;
}

const getMailgunMailer = (env: Bindings): Mailer => {
	if (!env.MAILGUN_API_KEY
		|| !env.MAILGUN_DOMAIN ||
		!env.MAILGUN_FROM || !env.MAILGUN_BASE_URL) {
		throw new Error("SMTP configs not found");
	}

	if (!ACTIVE_MAILER) {
		ACTIVE_MAILER = createMailgunMailer({
			apiKey: env.MAILGUN_API_KEY,
			domain: env.MAILGUN_DOMAIN,
			from: env.MAILGUN_FROM,
			baseUrl: env.MAILGUN_BASE_URL
		})
	}

	return ACTIVE_MAILER;
}

const getSMTPMailer = (env: Bindings): Mailer => {
	if (!env.GMAIL_SMTP_USER
		|| !env.GMAIL_SMTP_APP_PASSWORD ||
		!env.GMAIL_SMTP_FROM) {
		throw new Error("SMTP configs not found");
	}

	if (!ACTIVE_MAILER) {
		ACTIVE_MAILER = createGmailSmtpMailer({
			user: env.GMAIL_SMTP_USER,
			appPassword: env.GMAIL_SMTP_APP_PASSWORD,
			from: env.GMAIL_SMTP_FROM
		});
	}

	return ACTIVE_MAILER;
}

// POST FORMS 
forms.post("/:formId", async (c) => {
	const formId = c.req.param("formId");

	// check if form is valid type
	const config = ALLOWED_FORMS[formId];
	if (!config) {
		return c.json({ error: "Invalid form" }, 404);
	}

	// get and check if recipient email present
	const recipient = c.env[config.recipientEnv];
	if (!recipient) {
		return c.json({ error: "Recipient not configured" }, 500);
	}

	// check if R2 bucket present
	if (!c.env.FORMS_BUCKET) {
		return c.json({ error: "Storage not configured" }, 500);
	}

	// parse form data and validate
	const formData = await c.req.formData();
	if (formData.get("time")) {
		return c.json({ error: "Spam detected" }, 400);
	}

	const fields: Record<string, string | string[]> = {};
	const files: File[] = [];

	for (const [key, value] of formData.entries()) {
		if (value instanceof File) {
			const maxSizeBytes = config.maxFileSizeMB * 1024 * 1024;

			if (value.size > maxSizeBytes) {
				return c.json(
					{ error: `File ${value.name} exceeds size limit` },
					400
				);
			}

			files.push(value);
		} else {
			if (fields[key]) {
				const current = fields[key];
				if (Array.isArray(current)) {
					current.push(value);
				} else {
					fields[key] = [current, value];
				}
			} else {
				fields[key] = value;
			}
		}
	}

	if (Object.keys(fields).length > config.maxFields) {
		return c.json({ error: "Too many fields" }, 400);
	}

	// prepare submission metadata
	const submissionId = crypto.randomUUID();
	const submittedAt = new Date().toISOString();
	const subject = config.subject ?? `New ${formId} form submission`;
	const userAgent = c.req.header("user-agent") ?? null;
	const ip = c.req.header("cf-connecting-ip") ?? null;
	const r2BaseUrl = c.env.FORMS_R2_PUBLIC_BASE_URL;

	const backgroundTask = async () => {
		const baseKey = `forms/${formId}/${submissionId}`;
		const storedFiles: StoredFile[] = files.map((file, index) => {
			const safeName = toSafeFilename(file.name);
			const fileKey = `${baseKey}/files/${index + 1}-${safeName}`;
			return {
				key: fileKey,
				name: file.name,
				size: file.size,
				type: file.type,
			};
		});

		const uploadTask = async () => {
			try {
				await Promise.all(
					files.map((file, index) =>
						c.env.FORMS_BUCKET.put(storedFiles[index].key, file.stream(), {
							httpMetadata: {
								contentType: file.type || "application/octet-stream",
							},
							customMetadata: {
								originalName: file.name,
								size: String(file.size),
							},
						})
					)
				);

				const submission = {
					formId,
					submissionId,
					submittedAt,
					recipient,
					fields,
					files: storedFiles,
					userAgent,
					ip,
				};

				await c.env.FORMS_BUCKET.put(
					`${baseKey}/submission.json`,
					JSON.stringify(submission, null, 2),
					{
						httpMetadata: {
							contentType: "application/json",
						},
					}
				);
			} catch (error) {
				console.error("Failed to store form submission", error);
				throw error;
			}
		};

		const emailTask = async () => {
			try {
				const mailer = getActiveMailer(c.env);
				const emailInput: EmailTemplateInput = {
					formId,
					submissionId,
					submittedAt,
					fields,
					files: storedFiles,
					userAgent,
					ip,
					r2BaseUrl,
				};

				await mailer.send({
					to: recipient,
					subject,
					html: buildEmailHtml(emailInput),
					text: buildEmailText(emailInput),
				});
			} catch (error) {
				console.error("Failed to send email", error);
				throw error;
			}
		};

		const results = await Promise.allSettled([uploadTask(), emailTask()]);
		for (const result of results) {
			if (result.status === "rejected") {
				console.error("Background task failed", result.reason);
			}
		}
	};

	if (c.executionCtx?.waitUntil) {
		c.executionCtx.waitUntil(backgroundTask());
	} else {
		await backgroundTask();
	}

	// respond
	return c.json({
		success: true,
		formId,
		submissionId,
		receivedFields: Object.keys(fields),
		fileCount: files.length,
	});
});

export { forms };
