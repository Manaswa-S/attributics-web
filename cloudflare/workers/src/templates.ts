const BRAND_COLOR = "#ff6658";
const WARNING_COLOR = "#c81e1e";

type StoredFile = {
  key: string;
  name: string;
  size: number;
  type: string;
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

const formatFormTitle = (formId: string) => {
  const cleaned = formId.replace(/[_-]+/g, " ").trim();
  if (!cleaned) return "Form";
  return cleaned
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const formatDisplayDate = (iso: string) => {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) {
    return iso;
  }
  const formatted = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "UTC",
  }).format(date);
  return `${formatted} UTC`;
};

const buildFileUrl = (baseUrl: string | undefined, key: string) => {
  if (!baseUrl) {
    return null;
  }
  const trimmed = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
  return `${trimmed}/${key}`;
};

const buildEmailHtml = (input: EmailTemplateInput) => {
  const formTitle = formatFormTitle(input.formId);
  const submittedAt = formatDisplayDate(input.submittedAt);

  const fieldRows = Object.entries(input.fields)
    .map(([key, value]) => {
      const label = escapeHtml(key);
      const display = escapeHtml(formatFieldValue(value));
      return `
        <tr>
          <td style="padding:10px 12px;border:1px solid #eee;font-weight:600;vertical-align:top;background:#fafafa;width:32%;">${label}</td>
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

      return `
        <tr>
          <td style="padding:12px;border:1px solid #eee;">
            <div style="font-weight:600;">${fileLabel}</div>
            <div style="color:#666;font-size:13px;margin-top:4px;">${sizeKb} KB · ${escapeHtml(
        file.type || "unknown"
      )}</div>
            <div style="color:#999;font-size:12px;margin-top:6px;">
              R2 key: <code style="font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;">${key}</code>
            </div>
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
    { label: "Form", value: formTitle },
    { label: "Submission ID", value: input.submissionId },
    { label: "Submitted At", value: submittedAt },
    { label: "IP Address", value: input.ip || "Unavailable" },
    { label: "User Agent", value: input.userAgent || "Unavailable" },
  ]
    .map(({ label, value }) => {
      return `
        <tr>
          <td style="padding:8px 12px;border:1px solid #eee;font-weight:600;background:#fafafa;width:32%;">${escapeHtml(
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
  <body style="margin:0;padding:0;background:#f6f6f8;color:#111;font-family:'Helvetica Neue', Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f6f6f8;padding:32px 0;">
      <tr>
        <td align="center">
          <table width="680" cellpadding="0" cellspacing="0" style="background:#fff;border:1px solid #ececec;border-radius:14px;overflow:hidden;box-shadow:0 6px 20px rgba(0,0,0,0.05);">
            <tr>
              <td style="padding:28px 32px;border-bottom:1px solid #f0f0f0;">
                <div style="font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:${BRAND_COLOR};font-weight:700;">New Submission</div>
                <h1 style="margin:12px 0 6px 0;font-size:24px;color:#111;">${escapeHtml(
                  formTitle
                )} form received</h1>
                <p style="margin:0;color:#666;font-size:14px;">Submitted at ${escapeHtml(
                  submittedAt
                )}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:22px 32px;">
                <h2 style="margin:0 0 12px 0;font-size:16px;color:${BRAND_COLOR};">Form fields</h2>
                ${fieldsSection}
              </td>
            </tr>
            <tr>
              <td style="padding:0 32px 22px 32px;">
                <div style="margin:0 0 12px 0;padding:10px 12px;border:1px solid #f3c5c5;background:#fff5f5;color:${WARNING_COLOR};border-radius:8px;font-size:13px;">
                  Warning: Uploaded files may not be sanitised. Please review carefully before opening.
                </div>
                <h2 style="margin:0 0 12px 0;font-size:16px;color:${BRAND_COLOR};">Files</h2>
                ${filesSection}
              </td>
            </tr>
            <tr>
              <td style="padding:0 32px 30px 32px;">
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
  const formTitle = formatFormTitle(input.formId);
  const submittedAt = formatDisplayDate(input.submittedAt);

  lines.push(`New ${formTitle} form submission`);
  lines.push(`Submitted at: ${submittedAt}`);
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
  lines.push(
    "Files: (Warning: uploaded files may not be sanitised; open with care.)"
  );

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

export type { EmailTemplateInput, StoredFile };
export { buildEmailHtml, buildEmailText };
