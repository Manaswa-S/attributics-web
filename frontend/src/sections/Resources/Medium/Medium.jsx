import { useState, useEffect } from 'react';
import Block from '../../../components/layout/Block/Block';

import {
    transformBlog,
} from "../blogs";

const API_URL = import.meta.env.VITE_API_URL;

const Hero = () => {
    const [mediumBlogs, setMediumBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadMediumBlogs() {
            try {
                const res = await fetch(`${API_URL}/api/blogs/medium`);
                const data = await res.json();

                console.log(data);
    
                const transformed = data.map(transformBlog);
                setMediumBlogs(transformed);
            } catch (err) {
                console.error("Failed to fetch blogs", err);
            } finally {
                setLoading(false);
            }
        }

        loadMediumBlogs();
    }, []);

    const commonMB = 'lg:pb-10 pb-6'; 

    return (
        <>
             {/* Hero Section */}
             <Block xpad='large'>
            <section className={`${commonMB}`}>
                    <div className="max-w-2xl">
                        <p className="section-eyebrow mb-2">
                            Recommendations
                        </p>
                        <h1 className="section-title mb-2">
                        </h1>
                        <p className="section-description mb-2">
                        </p>
                    </div>
            </section>
            </Block>

            {loading && <MediumGridSkeleton />}
            {!loading && 
                <>
                    {/* Resources Grid */}
                    <Block xpad='large'>
                        <section className={`${commonMB}`}>
                            {mediumBlogs.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                                    {mediumBlogs.map((item, index) => (
                                        <a key={index} href={item.link} target="_blank" rel="noopener noreferrer" className="group block">
                                            <article className="h-full flex flex-col rounded-[10px] border border-[#E8E8E8] overflow-hidden hover:border-[#C0C0C0] hover:shadow-lg transition-all duration-300">
                                                {/* Card Image */}
                                                <div className="relative h-50 overflow-hidden">
                                                    <img
                                                        src={item.image}
                                                        alt={item.title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                                    />
                                                    
                                                    {/* Type Badge */}
                                                    <span
                                                        className="absolute top-3 left-3 px-2.5 py-1 text-[9px] uppercase tracking-widest font-medium rounded-full bg-white/90 backdrop-blur-sm text-[#131212]"
                                                        style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                                                    >
                                                        {item.type === 'blog' ? 'Blog' : 'Case Study'}
                                                    </span>
                                                    {/* Result Badge for Case Studies */}
                                                    {item.result && (
                                                        <span
                                                            className="absolute top-3 right-3 px-2.5 py-1 text-[9px] uppercase tracking-[0.05em] font-semibold rounded-full bg-[#F5614D] text-white"
                                                            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                                                        >
                                                            {item.result}
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Card Content */}
                                                <div className="flex-1 flex flex-col p-5">
                                                    {/* Category */}
                                                    <span className="resources-category mb-2">
                                                        {item.category}
                                                    </span>

                                                    {/* Title */}
                                                    <h3 className="resources-title">
                                                        {item.title}
                                                    </h3>

                                                    {/* Description */}
                                                    <p className="resources-description">
                                                        {item.description}
                                                    </p>

                                                    {/* Meta */}
                                                    <div className="resources-meta">
                                                        <span>{item.date}</span>
                                                        <span>•</span>
                                                        <span>{item.readTime}</span>
                                                    </div>
                                                </div>
                                            </article>
                                        </a>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-16">
                                    <p
                                        className="text-lg text-[#999]"
                                        style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
                                    >
                                        No resources found matching your criteria.
                                    </p>
                                    <button
                                        onClick={() => {
                                            setActiveFilter('All');
                                            setSearchQuery('');
                                        }}
                                        className="mt-4 text-sm text-[#F5614D] hover:underline cursor-pointer"
                                        style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                                    >
                                        Clear filters
                                    </button>
                                </div>
                            )}
                        </section>
                    </Block>
                </>
            }
        </>
    );
};

const MediumGridSkeleton = () => {
    const items = Array.from({ length: 3 });
  
    return (
      <Block xpad="large">
        <section className="lg:pb-10 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 animate-pulse">
            {items.map((_, index) => (
              <div
                key={index}
                className="h-full flex flex-col rounded-[10px] border border-[#E8E8E8] overflow-hidden"
              >
                {/* Image */}
                <div className="h-50 bg-gray-300" />
  
                {/* Content */}
                <div className="flex-1 flex flex-col p-5 space-y-3">
                  {/* Category */}
                  <div className="h-3 w-16 bg-gray-300 rounded" />
  
                  {/* Title */}
                  <div className="h-5 w-3/4 bg-gray-300 rounded" />
  
                  {/* Description */}
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-gray-300 rounded" />
                    <div className="h-4 w-5/6 bg-gray-300 rounded" />
                  </div>
  
                  {/* Meta */}
                  <div className="flex gap-3 pt-2">
                    <div className="h-4 w-16 bg-gray-300 rounded" />
                    <div className="h-4 w-10 bg-gray-300 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </Block>
    );
};

export default Hero;
