export type Blog = {
    slug: string;
    title: string;
    date: string;
    description?: string;
    category: string;
    content: string;
};

const modules = import.meta.glob("../blogs/**/*.md", {
    as: "raw",
    eager: true,
});

function parseMarkdown(raw: string) {
    const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);

    if (!match) {
        return { meta: {}, content: raw };
    }

    const metaBlock = match[1];
    const content = match[2];

    const meta: Record<string, string> = {};

    metaBlock.split("\n").forEach((line) => {
        const [key, ...rest] = line.split(":");
        if (!key) return;
        meta[key.trim()] = rest.join(":").trim();
    });

    return { meta, content };
}

function extractCategory(path: string) {
    const parts = path.split("/");
    const blogsIndex = parts.findIndex((p) => p === "blogs");
    return parts[blogsIndex + 1];
}

export function getAllBlogs(): Blog[] {
    return Object.entries(modules).map(([path, raw]) => {
        const { meta, content } = parseMarkdown(raw as string);

        const slug = path.split("/").pop()?.replace(".md", "") || "";
        const category = extractCategory(path);

        return {
            slug,
            category,
            title: meta.title,
            date: meta.date,
            description: meta.description,
            content,
        };
    });
}

export function getBlogBySlug(slug: string) {
    return getAllBlogs().find((b) => b.slug === slug);
}

export function getAllCategories() {
    const blogs = getAllBlogs();
    return [...new Set(blogs.map((b) => b.category))];
}

export function searchBlogs(query: string) {
    const blogs = getAllBlogs();
    const lower = query.toLowerCase();

    return blogs.filter((b) =>
        b.title.toLowerCase().includes(lower) ||
        b.description?.toLowerCase().includes(lower) ||
        b.content.toLowerCase().includes(lower)
    );
}
