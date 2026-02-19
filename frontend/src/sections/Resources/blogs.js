// Medium Tag Conventions:

// filter-<category> → used for UI filters
// meta-featured → featured blog
// meta-announcement → announcement banner

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// Extract first image from Medium HTML
export function extractImage(html) {
    const match = html?.match(/<img[^>]+src="([^">]+)"/);
    return match ? match[1] : "/fallback.jpg";
}

// Transform Medium RSS item to your UI model
const FILTER_REGEX = /^filter-(.+)$/i;
const META_REGEX = /^meta-(.+)$/i;

export function transformBlog(post, index) {
    let categories = post.categories || [];

    if (!Array.isArray(categories)) {
        categories = [categories];
    }

    let filterCategory = "General";
    let isFeatured = false;

    categories.forEach((tag) => {
        const metaMatch = tag.match(META_REGEX);
        if (metaMatch && metaMatch[1].toLowerCase() === "featured") {
            isFeatured = true;
        }
    });

    // Only apply filter tags if NOT featured
    if (!isFeatured) {
        categories.forEach((tag) => {
            const filterMatch = tag.match(FILTER_REGEX);
            if (filterMatch) {
                filterCategory = filterMatch[1];
            }
        });
    }

    return {
        id: index,
        type: "blog",
        title: post.title,
        description: post.description?.replace(/<[^>]+>/g, "") || "",
        date: new Date(post.pubDate).toISOString(),
        readTime: calculateReadTime(post.content),
        category: filterCategory,
        image: extractImage(post.content),
        link: post.link,
        featured: isFeatured,
        content: post.content,
    };
}


// Sort newest first
export function sortBlogs(blogs) {
    return [...blogs].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
    );
}

// Filter by category
export function filterBlogs(blogs, activeFilter) {
    if (activeFilter === "All") return blogs;

    return blogs.filter(
        blog => blog.category.toLowerCase() === activeFilter.toLowerCase()
    );
}


// Search
export function searchBlogs(blogs, query) {
    if (!query.trim()) return blogs;

    const q = query.toLowerCase();

    return blogs.filter(blog =>
        blog.title.toLowerCase().includes(q) ||
        blog.description.toLowerCase().includes(q) ||
        blog.category.toLowerCase().includes(q)
    );
}

export function calculateReadTime(html) {
    const averageWPM = 250;

    if (!html) return "1 min read";

    const text = html.replace(/<[^>]+>/g, " "); // strip HTML
    const words = text.trim().split(/\s+/).length;

    const minutes = Math.ceil(words / averageWPM);

    return `${minutes} min read`;
}
