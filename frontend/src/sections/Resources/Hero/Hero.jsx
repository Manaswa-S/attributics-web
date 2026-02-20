import { useState, useMemo, useEffect } from 'react';
import { resourcesData } from '../../../constants/resources';
import Block from '../../../components/layout/Block/Block';
const API_URL = import.meta.env.VITE_API_URL || "localhost:5000";

const Hero = () => {
    const { hero } = resourcesData;

    const [featuredBlog, setFeaturedBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFeaturedBlog() {
            try {
                const res = await fetch(`${API_URL}/api/blogs/local/featured`);
                const data = await res.json();

                console.log(data);
    
                setFeaturedBlog(data);
            } catch (err) {
                console.error("Failed to fetch blogs", err);
            } finally {
                setLoading(false);
            }
        }
    
        loadFeaturedBlog();
    }, []);

    const commonMB = 'lg:pb-10 pb-6'; 

    return (
        <>
            {/* Hero Section */}
            <Block xpad='15%' topMargin='7%'>
            <section className={`${commonMB}`}>
                    <div className="max-w-2xl">
                        <p className="section-eyebrow mb-2">
                            {hero.eyebrow}
                        </p>
                        <h1 className="section-title mb-2">
                            {hero.headline}
                        </h1>
                        <p className="section-description mb-2">
                            {hero.description}
                        </p>
                    </div>
            </section>
            </Block>

            {/* Featured Article */}
            <Block xpad='15%'>
                <section className={`${commonMB}`}>
                    {loading ? (
                    <div className="text-center py-16">
                        <p className="resources-description">
                            Loading resources...
                        </p>
                    </div>
                ) : (
                    <a className="block group" href={`/resources/${featuredBlog.slug}`} target="_blank" rel="noopener noreferrer">
                        <div className="relative rounded-xl overflow-hidden bg-[#F5F5F5]">
                            <div className="flex flex-col lg:flex-row">
                                {/* Image */}
                                <div className="lg:w-1/2 h-60 lg:h-90 overflow-hidden">
                                    <img
                                        src={featuredBlog.heroImage}
                                        alt={featuredBlog.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                    />
                                </div>
                                {/* Content */}
                                <div className="lg:w-1/2 p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span
                                            className="inline-block px-3 py-1 resources-category rounded-full bg-[#131212] text-white"
                                            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                                        >
                                            {featuredBlog.type === 'blog' ? 'Blog' : 'Case Study'}
                                        </span>
                                        <span
                                            className="inline-block px-3 py-0 resources-category rounded-full border border-[#D1D5DB] text-[#666]"
                                            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                                        >
                                            {featuredBlog.category}
                                        </span>
                                    </div>
                                    <h2
                                        className="text-xl sm:text-2xl lg:text-[28px] font-normal leading-[140%] text-[#131212] mb-3 group-hover:text-[#F5614D] transition-colors duration-300"
                                        style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
                                    >
                                        {featuredBlog.title}
                                    </h2>
                                    <p
                                        className="text-sm sm:text-base text-[#666] leading-[160%] mb-3"
                                        style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
                                    >
                                        {featuredBlog.description}
                                    </p>
                                    <div className="resources-meta" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                                        <img
                                            src={featuredBlog.author.avatar}
                                            alt={featuredBlog.author.name}
                                            className="w-7 h-7 rounded-full object-cover"
                                        />
                                        <span>{featuredBlog.author.name}</span>
                                    </div>
                                    <div className="resources-meta" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                                        <span>{featuredBlog.publishedAt}</span>
                                        <span>•</span>
                                        <span>{featuredBlog.readTime}</span>
                                        {featuredBlog.result && (
                                            <>
                                                <span>•</span>
                                                <span className="text-[#F5614D] font-medium">{featuredBlog.result}</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>
                )}
                </section>
            </Block>
        </>
    );
};

export default Hero;
