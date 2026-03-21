import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import Block from "../../components/layout/Block";
import { typography } from "../../constants/global";
import ScrollFade from "../../components/ScrollFade/ScrollFade";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function shuffleArray(arr) {
    const result = [...arr];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}

const Featured = () => {
    const scrollRef = useRef(null);
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const [blogsRes, caseStudiesRes] = await Promise.all([
                    fetch(`${API_URL}/api/blogs/featured`),
                    fetch(`${API_URL}/api/case-studies/featured`),
                ]);

                const blogs = blogsRes.ok ? await blogsRes.json() : [];
                const caseStudies = caseStudiesRes.ok ? await caseStudiesRes.json() : [];

                const normalized = [
                    ...blogs.map((b) => ({
                        id: `blog-${b.slug}`,
                        slug: b.slug,
                        type: "ARTICLE",
                        title: b.title,
                        heroImage: b.heroImage || null,
                        action: "Read Article",
                    })),
                    ...caseStudies.map((c) => ({
                        id: `case-${c.slug}`,
                        slug: c.slug,
                        type: "CASE STUDY",
                        title: c.title,
                        heroImage: c.heroImage || null,
                        action: "See the Case Study",
                    })),
                ];

                setItems(shuffleArray(normalized));
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAll();
    }, []);

    return (
        <>
            <Block xpad="medium" topMargin="medium">
                {/* <div className="xl:h-screen"> */}

                <section className="mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl"
                    >
                        <h1 className="section-title mb-3" style={typography.title.XXL}>
                            Resource <span className="highlight">Center</span>
                        </h1>
                        <p className="section-description" style={typography.desc.Normal}>
                            Learn about everything from customer success stories, product info, to viewpoints from the core team.
                        </p>
                    </motion.div>
                </section>

                <section className="relative">
                    {loading && (
                        <div className="flex justify-center py-24">
                            <div className="w-6 h-6 rounded-full border-2 border-[#FF5A36] border-t-transparent animate-spin" />
                        </div>
                    )}

                    {error && (
                        <div className="flex justify-center py-24">
                            <p className="text-slate-400 text-sm">Could not load resources.</p>
                        </div>
                    )}

                    {!loading && !error && (
                        <>
                            <ScrollFade targetRef={scrollRef} fadeSize={32} />
                            <div
                                ref={scrollRef}
                                className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                            >
                                {items.map((resource, idx) => (
                                    <motion.div
                                        key={resource.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                                        onClick={() =>
                                            navigate(
                                                resource.type === "CASE STUDY"
                                                    ? `/resources/case-study/${resource.slug}`
                                                    : `/resources/article/${resource.slug}`
                                            )
                                        }
                                        className="w-[300px] md:w-[420px] shrink-0 snap-center rounded-[2rem] overflow-hidden group cursor-pointer hover:-translate-y-1 hover:shadow-lg transition-all duration-300 flex flex-col relative"
                                    >
                                        {/* Blurred hero image background */}
                                        {resource.heroImage ? (
                                            <>
                                            <div
                                                className="absolute inset-0 scale-110"
                                                style={{
                                                    backgroundImage: `url(${resource.heroImage})`,
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center',
                                                    filter: 'blur(18px)',
                                                }}
                                            />
                                            <div className="absolute inset-0 bg-white/50" />
                                            </>
                                        ) : (
                                            <div className="absolute inset-0 bg-[#FFF6F4]" />
                                        )}

                                        {/* <div className="absolute inset-0 bg-[#FFF6F4]" /> */}

                                        {/* Card content — sits above bg layers */}
                                        <div className="relative z-10 flex flex-col flex-1 border border-[#FFE8E2] rounded-[2rem]">
                                            {/* Top: type tag */}
                                            <div className="px-8 pt-8 pb-4">
                                                <span className="section-eyebrow text-[10px] font-bold tracking-[0.2em] uppercase text-[#FF5A36]">
                                                    {resource.type}
                                                </span>
                                            </div>

                                            {/* Middle: title */}
                                            <div className="px-8 pb-8">
                                                <h3
                                                    className="section-title font-display font-bold text-slate-900 leading-snug"
                                                    style={{
                                                        fontSize: "clamp(1.3rem, 1rem + 1vw, 1.75rem)",
                                                        display: "-webkit-box",
                                                        WebkitLineClamp: 4,
                                                        WebkitBoxOrient: "vertical",
                                                        overflow: "hidden",
                                                    }}
                                                >
                                                    {resource.title}
                                                </h3>
                                            </div>

                                            {/* Bottom: action button */}
                                            <div className="px-8 pb-8 pt-0 border-t border-[#FFE8E2] mt-auto" style={{marginTop: "auto"}}>
                                                <button className="cursor-pointer mt-6 bg-white text-slate-900 px-5 py-2.5 rounded-full font-bold text-sm shadow-sm border border-[#FFE8E2] group-hover:border-[#FF5A36] group-hover:text-[#FF5A36] transition-all duration-300 flex items-center gap-2">
                                                    {resource.action}
                                                    <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </>
                    )}
                </section>
                {/* </div> */}
            </Block>
        </>
    );
};

export default Featured;