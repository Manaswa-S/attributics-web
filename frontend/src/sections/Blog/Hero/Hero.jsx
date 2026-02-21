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

  return (
    <>
    {loading && <BlogSkeleton />}
    {!loading && blog && 
      <Block xpad="large" topMargin="small">
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
    }
    </>
  );
};

const BlogSkeleton = () => {
  return (
    <Block xpad="large" topMargin="small">
      <div className="w-full mx-auto flex flex-col items-center animate-pulse">

        {/* HERO IMAGE */}
        <div className="w-full max-h-[26rem] h-[26rem] bg-gray-300 rounded-xl mb-8" />

        {/* META */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-7 h-7 rounded-full bg-gray-300" />
          <div className="h-4 w-24 bg-gray-300 rounded" />
          <div className="h-4 w-12 bg-gray-300 rounded" />
        </div>

        {/* TITLE */}
        <div className="h-10 w-3/4 bg-gray-300 rounded mb-4" />

        {/* SUBTITLE */}
        <div className="h-5 w-2/3 bg-gray-300 rounded mb-12" />

        {/* BODY LINES */}
        <div className="w-full space-y-4">
          <div className="h-4 w-full bg-gray-300 rounded" />
          <div className="h-4 w-full bg-gray-300 rounded" />
          <div className="h-4 w-5/6 bg-gray-300 rounded" />
          <div className="h-4 w-full bg-gray-300 rounded" />
          <div className="h-4 w-4/6 bg-gray-300 rounded" />
        </div>
      </div>
    </Block>
  )
}

export default BlogSection;