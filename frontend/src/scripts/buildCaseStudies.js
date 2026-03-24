import fs from "fs";
import path from "path";

const CASE_STUDY_DIR = path.join(process.cwd(), "public", "content", "raw", "caseStudies");
const OUT_DIR        = path.join(process.cwd(), "public", "content", "built", "caseStudies");
const OUT_META       = path.join(OUT_DIR, "meta.json");
const OUT_FEATURED   = path.join(OUT_DIR, "featured.json");
const OUT_BRANDED    = path.join(OUT_DIR, "brandedMetrics.json");
const OUT_SLUGS      = path.join(OUT_DIR, "slugs");

if (!fs.existsSync(OUT_DIR))   fs.mkdirSync(OUT_DIR,   { recursive: true });
if (!fs.existsSync(OUT_SLUGS)) fs.mkdirSync(OUT_SLUGS, { recursive: true });

function slugify(title) {
    return title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
}

const META_KEYS = [
    "slug",
    "featured",
    "publishedAt",
    "readTime",
    "title",
    "subtitle",
    "client",
    "role",
    "timeline",
    "platform",
    "industry",
    "heroImage",
];

const files = fs.readdirSync(CASE_STUDY_DIR).filter(f => f.endsWith(".json"));
const all = [];
const skipped = [];

files.forEach(file => {
    let raw;
    try {
        raw = JSON.parse(fs.readFileSync(path.join(CASE_STUDY_DIR, file), "utf-8"));
    } catch (err) {
        skipped.push(`${file} (invalid JSON: ${err.message})`);
        return;
    }

    if (!raw.title) {
        skipped.push(`${file} (no title)`);
        return;
    }

    all.push({ ...raw, slug: slugify(raw.title) });
});

all.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

// 1. Individual slug files — full data
all.forEach(cs => {
    fs.writeFileSync(
        path.join(OUT_SLUGS, `${cs.slug}.json`),
        JSON.stringify(cs, null, 2)
    );
});

// 2. Metadata only
const meta = all.map(cs =>
    Object.fromEntries(META_KEYS.map(k => [k, cs[k] ?? null]))
);
fs.writeFileSync(OUT_META, JSON.stringify(meta, null, 2));

// 3. Featured — metadata only
const featured = meta.filter(cs => cs.featured === true || cs.featured === "true");
fs.writeFileSync(OUT_FEATURED, JSON.stringify(featured, null, 2));

// 4. Branded metrics — optional per case study
const brandedMetrics = all
    .filter(cs => cs.isBrandedMetric && typeof cs.isBrandedMetric === "object")
    .map(cs => ({
        client: cs.client ?? null,
        slug: cs.slug ?? null,
        image: cs.isBrandedMetric?.image ?? cs.image ?? null,
        ...cs.isBrandedMetric,
    }));
fs.writeFileSync(OUT_BRANDED, JSON.stringify(brandedMetrics, null, 2));

console.log(`\n📁 Case study build complete`);
console.log(`   Total    : ${all.length} case study(ies)`);
console.log(`   Slugs    : ${all.length} file(s)  → ${OUT_SLUGS}/<slug>.json`);
console.log(`   Meta     : ${meta.length} record(s) → ${OUT_META}`);
console.log(`   Featured : ${featured.length} record(s) → ${OUT_FEATURED}`);
console.log(`   Branded  : ${brandedMetrics.length} record(s) → ${OUT_BRANDED}`);
if (skipped.length > 0) {
    console.warn(`\n⚠️  Skipped ${skipped.length} file(s):`);
    skipped.forEach(f => console.warn(`   - ${f}`));
}