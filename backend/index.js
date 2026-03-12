const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const marked = require("marked");

const app = express();
app.use(cors());
app.use(express.json({ limit: "2mb" }));

// ─── Shared Helpers ───────────────────────────────────────────────────────────

function slugify(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// ─── Blogs ────────────────────────────────────────────────────────────────────

const BLOG_DIR = path.join(__dirname, "content", "blogs");

const previewStore = {
  content: null,  // parsed HTML
  meta: null,     // frontmatter data
  slug: null,     // auto-generated slug
  storedAt: null, // timestamp
};

const PREVIEW_TTL_MS = 30 * 60 * 1000; // 30 minutes
const PREVIEW_SLUG_PREFIX = "_preview-";

function isPreviewStale() {
  if (!previewStore.storedAt) return true;
  return Date.now() - previewStore.storedAt > PREVIEW_TTL_MS;
}

function clearPreview() {
  previewStore.content = null;
  previewStore.meta = null;
  previewStore.slug = null;
  previewStore.storedAt = null;
}

function buildSlugMap() {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));
  const slugMap = {};

  for (const filename of files) {
    const filePath = path.join(BLOG_DIR, filename);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(raw);

    if (data.title) {
      const slug = slugify(data.title);
      slugMap[slug] = filename;
    }
  }

  return slugMap;
}

function getBlogs() {
  const slugMap = buildSlugMap();

  return Object.entries(slugMap).map(([slug, filename]) => {
    const filePath = path.join(BLOG_DIR, filename);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(raw);

    return {
      slug,
      title: data.title || "Untitled",
      subtitle: data.subtitle || "",
      author: data.author || { name: "Unknown", avatar: "" },
      publishedAt: data.publishedAt || "",
      readTime: data.readTime || "",
      heroImage: data.heroImage || "",
      featured: data.featured || false,
      category: data.category || "General",
      meta: data.meta || "blog",
    };
  });
}

