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

export const createNoopMailer = (): Mailer => {
  return {
    async send() {
      return;
    },
  };
};

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
