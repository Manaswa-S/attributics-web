import { Hono } from "hono";
import type { Bindings } from "./types";

const caseStudy = new Hono<{ Bindings: Bindings }>();

caseStudy.post("/", async (c) => {
  if (!c.env.CASE_STUDY_EMAIL_GATE) {
    return c.json({ error: "Storage not configured" }, 500);
  }

  let payload: unknown;
  try {
    payload = await c.req.json();
  } catch {
    return c.json({ error: "Invalid JSON body" }, 400);
  }

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return c.json({ error: "Body must be a JSON object" }, 400);
  }

  const body = payload as Record<string, unknown>;
  const email = body.email;
  const resourceName = body.resource;

  if (typeof email !== "string" || email.trim().length === 0) {
    return c.json({ error: "Missing or invalid email" }, 400);
  }

  if (typeof resourceName !== "string" || resourceName.trim().length === 0) {
    return c.json({ error: "Missing or invalid resourceType" }, 400);
  }

  const { email: _email, resourceName: _resourceName, ...metadata } = body;

  const submissionId = crypto.randomUUID();
  const submittedAt = new Date().toISOString();
  const userAgent = c.req.header("user-agent") ?? null;
  const ip = c.req.header("cf-connecting-ip") ?? null;

  const submission = {
    submissionId,
    submittedAt,
    email,
    resourceName,
    metadata,
    userAgent,
    ip,
  };

  const objectKey = `case-study/${submittedAt}/${submissionId}.json`;

  await c.env.CASE_STUDY_EMAIL_GATE.put(
    objectKey,
    JSON.stringify(submission, null, 2),
    {
      httpMetadata: {
        contentType: "application/json",
      },
    }
  );

  return c.json({ success: true, submissionId });
});

export { caseStudy };