// GET /api/blogs — list all blogs
app.get("/api/blogs", (req, res) => {
  try {
    const blogs = getBlogs();
    res.json(blogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load blogs" });
  }
});

// GET /api/blogs/featured — get featured blog
app.get("/api/blogs/featured", (req, res) => {
  try {
    const blogs = getBlogs();
    const featured = blogs.find(
      (b) => b.featured === true || b.featured === "true"
    );

    if (!featured) {
      return res.status(404).json({ error: "No featured blog found" });
    }

    res.json(featured);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load featured blog" });
  }
});

// GET /api/blogs/:slug
// If slug starts with "_preview-{slug}", serve from in-memory preview store.
// Otherwise serve from filesystem as normal.
app.get("/api/blogs/:slug", (req, res) => {
  const { slug } = req.params;

  // ── Preview path ──
  if (slug.startsWith(PREVIEW_SLUG_PREFIX)) {
    const previewSlug = slug.slice(PREVIEW_SLUG_PREFIX.length);

    if (!previewStore.content || isPreviewStale()) {
      clearPreview();
      return res.status(404).json({
        error: "No preview available or preview has expired. POST to /api/preview first.",
      });
    }

    if (previewStore.slug !== previewSlug) {
      return res.status(404).json({
        error: `Preview slug mismatch. Current preview is for '${previewStore.slug}'.`,
      });
    }

    return res.json({
      slug: previewSlug,
      ...previewStore.meta,
      content: previewStore.content,
      _preview: true,
    });
  }

  // ── Normal filesystem path ──
  try {
    const slugMap = buildSlugMap();
    const filename = slugMap[slug];

    if (!filename) {
      return res.status(404).json({ error: "Blog not found" });
    }

    const filePath = path.join(BLOG_DIR, filename);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);
    const html = marked.parse(content);

    res.json({
      slug,
      ...data,
      content: html,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch blog" });
  }
});

// ─── Preview routes ───────────────────────────────────────────────────────────

// POST /api/preview
// Body: { markdown: "---\ntitle: ...\n---\n\n## Content" }
app.post("/api/preview", (req, res) => {
  const { markdown } = req.body;

  if (!markdown || typeof markdown !== "string" || markdown.trim() === "") {
    return res.status(400).json({
      error: "Request body must include a non-empty 'markdown' string",
    });
  }

  try {
    const { data, content } = matter(markdown);

    if (!data.title) {
      return res.status(422).json({
        error: "Frontmatter must include a 'title' field",
      });
    }

    const html = marked.parse(content);
    const slug = slugify(data.title);

    previewStore.content = html;
    previewStore.meta = data;
    previewStore.slug = slug;
    previewStore.storedAt = Date.now();

    res.json({
      message: "Preview stored successfully",
      slug,
      previewSlug: `${PREVIEW_SLUG_PREFIX}${slug}`,
      title: data.title,
      expiresIn: "30 minutes",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to parse markdown" });
  }
});

// GET /api/preview — raw preview (same shape as /api/blogs/:slug)
app.get("/api/preview", (req, res) => {
  if (!previewStore.content || isPreviewStale()) {
    clearPreview();
    return res.status(404).json({
      error: "No preview available. POST markdown to /api/preview first.",
    });
  }

  const { meta, content, slug } = previewStore;

  res.json({
    slug,
    ...meta,
    content,
    _preview: true,
  });
});

// DELETE /api/preview — manually clear the stored preview
app.delete("/api/preview", (req, res) => {
  clearPreview();
  res.json({ message: "Preview cleared" });
});

// ─── Case Studies ─────────────────────────────────────────────────────────────

const CASE_STUDY_DIR = path.join(__dirname, "content", "caseStudies");

/**
 * caseStudyCache maps slug → { data, mtime }
 *   data  — the full parsed CaseStudy object with slug injected
 *   mtime — last-modified time of the source file (ms), used for invalidation
 */
const caseStudyCache = new Map();

/**
 * Reads and parses a single .json file.
 * Returns { slug, data } or throws on malformed JSON / missing title.
 */
function parseCaseStudyFile(filename) {
  const filePath = path.join(CASE_STUDY_DIR, filename);
  const raw = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(raw);

  if (!data.title) {
    throw new Error(`Case study file "${filename}" is missing a required "title" field.`);
  }

  const slug = slugify(data.title);
  return { slug, data: { ...data, slug } };
}

/**
 * Builds a fresh slug → { data, mtime } map from all .json files in the dir.
 * Called on first request and whenever a change is detected.
 */
function buildCaseStudyCache() {
  caseStudyCache.clear();

  const files = fs.readdirSync(CASE_STUDY_DIR).filter((f) => f.endsWith(".json"));

  for (const filename of files) {
    const filePath = path.join(CASE_STUDY_DIR, filename);

    try {
      const { mtime } = fs.statSync(filePath);
      const { slug, data } = parseCaseStudyFile(filename);
      caseStudyCache.set(slug, { data, mtime: mtime.getTime() });
    } catch (err) {
      console.error(`[case-studies] Skipping "${filename}": ${err.message}`);
    }
  }
}

/**
 * Checks every cached file's mtime against disk.
 * Also detects new files (present on disk but not in cache) and
 * deleted files (in cache but no longer on disk).
 * Returns true if anything changed.
 */
function isCaseStudyCacheStale() {
  let diskFiles;
  try {
    diskFiles = fs.readdirSync(CASE_STUDY_DIR).filter((f) => f.endsWith(".json"));
  } catch {
    return false; // directory gone — don't crash, just serve stale
  }

  const diskSet = new Set();

  for (const filename of diskFiles) {
    const filePath = path.join(CASE_STUDY_DIR, filename);

    try {
      const { mtime } = fs.statSync(filePath);
      const raw = fs.readFileSync(filePath, "utf-8");
      const data = JSON.parse(raw);
      if (!data.title) continue;

      const slug = slugify(data.title);
      diskSet.add(slug);

      const cached = caseStudyCache.get(slug);
      if (!cached || cached.mtime !== mtime.getTime()) return true;
    } catch {
      return true; // unreadable / malformed — treat as changed
    }
  }

  // Check for deleted files
  for (const slug of caseStudyCache.keys()) {
    if (!diskSet.has(slug)) return true;
  }

  return false;
}

/**
 * Ensures the cache is fresh before serving any request.
 * Rebuilds if empty or stale.
 */
function ensureFreshCaseStudyCache() {
  if (caseStudyCache.size === 0 || isCaseStudyCacheStale()) {
    buildCaseStudyCache();
  }
}

// GET /api/case-studies — list all case studies (summary fields only)
app.get("/api/case-studies", (req, res) => {
  try {
    ensureFreshCaseStudyCache();

    const list = Array.from(caseStudyCache.values()).map(({ data }) => ({
      slug: data.slug,
      title: data.title,
      subtitle: data.subtitle,
      client: data.client,
      industry: data.industry,
      timeline: data.timeline,
      platform: data.platform,
      heroImage: data.heroImage,
      role: data.role,
    }));

    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load case studies" });
  }
});

// GET /api/case-studies/:slug — full case study detail
app.get("/api/case-studies/:slug", (req, res) => {
  try {
    ensureFreshCaseStudyCache();

    const { slug } = req.params;
    const entry = caseStudyCache.get(slug);

    if (!entry) {
      return res.status(404).json({ error: "Case study not found" });
    }

    res.json(entry.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch case study" });
  }
});

// ─── Start ────────────────────────────────────────────────────────────────────

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});