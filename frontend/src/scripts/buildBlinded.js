import fs from "fs";
import path from "path";

const CASE_STUDY_DIR = path.join(process.cwd(), "public", "content", "raw", "blinded");
const OUT_DIR        = path.join(process.cwd(), "public", "content", "built", "blinded");
const OUT_META       = path.join(OUT_DIR, "meta.json");
const OUT_FEATURED   = path.join(OUT_DIR, "featured.json");
const OUT_SLUGS      = path.join(OUT_DIR, "slugs");
const SLUG_PATH_PREFIX = "/content/built/blinded/slugs";

if (!fs.existsSync(OUT_DIR))   fs.mkdirSync(OUT_DIR,   { recursive: true });
if (!fs.existsSync(OUT_SLUGS)) fs.mkdirSync(OUT_SLUGS, { recursive: true });

const staleBrandedMetrics = path.join(OUT_DIR, "brandedMetrics.json");
if (fs.existsSync(staleBrandedMetrics)) fs.unlinkSync(staleBrandedMetrics);

function slugify(title) {
    return title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
}

function normalizeSolutionItems(solution) {
    if (!Array.isArray(solution)) return solution;

    const buildBlocks = (item) => {
        const blocks = [];

        const pushText = (text) => {
            if (typeof text === "string" && text.trim()) {
                blocks.push({ type: "text", text: text.trim() });
            }
        };

        const pushPoints = (points) => {
            if (!Array.isArray(points)) return;
            const cleaned = points
                .filter(point => typeof point === "string" && point.trim())
                .map(point => point.trim());
            if (cleaned.length > 0) {
                blocks.push({ type: "points", items: cleaned });
            }
        };

        const description = item?.description;
        if (Array.isArray(description)) {
            description.forEach(part => {
                if (Array.isArray(part)) {
                    pushPoints(part);
                } else {
                    pushText(part);
                }
            });
        } else {
            pushText(description);
        }

        if (Array.isArray(item?.points)) {
            pushPoints(item.points);
        }

        return blocks.length > 0 ? blocks : null;
    };

    return solution.map((item) => {
        if (!item || typeof item !== "object") return item;
        const blocks = buildBlocks(item);
        return blocks ? { ...item, blocks } : item;
    });
}

const META_KEYS = [
    "slug",
    "slugPath",
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

    const normalized = {
        ...raw,
        solution: normalizeSolutionItems(raw.solution),
        slug: slugify(raw.title),
    };
    normalized.slugPath = `${SLUG_PATH_PREFIX}/${normalized.slug}.json`;

    all.push(normalized);
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

console.log(`\n📁 Blinded case study build complete`);
console.log(`   Total    : ${all.length} case study(ies)`);
console.log(`   Slugs    : ${all.length} file(s)  → ${OUT_SLUGS}/<slug>.json`);
console.log(`   Meta     : ${meta.length} record(s) → ${OUT_META}`);
console.log(`   Featured : ${featured.length} record(s) → ${OUT_FEATURED}`);
if (skipped.length > 0) {
    console.warn(`\n⚠️  Skipped ${skipped.length} file(s):`);
    skipped.forEach(f => console.warn(`   - ${f}`));
}
