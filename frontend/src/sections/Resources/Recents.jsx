import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Clock, Calendar } from "lucide-react";
import Block from "../../components/layout/Block";
import { typography } from "../../constants/global";
import { useNavigate } from "react-router-dom";
import { authorAvatars } from "../../constants/resources";

const API_URL = import.meta.env.VITE_API_URL;

function formatDate(dateStr) {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
}

const Recents = () => {
    const navigate = useNavigate();
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecent = async () => {
            try {
                const res = await fetch("/content/built/blogs/recent.json");
                if (!res.ok) throw new Error(`Failed to fetch recent blogs (${res.status})`);
                const data = await res.json();
                console.log(data);
                setArticles(data);
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
    
        fetchRecent();
    }, []);

    return (
        <section className="bg-[#f7f7f7] pt-16 sm:pt-20 md:pt-24 pb-20 sm:pb-32 md:pb-42 border-t border-slate-100">
            <Block xpad="large" topMargin="none">
                <div className="mb-10 sm:mb-14 md:mb-16 text-center">
                    <h2
                        className="section-title mb-4"
                        style={typography.title.XXL}
                    >
                        Recently <span className="highlight">Added</span>
                    </h2>
                    <p
                        className="section-description"
                        style={typography.desc.Normal}
                    >
                        We provide tips and resources from industry leaders. For real.
                    </p>
                </div>

                {loading && (
                    <div className="flex justify-center py-24">
                        <div className="w-6 h-6 rounded-full border-2 border-[#FF5A36] border-t-transparent animate-spin" />
                    </div>
                )}

                {error && (
                    <div className="flex justify-center py-24">
                        <p className="text-slate-400 text-sm">Could not load recent articles.</p>
                    </div>
                )}

                {!loading && !error && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
                        {articles.map((article, idx) => (
                            <motion.div
                            key={article.slug}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            onClick={() => navigate(`/resources/article/${article.slug}`)}
                            className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 group cursor-pointer hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-500 flex flex-col"
                        >
                            {/* Hero Image */}
                            <div className="h-44 sm:h-48 overflow-hidden flex-shrink-0 relative">
                                <div className="absolute inset-0 bg-slate-900/5 group-hover:bg-transparent transition-colors duration-500 z-10" />
                                <img
                                    src={article.heroImage}
                                    alt={article.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                            </div>

                                {/* Card Body */}
                                <div className="p-5 sm:p-6 lg:p-7 flex flex-col flex-1">

                                    {/* Category Badge — matches image style */}
                                    {article.category && (
                                        <div className="mb-3">
                                            <span className="inline-block bg-brand/10 text-brand text-[10px] sm:text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                                                {article.category}
                                            </span>
                                        </div>
                                    )}

                                    {/* Title */}
                                    <h3 className="mb-2 group-hover:!text-brand !leading-snug  transition-colors section-title" style={typography.title.SM}>
                                        {article.title}
                                    </h3>

                                    {/* Subtitle */}
                                    <p className="section-description leading-snug mb-4 line-clamp-2" style={typography.desc.Smaller}>
                                        {article.subtitle}
                                    </p>

                                    {/* Meta row: read time + date */}
                                    <div className="flex items-center gap-3 mb-4 mt-auto">
                                        {article.readTime && (
                                            <div className="flex items-center gap-1 text-slate-400 text-[11px] font-medium">
                                                <Clock size={11} />
                                                <span>{article.readTime} min read</span>
                                            </div>
                                        )}
                                        {article.publishedAt && (
                                            <div className="flex items-center gap-1 text-slate-400 text-[11px] font-medium">
                                                <Calendar size={11} />
                                                <span>{formatDate(article.publishedAt)}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Author row */}
                                    <div className="flex items-center gap-3 pt-4 border-t border-slate-100 mt-0">
                                        <img
                                            src={authorAvatars[article.author.avatar]}
                                            alt={article.author?.name}
                                            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover flex-shrink-0"
                                        />
                                        <div className="flex flex-col min-w-0">
                                            <span className="font-bold text-slate-900 text-sm truncate">
                                                {article.author?.name}
                                            </span>
                                            {article.author?.role && (
                                                <span className="text-[10px] text-slate-500 truncate">
                                                    {article.author.role}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </Block>
        </section>
    );
};

export default Recents;