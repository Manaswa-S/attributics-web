import { useEffect, useState } from "react";
import Block from "../../components/layout/Block/Block";
import { motion } from 'motion/react';

const API_URL = import.meta.env.VITE_API_URL;

// ─── Preview banner ───────────────────────────────────────────────────────────

const PreviewBanner = () => (
  <div style={{
    background: "#fefce8",
    borderBottom: "1px solid #fde68a",
    padding: "10px 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    fontSize: "12px",
    color: "#92400e",
    letterSpacing: "0.04em",
    fontFamily: "monospace",
  }}>
    <span style={{ fontSize: "10px" }}>◆</span>
    PREVIEW MODE — this post is not published
  </div>
);

// ─── Main component ───────────────────────────────────────────────────────────

const BlogSection = ({ slug }) => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlog() {
      try {
        const res = await fetch(`${API_URL}/api/blogs/${slug}`);
        const data = await res.json();
        setBlog(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchBlog();
  }, [slug]);

  if (loading) return <BlogSkeleton />;
  if (!blog) return null;

  return (
    <>
      {blog._preview && <PreviewBanner />}

      <Block xpad="larger" topMargin="medium">
        <div className="blog-container">

          {/* META + TITLE — centered */}
          <div className="flex flex-col items-center text-center mb-12">
            <div className="flex items-center gap-3 mb-4 flex-wrap justify-center">
              {blog.author?.avatar && (
                <img
                  src={blog.author.avatar}
                  alt={blog.author.name}
                  className="w-7 h-7 rounded-full object-cover"
                />
              )}
              <span className="section-eyebrow">{blog.author?.name}</span>
              {blog.publishedAt && (
                <>
                  <span className="section-eyebrow opacity-30">·</span>
                  <span className="section-eyebrow">
                    {new Date(blog.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </>
              )}
              {blog.readTime && (
                <>
                  <span className="section-eyebrow opacity-30">·</span>
                  <span className="section-eyebrow">{blog.readTime}</span>
                </>
              )}
            </div>

            <h1 className="section-title text-center" style={{ fontSize: "2.6rem" }}>
              {blog.title}
            </h1>
          </div>

          {/* HERO IMAGE — full width, sits in normal block flow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="w-full mb-20"
          >
            <div className="w-full overflow-hidden rounded-2xl">
              <img
                src={blog.heroImage}
                alt={blog.title}
                className="w-full h-auto block"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>

          {/* DIVIDER */}
          <div className="w-8 h-px bg-current opacity-20 mb-6 mx-auto" />

          {/* BODY */}
          <div
            className="blog-article"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

        </div>
      </Block>
    </>
  );
};

// ─── Skeleton ─────────────────────────────────────────────────────────────────

const BlogSkeleton = () => (
  <Block xpad="large" topMargin="small">
    <div className="w-full mx-auto animate-pulse">

      {/* META */}
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="w-7 h-7 rounded-full bg-gray-200" />
        <div className="h-4 w-24 bg-gray-200 rounded" />
        <div className="h-4 w-4 bg-gray-200 rounded" />
        <div className="h-4 w-28 bg-gray-200 rounded" />
        <div className="h-4 w-4 bg-gray-200 rounded" />
        <div className="h-4 w-16 bg-gray-200 rounded" />
      </div>

      {/* TITLE */}
      <div className="flex flex-col items-center mb-12 gap-3">
        <div className="h-10 w-3/4 bg-gray-200 rounded-lg" />
        <div className="h-10 w-1/2 bg-gray-200 rounded-lg" />
      </div>

      {/* HERO IMAGE */}
      <div className="w-full aspect-[16/9] bg-gray-200 rounded-2xl mb-20" />

      {/* DIVIDER */}
      <div className="w-8 h-px bg-gray-300 mb-6 mx-auto" />

      {/* BODY LINES */}
      <div className="w-full space-y-3">
        {[100, 97, 91, 100, 95, 63, 100, 89, 76, 100, 83, 58].map((w, i) => (
          <div key={i} className="h-4 bg-gray-200 rounded" style={{ width: `${w}%` }} />
        ))}
      </div>

    </div>
  </Block>
);

export default BlogSection;
