require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const marked = require("marked");
const rateLimit = require("express-rate-limit");
const nodemailer = require("nodemailer");
const multer = require("multer");

const app = express();
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://attributics-demo.vercel.app"
  ]
}));
app.set("trust proxy", 1);
app.use(express.json({ limit: "2mb" }));

// ─── Attachment config ────────────────────────────────────────────────────────

const MAX_ATTACHMENT_SIZE_BYTES = 2 * 1024 * 1024; // 2 MB per file
const MAX_ATTACHMENTS = 5;

const ALLOWED_MIME_TYPES = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "text/plain",
  "text/csv",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
]);

// Multer: store uploads in memory so we can attach them to emails directly.
// Files exceeding the size limit are rejected before reaching the route handler.
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: MAX_ATTACHMENT_SIZE_BYTES,
    files: MAX_ATTACHMENTS,
  },
  fileFilter(_req, file, cb) {
    if (ALLOWED_MIME_TYPES.has(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`File type "${file.mimetype}" is not allowed.`));
    }
  },
});

// ─── Email adapters ───────────────────────────────────────────────────────────
// To swap providers, replace `activeMailer` with a different adapter.
// Each adapter must implement: sendFormEmail({ formId, fields, submittedAt, attachments, recipientEmail })
// `attachments` is an array of multer file objects (may be empty).

const smtpMailer = {
  name: "smtp",
  async sendFormEmail({ formId, fields, submittedAt, attachments = [], recipientEmail }) {
    const smtpPort = Number(process.env.SMTP_PORT) || 587;
    const smtpSecure = process.env.SMTP_SECURE
      ? process.env.SMTP_SECURE === "true"
      : smtpPort === 465;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: smtpPort,
      // Explicit boolean to avoid "wrong version number" TLS errors from string envs.
      // true for 465, false for 587 (unless overridden by SMTP_SECURE).
      secure: smtpSecure,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const fieldLines = Object.entries(fields)
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n");

    // Map multer file objects → nodemailer attachment format
    const emailAttachments = attachments.map((file) => ({
      filename: file.originalname,
      content: file.buffer,
      contentType: file.mimetype,
    }));

    await transporter.sendMail({
      from: `"Attributics Forms" <${process.env.SMTP_FROM}>`,
      to: recipientEmail,
      subject: `New ${formId} submission`,
      text: `New submission from form: ${formId}\nSubmitted at: ${submittedAt}\n\n${fieldLines}`,
      html: buildEmailHtml(formId, fields, submittedAt, attachments),
      attachments: emailAttachments,
    });
  },
};


// Swap this to resendMailer, postmarkMailer, etc. when ready
const activeMailer = smtpMailer;

// ─── Email HTML builder ───────────────────────────────────────────────────────

function buildEmailHtml(formId, fields, submittedAt, attachments = []) {
  const rows = Object.entries(fields)
    .map(
      ([k, v]) => `
      <tr>
        <td style="padding:10px 16px;background:#f8f8f8;border-radius:6px;font-weight:600;color:#555;font-size:13px;text-transform:capitalize;white-space:nowrap">${k}</td>
        <td style="padding:10px 16px;color:#111;font-size:14px">${String(v).replace(/\n/g, "<br/>")}</td>
      </tr>`
    )
    .join("<tr><td colspan='2' style='height:6px'></td></tr>");

  const attachmentSection =
    attachments.length > 0
      ? `
      <div style="margin-top:24px;padding-top:16px;border-top:1px solid #eee">
        <p style="margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#888">
          Attachments (${attachments.length})
        </p>
        <ul style="margin:0;padding:0;list-style:none">
          ${attachments
            .map(
              (f) => `
            <li style="padding:6px 0;font-size:13px;color:#555">
              📎 ${f.originalname}
              <span style="color:#aaa;font-size:11px;margin-left:8px">${(f.size / 1024).toFixed(1)} KB · ${f.mimetype}</span>
            </li>`
            )
            .join("")}
        </ul>
      </div>`
      : "";

  return `
    <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:32px 24px;background:#fff">
      <div style="margin-bottom:24px;padding-bottom:16px;border-bottom:2px solid #FF5A36">
        <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#FF5A36">Attributics</p>
        <h1 style="margin:6px 0 0;font-size:20px;color:#111">New <strong>${formId}</strong> submission</h1>
      </div>
      <table style="width:100%;border-collapse:separate;border-spacing:0 4px">
        ${rows}
      </table>
      ${attachmentSection}
      <p style="margin-top:32px;font-size:11px;color:#aaa">Submitted at ${submittedAt}</p>
      <p style="margin-top:32px;font-size:15px;color:#aaa">All attachments are unverified. Please be aware of fishing attacks.</p>
    </div>
  `;
}

// ─── Rate limiter ─────────────────────────────────────────────────────────────

const formLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many submissions. Please try again later." },
});

// ─── Helpers ──────────────────────────────────────────────────────────────────

const SUBMISSIONS_DIR = path.join(process.cwd(), "submissions");
const FORM_RECIPIENTS = {
  career: process.env.FORMS_CAREER_RECIPIENT,
  audit: process.env.FORMS_AUDIT_RECIPIENT,
};

function ensureFormDir(formId) {
  const dir = path.join(SUBMISSIONS_DIR, formId);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  return dir;
}

function saveSubmission(formId, data, attachments = []) {
  const dir = ensureFormDir(formId);
  const timestamp = Date.now();

  // Save metadata JSON (same as before, with attachment filenames recorded)
  const meta = {
    ...data,
    attachments: attachments.map((f) => ({
      originalname: f.originalname,
      mimetype: f.mimetype,
      size: f.size,
      savedAs: `${timestamp}_${f.originalname}`,
    })),
  };
  fs.writeFileSync(path.join(dir, `${timestamp}.json`), JSON.stringify(meta, null, 2));

  // Save each attachment buffer to disk alongside the JSON
  for (const file of attachments) {
    fs.writeFileSync(path.join(dir, `${timestamp}_${file.originalname}`), file.buffer);
  }
}

// ─── Multer error handler ─────────────────────────────────────────────────────

function handleMulterError(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ error: `Attachment exceeds the 2 MB size limit.` });
    }
    if (err.code === "LIMIT_FILE_COUNT") {
      return res.status(400).json({ error: `Too many attachments (max ${MAX_ATTACHMENTS}).` });
    }
    return res.status(400).json({ error: `Upload error: ${err.message}` });
  }
  if (err) {
    // fileFilter rejections land here
    return res.status(400).json({ error: err.message });
  }
  next();
}

// ─── Route ────────────────────────────────────────────────────────────────────

app.use("/api/forms", formLimiter);

app.post(
  "/api/forms/:formId",
  upload.any(),
  handleMulterError,
  async (req, res) => {
    try {
      const { formId } = req.params;
      const { _honeypot, ...fields } = req.body;
      const attachments = req.files ?? [];
      const recipientEmail = FORM_RECIPIENTS[formId];

      if (!recipientEmail) {
        console.log(`[forms] unknown formId rejected → ${formId}`);
        return res.status(404).json({ error: "Unknown form id." });
      }

      console.log(`[forms] incoming submission → formId=${formId}`);
      console.log(`[forms] ip=${req.ip}`);
      console.log(`[forms] fields received:`, Object.keys(fields));
      console.log(
        `[forms] attachments:`,
        attachments.map((f) => f.originalname)
      );

      // Honeypot
      if (_honeypot) {
        console.log("[forms] honeypot triggered — likely bot");
        return res.json({ success: true });
      }

      // Payload checks
      if (!fields || typeof fields !== "object" || Array.isArray(fields)) {
        console.log("[forms] invalid payload structure");
        return res.status(400).json({ error: "Invalid payload." });
      }

      if (Object.keys(fields).length === 0 && attachments.length === 0) {
        console.log("[forms] empty submission");
        return res
          .status(400)
          .json({ error: "No fields or attachments provided." });
      }

      if (Object.keys(fields).length > 20) {
        console.log("[forms] too many fields");
        return res.status(400).json({ error: "Too many fields." });
      }

      for (const key of Object.keys(fields)) {
        if (String(fields[key]).length > 2000) {
          console.log(`[forms] field too large → ${key}`);
          return res
            .status(400)
            .json({ error: `Field "${key}" exceeds maximum length.` });
        }
      }

      const submittedAt = new Date().toISOString();

      const submission = {
        formId,
        fields,
        ip: req.ip,
        userAgent: req.headers["user-agent"] || null,
        submittedAt,
      };

      console.log(`[forms] saving submission → ${formId}`);
      saveSubmission(formId, submission, attachments);

      // EMAIL DEBUGGING
      console.log(`[forms] attempting to send email → ${formId}`);

      activeMailer
        .sendFormEmail({
          formId,
          fields,
          submittedAt,
          attachments,
          recipientEmail,
        })
        .then((result) => {
          console.log(`[forms] email sent successfully → ${formId}`);
          console.log(`[forms] mailer response:`, result);
        })
        .catch((err) => {
          console.error(`[forms] email failed → ${formId}`);
          console.error(`[forms] reason:`, err);
        });

      console.log(
        `[forms] submission accepted → ${formId} | fields=${Object.keys(fields).length} | attachments=${attachments.length}`
      );

      res.json({ success: true });

    } catch (err) {
      console.error("[forms] fatal error:", err);
      res.status(500).json({ error: "Failed to submit form." });
    }
  }
);

// ─── Start ────────────────────────────────────────────────────────────────────
const port = Number(process.env.PORT) || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


