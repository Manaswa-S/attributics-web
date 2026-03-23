import { Hono } from "hono";
import type { Bindings } from "./types";
import { createResendMailer, type Mailer } from "./mailer";

const forms = new Hono<{ Bindings: Bindings }>();

const BRAND_COLOR = "#ff6658";

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

type StoredFile = {
  key: string;
  name: string;
  size: number;
  type: string;
};

const escapeHtml = (value: string) => {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
};

const formatFieldValue = (value: string | string[]) => {
  if (Array.isArray(value)) {
    return value.join(", ");
  }
  return value;
};

const buildFileUrl = (baseUrl: string | undefined, key: string) => {
  if (!baseUrl) {
    return null;
  }
  const trimmed = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
  return `${trimmed}/${key}`;
};

type EmailTemplateInput = {
  formId: string;
  submissionId: string;
  submittedAt: string;
  fields: Record<string, string | string[]>;
  files: StoredFile[];
  userAgent: string | null;
  ip: string | null;
  r2BaseUrl?: string;
};

const buildEmailHtml = (input: EmailTemplateInput) => {
  const fieldRows = Object.entries(input.fields)
    .map(([key, value]) => {
      const label = escapeHtml(key);
      const display = escapeHtml(formatFieldValue(value));
      return `
        <tr>
          <td style="padding:10px 12px;border:1px solid #eee;font-weight:600;vertical-align:top;">${label}</td>
          <td style="padding:10px 12px;border:1px solid #eee;">${display}</td>
        </tr>
      `;
    })
    .join("");

  const fieldsSection = fieldRows
    ? `
      <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
        ${fieldRows}
      </table>
    `
    : `
      <p style="margin:0;color:#666;">No fields were submitted.</p>
    `;

  const fileRows = input.files
    .map((file) => {
      const sizeKb = Math.round(file.size / 1024);
      const safeName = escapeHtml(file.name);
      const key = escapeHtml(file.key);
      const url = buildFileUrl(input.r2BaseUrl, file.key);
      const fileLabel = url
        ? `<a href="${url}" style="color:${BRAND_COLOR};text-decoration:none;">${safeName}</a>`
        : safeName;

      const keyLine = url
        ? `R2 key: <code style="font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;">${key}</code>`
        : `R2 key: <code style="font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;">${key}</code>`;

      return `
        <tr>
          <td style="padding:10px 12px;border:1px solid #eee;">
            <div style="font-weight:600;">${fileLabel}</div>
            <div style="color:#666;font-size:13px;margin-top:4px;">${sizeKb} KB · ${escapeHtml(file.type || "unknown")}</div>
            <div style="color:#999;font-size:12px;margin-top:6px;">${keyLine}</div>
          </td>
        </tr>
      `;
    })
    .join("");

  const filesSection = input.files.length
    ? `
      <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
        ${fileRows}
      </table>
    `
    : `
      <p style="margin:0;color:#666;">No files uploaded.</p>
    `;

  const metadataRows = [
    { label: "Form", value: input.formId },
    { label: "Submission ID", value: input.submissionId },
    { label: "Submitted At", value: input.submittedAt },
    { label: "IP Address", value: input.ip || "Unavailable" },
    { label: "User Agent", value: input.userAgent || "Unavailable" },
  ]
    .map(({ label, value }) => {
      return `
        <tr>
          <td style="padding:8px 12px;border:1px solid #eee;font-weight:600;">${escapeHtml(
        label
      )}</td>
          <td style="padding:8px 12px;border:1px solid #eee;">${escapeHtml(
        value
      )}</td>
        </tr>
      `;
    })
    .join("");

  return `
<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#fff;color:#111;font-family: 'Helvetica Neue', Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#fff;padding:24px 0;">
      <tr>
        <td align="center">
          <table width="640" cellpadding="0" cellspacing="0" style="background:#fff;border:1px solid #f0f0f0;border-radius:12px;overflow:hidden;">
            <tr>
              <td style="padding:28px 28px 0 28px;">
                <div style="font-size:13px;letter-spacing:0.1em;text-transform:uppercase;color:${BRAND_COLOR};font-weight:700;">New Submission</div>
                <h1 style="margin:12px 0 8px 0;font-size:24px;">${escapeHtml(
    input.formId
  )} form received</h1>
                <p style="margin:0;color:#666;font-size:14px;">Submitted at ${escapeHtml(
    input.submittedAt
  )}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 28px;">
                <h2 style="margin:0 0 12px 0;font-size:16px;color:${BRAND_COLOR};">Form fields</h2>
                ${fieldsSection}
              </td>
            </tr>
            <tr>
              <td style="padding:0 28px 20px 28px;">
                <h2 style="margin:0 0 12px 0;font-size:16px;color:${BRAND_COLOR};">Files</h2>
                ${filesSection}
              </td>
            </tr>
            <tr>
              <td style="padding:0 28px 28px 28px;">
                <h2 style="margin:0 0 12px 0;font-size:16px;color:${BRAND_COLOR};">Metadata</h2>
                <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                  ${metadataRows}
                </table>
              </td>
            </tr>
          </table>
          <p style="margin:16px 0 0 0;color:#999;font-size:12px;">This email was generated automatically.</p>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
};

const buildEmailText = (input: EmailTemplateInput) => {
  const lines: string[] = [];
  lines.push(`New ${input.formId} form submission`);
  lines.push(`Submitted at: ${input.submittedAt}`);
  lines.push(`Submission ID: ${input.submissionId}`);
  lines.push("");
  lines.push("Fields:");

  const entries = Object.entries(input.fields);
  if (!entries.length) {
    lines.push("(No fields submitted)");
  } else {
    for (const [key, value] of entries) {
      lines.push(`- ${key}: ${formatFieldValue(value)}`);
    }
  }

  lines.push("");
  lines.push("Files:");

  if (!input.files.length) {
    lines.push("(No files uploaded)");
  } else {
    for (const file of input.files) {
      const sizeKb = Math.round(file.size / 1024);
      const url = buildFileUrl(input.r2BaseUrl, file.key);
      if (url) {
        lines.push(`- ${file.name} (${sizeKb} KB) ${url}`);
      } else {
        lines.push(`- ${file.name} (${sizeKb} KB) R2 key: ${file.key}`);
      }
    }
  }

  lines.push("");
  lines.push("Metadata:");
  lines.push(`- IP Address: ${input.ip || "Unavailable"}`);
  lines.push(`- User Agent: ${input.userAgent || "Unavailable"}`);

  return lines.join("\n");
};

let ACTIVE_MAILER: Mailer | null = null;

const getActiveMailer = (env: Bindings): Mailer => {
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
};

// 🧠 Forms endpoint
forms.post("/:formId", async (c) => {
  const formId = c.req.param("formId");

  // ❌ Validate formId
  const config = ALLOWED_FORMS[formId];
  if (!config) {
    return c.json({ error: "Invalid form" }, 404);
  }

  const recipient = c.env[config.recipientEnv];
  if (!recipient) {
    return c.json({ error: "Recipient not configured" }, 500);
  }

  if (!c.env.FORMS_BUCKET) {
    return c.json({ error: "Storage not configured" }, 500);
  }

  // 📦 Parse form data
  const formData = await c.req.formData();

  // 🛑 Honeypot check (anti-spam)
  if (formData.get("company")) {
    return c.json({ error: "Spam detected" }, 400);
  }

  const fields: Record<string, string | string[]> = {};
  const files: File[] = [];

  for (const [key, value] of formData.entries()) {
    if (value instanceof File) {
      // 📁 File validation
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

  // 🛑 Field count validation
  if (Object.keys(fields).length > config.maxFields) {
    return c.json({ error: "Too many fields" }, 400);
  }

  const submissionId = crypto.randomUUID();
  const submittedAt = new Date().toISOString();
  const baseKey = `forms/${formId}/${submissionId}`;

  const storedFiles: StoredFile[] = [];

  try {
    for (const [index, file] of files.entries()) {
      const safeName = toSafeFilename(file.name);
      const fileKey = `${baseKey}/files/${index + 1}-${safeName}`;

      await c.env.FORMS_BUCKET.put(fileKey, file.stream(), {
        httpMetadata: {
          contentType: file.type || "application/octet-stream",
        },
        customMetadata: {
          originalName: file.name,
          size: String(file.size),
        },
      });

      storedFiles.push({
        key: fileKey,
        name: file.name,
        size: file.size,
        type: file.type,
      });
    }

    const submission = {
      formId,
      submissionId,
      submittedAt,
      recipient,
      fields,
      files: storedFiles,
      userAgent: c.req.header("user-agent"),
      ip: c.req.header("cf-connecting-ip"),
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
    return c.json({ error: "Failed to store submission" }, 500);
  }

  const subject = config.subject ?? `New ${formId} form submission`;
  const userAgent = c.req.header("user-agent") ?? null;
  const ip = c.req.header("cf-connecting-ip") ?? null;
  const r2BaseUrl = c.env.FORMS_R2_PUBLIC_BASE_URL;

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
    return c.json({ error: "Failed to send email" }, 500);
  }

  // ✅ Response
  return c.json({
    success: true,
    formId,
    submissionId,
    receivedFields: Object.keys(fields),
    fileCount: files.length,
  });
});

export { forms };
