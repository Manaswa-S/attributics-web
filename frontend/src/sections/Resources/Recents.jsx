import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Clock } from "lucide-react";
import Block from "../../components/layout/Block";
import { typography } from "../../constants/global";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const recentsBodySize = "clamp(1.2rem, 0.85rem + 0.4vw, 1.2rem)";
const recentsCardTitleSize = "clamp(1.4rem, 1rem + 0.9vw, 1.5rem)";

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
                const res = await fetch(`${API_URL}/api/blogs/recent`);
                if (!res.ok) throw new Error(`Failed to fetch recent blogs (${res.status})`);
                const data = await res.json();
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
        <section className="bg-[#f7f7f7] pt-24 pb-42 border-t border-slate-100">
        <Block xpad="large" topMargin="none">
            <div className="mb-16 text-center">
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
                <div className="grid md:grid-cols-3 gap-8">
                    {articles.map((article, idx) => (
                        <motion.div
                            key={article.slug}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            onClick={() => navigate(`/resources/article/${article.slug}`)}
                            className="bg-white rounded-3xl overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 group cursor-pointer hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 flex flex-col"
                        >
                            <div className="h-48 overflow-hidden">
                                <img
                                    src={article.heroImage}
                                    alt={article.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-6 md:p-8 flex flex-col flex-1 min-h-0">
                                <h3
                                    className="font-bold text-slate-900 mb-3 leading-snug group-hover:text-[#FF5A36] transition-colors"
                                    style={{ fontSize: recentsCardTitleSize }}
                                >
                                    {article.title}
                                </h3>
                                <p
                                    className="text-slate-500 line-clamp-2"
                                    style={{ fontSize: recentsBodySize }}
                                >
                                    {article.subtitle}
                                </p>

                                <div className="flex items-center justify-between pt-6 border-t border-slate-100 mt-auto">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={article.author?.avatar}
                                            alt={article.author?.name}
                                            className="w-8 h-8 rounded-full object-cover"
                                        />
                                        <div className="flex flex-col">
                                            <span className="font-bold text-slate-900" style={{ fontSize: recentsBodySize }}>
                                                {article.author?.name}
                                            </span>
                                            {article.author?.role && (
                                                <span className="text-[10px] text-slate-500">{article.author.role}</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1.5 bg-[#FF5A36]/10 text-[#FF5A36] px-2.5 py-1 rounded-full text-[10px] font-bold">
                                        <Clock size={10} />
                                        {formatDate(article.publishedAt)}
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