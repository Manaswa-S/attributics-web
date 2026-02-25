const express = require("express");
const axios = require("axios");
const cors = require("cors");
const xml2js = require("xml2js");

const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const marked = require("marked");

const app = express();
app.use(cors());

const BLOG_DIR = path.join(__dirname, "content", "blogs");

function sleep2s() {
  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  sleep(2000); // sleeps 2 seconds
}

// Helper: read all markdown files in the blog folder
function getLocalBlogs() {
  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith(".md"));

  return files.map(filename => {
    const filePath = path.join(BLOG_DIR, filename);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(raw);

    return {
      slug: filename.replace(".md", ""),
      title: data.title || "Untitled",
      subtitle: data.subtitle || "",
      author: data.author || { name: "Unknown", avatar: "" },
      publishedAt: data.publishedAt || "",
      readTime: data.readTime || "",
      heroImage: data.heroImage || "",
      featured: data.featured || false,
      category: data.category || 'General',
      meta: data.meta || 'blog',
    };
  });
}

// GET /api/blogs/local — list all blogs
app.get("/api/blogs/local", async (req, res) => {
  try {
    const blogs = getLocalBlogs();
    res.json(blogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load local blogs" });
  }
});

// GET /api/blogs/local/:slug — get particular blog in detail
app.get("/api/blogs/local/blog/:slug", async (req, res) => {
  const { slug } = req.params;

  try {
    const filePath = path.join(BLOG_DIR, `${slug}.md`);
    const file = fs.readFileSync(filePath, "utf-8");

    const { data, content } = matter(file);

    const html = marked.parse(content);

    res.json({
      slug,
      ...data,
      content: html
    });

  } catch (err) {
    res.status(500).json({ error: "Failed to fetch blog" });
  }
});

// GET /api/blogs/local/featured — get featured blog
app.get("/api/blogs/local/featured", async (req, res) => {
  try {
    const blogs = getLocalBlogs();

    const featuredBlog = blogs.find(blog => blog.featured === true || blog.featured === 'true');
    if (!featuredBlog) {
      return res.status(404).json({ error: "No featured blog found" });
    }

    console.log(featuredBlog);

    res.json(featuredBlog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load local blogs" });
  }
});


const MEDIUM_RSS = "https://medium.com/feed/@mnsattributics";

app.get("/api/blogs/medium", async (req, res) => {
  try {
    const response = await axios.get(MEDIUM_RSS, {
      timeout: 10000,
      headers: {
        "User-Agent": "Mozilla/5.0", // helps avoid some bot blocks
      },
    });

    const parser = new xml2js.Parser({ explicitArray: false });
    const result = await parser.parseStringPromise(response.data);

    if (!result?.rss?.channel?.item) {
      return res.status(404).json({
        error: "RSS feed parsed but no blog items found",
      });
    }

    const items = Array.isArray(result.rss.channel.item)
      ? result.rss.channel.item
      : [result.rss.channel.item];

    const blogs = items.map((item) => ({
      title: item.title,
      link: item.link,
      pubDate: item.pubDate,
      description: item.description,
      content: item["content:encoded"],
      categories: item.category || 'General',
    }));

    res.json(blogs);

  } catch (err) {
    console.error("Medium Fetch Error:", err.message);

    res.status(500).json({
      error: "Failed to fetch Medium feed",
      message: err.message,
      status: err.response?.status || null,
      data: err.response?.data || null,
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
