// >>>> SHARED TYPES >>>>
export type EmailPayload = {
  to: string;
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
};

export type Mailer = {
  send: (payload: EmailPayload) => Promise<void>;
};

// >>>> NOOP MAILER >>>>
export const createNoopMailer = (): Mailer => {
  return {
    async send() {
      return;
    },
  };
};

// >>>> RESEND MAILER >>>>
type ResendConfig = {
  apiKey: string;
  from: string;
};

export const createResendMailer = (config: ResendConfig): Mailer => {
  return {
    async send(payload) {
      const body: Record<string, unknown> = {
        from: config.from,
        to: payload.to,
        subject: payload.subject,
        html: payload.html,
      };

      if (payload.text) {
        body.text = payload.text;
      }

      if (payload.replyTo) {
        body.reply_to = payload.replyTo;
      }

      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${config.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        let details = "";
        try {
          details = await response.text();
        } catch {
          details = "";
        }
        const suffix = details ? ` - ${details}` : "";
        throw new Error(
          `Resend send failed: ${response.status} ${response.statusText}${suffix}`
        );
      }
    },
  };
};

// >>>> GMAIL SMTP MAILER >>>>
type GmailSmtpConfig = {
  user: string;
  appPassword: string;
  from: string;
  host?: string;
  port?: number;
  secure?: boolean;
};

export const createGmailSmtpMailer = (config: GmailSmtpConfig): Mailer => {
  const host = config.host ?? "smtp.gmail.com";
  const port = config.port ?? 465;
  const secure = config.secure ?? true;

  return {
    async send() {
      const details = `host=${host}, port=${port}, secure=${secure}`;
      throw new Error(
        `Gmail SMTP is not supported in Cloudflare Workers (no raw TCP sockets). ` +
        `Cannot connect to SMTP server with ${details}. ` +
        `Use an email API (Resend, Mailgun, SendGrid) or a relay that exposes HTTPS.`
      );
    },
  };
};

// >>>> MAILGUN MAILER >>>>
type MailgunConfig = {
  apiKey: string;
  domain: string;
  from: string;
  baseUrl?: string;
};

export const createMailgunMailer = (config: MailgunConfig): Mailer => {
  const baseUrl = config.baseUrl ?? "https://api.mailgun.net";
  const endpoint = `${baseUrl}/v3/${config.domain}/messages`;

  return {
    async send(payload) {
      const form = new URLSearchParams();
      form.set("from", config.from);
      form.set("to", payload.to);
      form.set("subject", payload.subject);
      if (payload.text) {
        form.set("text", payload.text);
      }
      form.set("html", payload.html);
      if (payload.replyTo) {
        form.set("h:Reply-To", payload.replyTo);
      }

      const token = btoa(`api:${config.apiKey}`);
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Basic ${token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: form.toString(),
      });

      if (!response.ok) {
        let details = "";
        try {
          details = await response.text();
        } catch {
          details = "";
        }
        const suffix = details ? ` - ${details}` : "";
        throw new Error(
          `Mailgun send failed: ${response.status} ${response.statusText}${suffix}`
        );
      }
    },
  };
};
