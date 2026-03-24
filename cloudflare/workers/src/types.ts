export type Bindings = Cloudflare.Env & {
  FORMS_BUCKET: R2Bucket;
  FORMS_RECIPIENT_CAREER: string;
  FORMS_RECIPIENT_AUDIT: string;
  RESEND_API_KEY: string;
  RESEND_FROM: string;
  FORMS_R2_PUBLIC_BASE_URL?: string;
  GMAIL_SMTP_USER: string;
  GMAIL_SMTP_FROM: string;
  GMAIL_SMTP_APP_PASSWORD: string;
  MAILGUN_API_KEY: string;
  MAILGUN_DOMAIN: string;
  MAILGUN_FROM: string;
  MAILGUN_BASE_URL?: string;
};
