import { useState, useMemo } from 'react';
import Container from '../components/layout/Container';
import { resourcesData } from '../constants/resources';

import ReactMarkdown from "react-markdown";


const ResourcesPage = () => {
    const { hero, filters, blogs, caseStudies } = resourcesData;
    const [activeFilter, setActiveFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    // Merge all resources into one array for filtering
    const allResources = useMemo(() => {
        const merged = [...blogs, ...caseStudies];
        // Sort by date descending (newest first)
        return merged.sort((a, b) => new Date(b.date) - new Date(a.date));
    }, [blogs, caseStudies]);

    // Get the featured item
    const featuredItem = useMemo(() => {
        return allResources.find((item) => item.featured) || allResources[0];
    }, [allResources]);

    // Filtered resources (excluding featured from grid)
    const filteredResources = useMemo(() => {
        let items = allResources.filter((item) => item.id !== featuredItem?.id);

        // Filter by type
        if (activeFilter === 'Blogs') {
            items = items.filter((item) => item.type === 'blog');
        } else if (activeFilter === 'Case Studies') {
            items = items.filter((item) => item.type === 'case-study');
        }

        // Filter by search
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            items = items.filter(
                (item) =>
                    item.title.toLowerCase().includes(query) ||
                    item.description.toLowerCase().includes(query) ||
                    item.category.toLowerCase().includes(query)
            );
        }

        return items;
    }, [allResources, activeFilter, searchQuery, featuredItem]);

    return (
        <>
            {/* Hero Section */}
            <section className="pt-40 lg:pt-48 pb-12 lg:pb-16 bg-white">
                <Container>
                    <div className="max-w-2xl">
                        <p
                            className="uppercase text-xs tracking-[0.2em] text-[#999] mb-3"
                            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                        >
                            {hero.eyebrow}
                        </p>
                        <h1
                            className="text-3xl sm:text-4xl lg:text-[42px] font-normal leading-[130%] text-[#131212] mb-4"
                            style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
                        >
                            {hero.headline}
                        </h1>
                        <p
                            className="text-base lg:text-lg text-[#666] leading-[160%]"
                            style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
                        >
                            {hero.description}
                        </p>
                    </div>
                </Container>
            </section>

            {/* Featured Article */}
            {featuredItem && (
                <section className="pb-12 lg:pb-16 bg-white">
                    <Container>
                        <a href="#" className="block group">
                            <div className="relative rounded-xl overflow-hidden bg-[#F5F5F5]">
                                <div className="flex flex-col lg:flex-row">
                                    {/* Image */}
                                    <div className="lg:w-1/2 h-60 lg:h-90 overflow-hidden">
                                        <img
                                            src={featuredItem.image}
                                            alt={featuredItem.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                        />
                                    </div>
                                    {/* Content */}
                                    <div className="lg:w-1/2 p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
                                        <div className="flex items-center gap-3 mb-4">
                                            <span
                                                className="inline-block px-3 py-1 text-[10px] uppercase tracking-widest font-medium rounded-full bg-[#131212] text-white"
                                                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                                            >
                                                {featuredItem.type === 'blog' ? 'Blog' : 'Case Study'}
                                            </span>
                                            <span
                                                className="inline-block px-3 py-1 text-[10px] uppercase tracking-widest font-medium rounded-full border border-[#D1D5DB] text-[#666]"
                                                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                                            >
                                                {featuredItem.category}
                                            </span>
                                        </div>
                                        <h2
                                            className="text-xl sm:text-2xl lg:text-[28px] font-normal leading-[140%] text-[#131212] mb-3 group-hover:text-[#F5614D] transition-colors duration-300"
                                            style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
                                        >
                                            {featuredItem.title}
                                        </h2>
                                        <p
                                            className="text-sm sm:text-base text-[#666] leading-[160%] mb-5"
                                            style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
                                        >
                                            {featuredItem.description}
                                        </p>
                                        <div className="flex items-center gap-4 text-xs text-[#999]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                                            <span>{featuredItem.date}</span>
                                            <span>•</span>
                                            <span>{featuredItem.readTime}</span>
                                            {featuredItem.result && (
                                                <>
                                                    <span>•</span>
                                                    <span className="text-[#F5614D] font-medium">{featuredItem.result}</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </Container>
                </section>
            )}

            {/* Filters + Search */}
            <section className="pb-8 bg-white">
                <Container>
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
                </Container>
            </section>

            {/* Resources Grid */}
            <section className="pb-20 lg:pb-28 bg-white">
                <Container>
                    {filteredResources.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                            {filteredResources.map((item) => (
                                <a key={item.id} href="#" className="group block">
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
                                            <span
                                                className="text-[10px] uppercase tracking-widest text-[#999] font-medium mb-2"
                                                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                                            >
                                                {item.category}
                                            </span>

                                            {/* Title */}
                                            <h3
                                                className="text-base sm:text-lg font-medium leading-[140%] text-[#131212] mb-2 group-hover:text-[#F5614D] transition-colors duration-300 line-clamp-2"
                                                style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
                                            >
                                                {item.title}
                                            </h3>

                                            {/* Description */}
                                            <p
                                                className="text-sm text-[#666] leading-[160%] mb-4 line-clamp-3 flex-1"
                                                style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
                                            >
                                                {item.description}
                                            </p>

                                            {/* Meta */}
                                            <div
                                                className="flex items-center gap-3 text-[11px] text-[#999] pt-4 border-t border-[#F0F0F0]"
                                                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                                            >
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
                </Container>
            </section>
        </>
    );
};

export default ResourcesPage;
