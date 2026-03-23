export type Bindings = CloudflareBindings & {
  FORMS_BUCKET: R2Bucket;
  FORMS_RECIPIENT_CAREER: string;
  FORMS_RECIPIENT_AUDIT: string;
  RESEND_API_KEY: string;
  RESEND_FROM: string;
  FORMS_R2_PUBLIC_BASE_URL?: string;
};
