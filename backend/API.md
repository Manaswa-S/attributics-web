# Attributics Backend API

**Last updated:** 2026-03-13

**Overview**
- Node/Express API serving blogs, case studies, preview content, and form submissions.
- Content is read from local filesystem under `content/`.
- Form submissions are stored to disk under `submissions/` and emailed via SMTP.

**Base URL**
- Local: `http://localhost:3000`
- The port is controlled by `PORT`.

**Authentication**
- None.

**CORS**
- Allowed origins: `http://localhost:5173`, `https://attributics-demo.vercel.app`.

**Request Body Limits**
- JSON body limit: `2mb`.
- Multipart attachments limits:
- Max files: `5`.
- Max size per file: `2 MB`.
- Allowed MIME types:
- `application/pdf`
- `image/jpeg`
- `image/png`
- `image/gif`
- `image/webp`
- `text/plain`
- `text/csv`
- `application/msword`
- `application/vnd.openxmlformats-officedocument.wordprocessingml.document`
- `application/vnd.ms-excel`
- `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`

**Rate Limits**
- `/api/forms/*` limited to 20 requests per 10 minutes per IP.

**Filesystem Storage**
- Blogs: `content/blogs/*.md`
- Case studies: `content/caseStudies/*.json`
- Form submissions: `submissions/<formId>/` (JSON + attachments)

**Environment Variables**
- `PORT` (default: `3000`)
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE` (`true` for 465, `false` for 587)
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM`
- `FORMS_CAREER_RECIPIENT`
- `FORMS_AUDIT_RECIPIENT`

**Build and Run**
1. `npm install`
2. `npm start`
3. Optional dev runner: `npx nodemon index.js`

**Conventions**
- All responses are JSON.
- Error responses use `{ "error": "message" }`.
- Timestamps are ISO strings (`new Date().toISOString()`).

---

## Blogs

**GET /api/blogs**
- Returns all blogs (summary fields only).
- Response fields: `slug`, `title`, `subtitle`, `author`, `publishedAt`, `readTime`, `heroImage`, `featured`, `category`, `meta`.

**GET /api/blogs/featured**
- Returns only featured blogs.
- `404` if none are featured.

**GET /api/blogs/recent**
- Returns the 3 most recent blogs by `publishedAt`.
- `404` if no blog has `publishedAt`.

**GET /api/blogs/:slug**
- Returns a full blog (HTML content).
- If `slug` starts with `_preview-`, content is served from the in-memory preview store.
- Normal blog content is read from `content/blogs/*.md`.

**Blog Markdown Frontmatter (example)**
```md
---
title: "The Natural Selection — CDP Stack."
subtitle: ""
publishedAt: "2025-07-23"
readTime: "3 min read"
author:
  name: "Vakesh Singh"
  avatar: https://...
heroImage: https://...
featured: true
category: "AI"
meta: "blog"
---
```

---

## Preview

**POST /api/preview**
- Stores a preview in memory for 30 minutes.
- Request body:
```json
{ "markdown": "---\ntitle: ...\n---\n\n## Content" }
```
- Validation: `markdown` must be a non-empty string; frontmatter must include `title`.
- Response: `message`, `slug`, `previewSlug`, `title`, `expiresIn`.

**GET /api/preview**
- Returns the current preview payload (same shape as `GET /api/blogs/:slug`).
- `404` if none is stored or if expired.

**DELETE /api/preview**
- Clears the preview store.
- Response: `{ "message": "Preview cleared" }`.

**Preview Rules**
- Preview content is stored in memory, not persisted.
- TTL: 30 minutes from last `POST /api/preview`.

---

## Case Studies

**GET /api/case-studies**
- Returns a list of case studies (summary fields only).

**GET /api/case-studies/featured**
- Returns only featured case studies.
- `404` if none are featured.

**GET /api/case-studies/:slug**
- Returns the full case study record.

**Case Study JSON Shape (example)**
```json
{
  "featured": true,
  "publishedAt": "2025-07-23",
  "title": "Redesigning the Future of Personal Finance",
  "subtitle": "A complete overhaul...",
  "client": "Nova Bank",
  "role": "Lead Product Designer",
  "timeline": "6 Months",
  "platform": "iOS & Android",
  "industry": "FinTech",
  "heroImage": "https://...",
  "challenge": "...",
  "solution": "...",
  "process": [
    { "title": "Research & Discovery", "description": "..." }
  ],
  "results": [
    { "metric": "Increase in Daily Active Users", "value": "45%" }
  ],
  "images": ["https://..."]
}
```

**Cache Behavior**
- Case studies are cached in memory and refreshed if files change.

---

## Forms

**POST /api/forms/:formId**
- Accepts JSON fields and optional attachments.
- Use `multipart/form-data` when sending files.
- Accepted `formId` values are defined in `FORM_RECIPIENTS`.
- Unknown `formId` returns `404`.

**Current formIds**
- `career`
- `audit`

**Body (JSON fields only)**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "message": "Hello",
  "_honeypot": ""
}
```

**Body (multipart/form-data)**
- Text fields as above.
- File fields: any name, multiple files allowed.

**Validation**
- Max 20 fields.
- Each field value max length: 2000 chars.
- Empty submissions rejected unless at least one attachment is present.
- `_honeypot` triggers a silent success.

**Side Effects**
- Submission saved to disk under `submissions/<formId>/`.
- Email sent via SMTP to the recipient configured for the `formId`.
- Email failures do not fail the request.

**Response**
- `{ "success": true }` on acceptance.

---

## Error Responses
- `400` for invalid payloads or file uploads.
- `404` for missing entities or unknown `formId`.
- `429` for rate limit violations on `/api/forms/*`.
- `500` for server errors.
