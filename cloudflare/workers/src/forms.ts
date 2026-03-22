import { Hono } from "hono";
import type { Bindings } from "./types";

const forms = new Hono<{ Bindings: Bindings }>();

// 🔒 Allowed forms config
const ALLOWED_FORMS: Record<
  string,
  { recipient: string; maxFields: number; maxFileSizeMB: number }
> = {
  career: {
    recipient: "careers@yourcompany.com",
    maxFields: 10,
    maxFileSizeMB: 5,
  },
  audit: {
    recipient: "audit@yourcompany.com",
    maxFields: 15,
    maxFileSizeMB: 5,
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

// 🧠 Forms endpoint
forms.post("/:formId", async (c) => {
  const formId = c.req.param("formId");

  // ❌ Validate formId
  const config = ALLOWED_FORMS[formId];
  if (!config) {
    return c.json({ error: "Invalid form" }, 404);
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
      recipient: config.recipient,
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

  // 🧠 TODO: Send email via Resend

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
