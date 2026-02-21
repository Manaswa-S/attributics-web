import { useState, useMemo, useEffect } from 'react';
import Block from '../../../components/layout/Block/Block';

import {
    transformBlog,
    sortBlogs,
    filterBlogs,
    searchBlogs
} from "../blogs";

const API_URL = import.meta.env.VITE_API_URL;

const Local = () => {
    const [localBlogs, setLocalBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const [activeFilter, setActiveFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        async function loadLocalBlogs() {
            try {
                const res = await fetch(`${API_URL}/api/blogs/local`);
                const data = await res.json();

                console.log(data);
    
                setLocalBlogs(data.map(blog => ({
                    ...blog,
                    title: blog.title || "",
                    description: blog.subtitle || "",
                    category: blog.category || "General",
                    type: "blog",
                })));
            } catch (err) {
                console.error("Failed to fetch blogs", err);
            } finally {
                setLoading(false);
            }
        }
    
        loadLocalBlogs();
    }, []);

    const allResources = useMemo(() => {
        return sortBlogs(localBlogs);
    }, [localBlogs]);

    const filters = useMemo(() => {
        const set = new Set();
    
        allResources.forEach((blog) => {
            if (blog.category && blog.category !== "General") {
                set.add(blog.category);
            }
        });
    
        return ["All", ...Array.from(set)];
    }, [allResources]);
    
    // Get the featured item
    const featuredItem = useMemo(() => {
        return allResources.find((item) => item.featured);
    }, [allResources]);

    const filteredResources = useMemo(() => {
        let items = allResources;
    
        items = filterBlogs(items, activeFilter);
        items = searchBlogs(items, searchQuery);
    
        return items.filter(item => item.featured !== true && item.featured !== "true");
    }, [allResources, activeFilter, searchQuery, featuredItem]);
    
    const commonMB = 'lg:pb-10 pb-6'; 

    return (
        <>
            {/* Filters + Search */}
            <Block xpad='large'>
            <section className={`${commonMB}`}>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    {/* Filter Tabs */}
                    <div className="flex items-center gap-2">
                        {filters.map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`px-4 py-2 text-xs uppercase tracking-widest font-medium rounded-full transition-all duration-200 cursor-pointer ${
                                    activeFilter === filter
                                        ? 'bg-[#131212] text-white'
                                        : 'bg-[#F5F5F5] text-[#666] hover:bg-[#E8E8E8]'
                                }`}
                                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>

                    {/* Search */}
                    <div className="relative w-full sm:w-70">
                        <svg
                            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search resources..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 text-sm border border-[#D1D5DB] rounded-full focus:outline-none focus:border-[#131212] transition-colors"
                            style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
                        />
                    </div>
                </div>
            </section>
            </Block>

            {loading && <ResourcesGridSkeleton />}
            {!loading && featuredItem && 
                <>
                    {/* Resources Grid */}
                    <Block xpad='large'>
                        <section className={`${commonMB}`}>
                            {loading ? (
                                <div className="text-center py-16">
                                    <p className="resources-description">
                                        Loading resources...
                                    </p>
                                </div>
                            ) : filteredResources.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                                    {filteredResources.map((item, index) => (
                                        <a key={index} href={`/resources/${item.slug}`} target="_blank" rel="noopener noreferrer" className="group block">
                                            <article className="h-full flex flex-col rounded-[10px] border border-[#E8E8E8] overflow-hidden hover:border-[#C0C0C0] hover:shadow-lg transition-all duration-300">
                                                {/* Card Image */}
                                                <div className="relative h-50 overflow-hidden">
                                                    <img
                                                        src={item.heroImage}
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
                                                        <span>{featuredItem.author.name}</span>
                                                        <span>•</span>
                                                        <span>{item.publishedAt}</span>
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

const ResourcesGridSkeleton = () => {
    const skeletonItems = Array.from({ length: 3 });
  
    return (
      <Block xpad="large">
        <section className="lg:pb-10 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 animate-pulse">
            {skeletonItems.map((_, index) => (
              <div
                key={index}
                className="h-full flex flex-col rounded-[10px] border border-[#E8E8E8] overflow-hidden"
              >
                {/* Image Skeleton */}
                <div className="h-50 bg-gray-300" />
  
                {/* Content Skeleton */}
                <div className="flex-1 flex flex-col p-5 space-y-3">
                  <div className="h-3 w-16 bg-gray-300 rounded" /> {/* category */}
                  <div className="h-5 w-3/4 bg-gray-300 rounded" /> {/* title */}
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-gray-300 rounded" />
                    <div className="h-4 w-5/6 bg-gray-300 rounded" />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <div className="h-4 w-16 bg-gray-300 rounded" />
                    <div className="h-4 w-10 bg-gray-300 rounded" />
                    <div className="h-4 w-14 bg-gray-300 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </Block>
    );
};

export default Local;
