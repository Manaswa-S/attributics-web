import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

const BLOG_DIR = path.join(process.cwd(), "src", "content", "blogs");
const OUT_DIR  = path.join(process.cwd(), "public", "content", "built", "blogs");

const OUT_SLUGS = path.join(OUT_DIR, "slugs"); // individual slug files go here
const OUT_RECENT   = path.join(OUT_DIR, "recent.json");
const OUT_FEATURED = path.join(OUT_DIR, "featured.json");
const OUT_META     = path.join(OUT_DIR, "meta.json");

if (!fs.existsSync(OUT_SLUGS)) {
    fs.mkdirSync(OUT_SLUGS, { recursive: true });
}

if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
}

function slugify(title) {
    return title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
}

const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith(".md"));
const blogs = [];
const skipped = [];

files.forEach(file => {
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
    const { data, content } = matter(raw);

    if (!data.title) {
        skipped.push(file);
        return;
    }

    blogs.push({
        slug:        slugify(data.title),
        title:       data.title,
        subtitle:    data.subtitle    || "",
        author:      data.author      || {},
        publishedAt: data.publishedAt || "",
        readTime:    data.readTime    || "",
        heroImage:   data.heroImage   || "",
        featured:    data.featured    || false,
        category:    data.category    || "General",
        meta:        data.meta        || "blog",
        content:     marked.parse(content),
    });
});


blogs.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

const stripContent = b => { const { content, ...rest } = b; return rest; };

const recent   = blogs.slice(0, 3);
const meta     = blogs.map(stripContent);
const featured = blogs.filter(b => b.featured === true || b.featured === "true").map(stripContent);

blogs.forEach(blog => {
    fs.writeFileSync(
        path.join(OUT_SLUGS, `${blog.slug}.json`),
        JSON.stringify(blog, null, 2)
    );
});
fs.writeFileSync(OUT_RECENT,   JSON.stringify(recent,   null, 2));
fs.writeFileSync(OUT_META,     JSON.stringify(meta,     null, 2));
fs.writeFileSync(OUT_FEATURED, JSON.stringify(featured, null, 2));

console.log(`\n📝 Blog build complete`);
console.log(`   Total    : ${blogs.length} blog(s)`);
console.log(`   Recent   : ${recent.length} blog(s)   → ${OUT_RECENT}`);
console.log(`   Meta     : ${meta.length} blog(s)   → ${OUT_META}`);
console.log(`   Featured : ${featured.length} blog(s)   → ${OUT_FEATURED}`);
console.log(`   Slugs    : ${blogs.length} file(s)  → ${OUT_SLUGS}/<slug>.json`);
if (skipped.length > 0) {
    console.warn(`\n⚠️  Skipped ${skipped.length} file(s) (no title):`);
    skipped.forEach(f => console.warn(`   - ${f}`));
}