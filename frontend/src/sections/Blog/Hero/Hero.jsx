import { useEffect, useState } from "react";
import Block from "../../../components/layout/Block/Block";
const API_URL = import.meta.env.VITE_API_URL;

const BlogSection = ({ slug }) => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlog() {
      try {
        const res = await fetch(`${API_URL}/api/blogs/local/blog/${slug}`);
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

  if (loading)
    return <div className="py-24 text-center">Loading...</div>;

  if (!blog)
    return <div className="py-24 text-center">Blog not found</div>;

  return (
    <Block xpad="15%" topMargin="5%">
      <div className="w-full mx-auto flex flex-col items-center">

        {/* HERO IMAGE */}
        <img
          src={blog.heroImage}
          alt={blog.title}
          className="w-full max-h-[26rem] object-cover rounded-xl mb-8"
        />

        {/* META */}
        <div className="flex items-center gap-3 mb-6 flex-wrap justify-center">
          {blog.author?.avatar && (
            <img
              src={blog.author.avatar}
              alt={blog.author.name}
              className="w-7 h-7 rounded-full object-cover"
            />
          )}
          <span className="section-description">{blog.author?.name}</span>
          <span className="section-eyebrow">·</span>
          <span className="section-eyebrow">{blog.publishedAt}</span>
          {blog.readTime && (
            <>
              <span className="section-eyebrow">·</span>
              <span className="section-eyebrow">{blog.readTime}</span>
            </>
          )}
        </div>

        {/* TITLE */}
        <h1 className="section-title leading-tight mb-4" style={{color: 'black'}}>
          {blog.title}
        </h1>

        {/* SUBTITLE */}
        {blog.subtitle && (
          <p className="section-description text-center mb-12">
            {blog.subtitle}
          </p>
        )}

        {/* BODY */}
        <div
          className="blog-article"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>
      
    </Block>
  );
};

const renderContentBlock = (block, index) => {
  switch (block.type) {
    case "heading":
      const Tag = `h${block.level || 2}`;
      return (
        <Tag
          key={index}
          className="font-semibold mt-10 mb-4 text-2xl sm:text-3xl"
        >
          {block.value}
        </Tag>
      );

    case "paragraph":
      return (
        <p
          key={index}
          className="text-base sm:text-lg leading-relaxed text-gray-800"
        >
          {block.value}
        </p>
      );

    case "quote":
      return (
        <blockquote
          key={index}
          className="border-l-4 border-black pl-4 italic text-gray-700 my-6"
        >
          {block.value}
        </blockquote>
      );

    case "code":
      return (
        <pre
          key={index}
          className="bg-gray-100 rounded-lg p-4 overflow-x-auto text-sm my-6"
        >
          <code>{block.value}</code>
        </pre>
      );

    default:
      return null;
  }
};

export default BlogSection;