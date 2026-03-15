import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight } from "lucide-react";
import Block from "../../components/layout/Block";
import { typography } from "../../constants/global";
import ScrollFade from "../../components/ScrollFade/ScrollFade";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const blogsBodySize = "clamp(1.2rem, 0.85rem + 0.4vw, 1.2rem)";
const blogsCardTitleSize = "clamp(1.4rem, 1.05rem + 0.9vw, 1.7rem)";

const Stories = () => {
    const scrollRef = useRef(null);
    const navigate = useNavigate();
    const [caseStudies, setCaseStudies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCaseStudies = async () => {
            try {
                const res = await fetch(`${API_URL}/api/case-studies`);
                if (!res.ok) throw new Error(`Failed to fetch case studies (${res.status})`);
                const data = await res.json();
                setCaseStudies(data);
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCaseStudies();
    }, []);

    return (
        <>
            <Block xpad="medium" topMargin="none">
                <section className="container relative">
                    <div className="flex flex-col mb-16 items-center text-center">
                        <h2
                            className="section-title mb-6"
                            style={typography.title.XXL}
                        >
                            <span className="highlight">Success Stories</span>{' '}from Our Clients
                        </h2>
                        <div className="flex items-center gap-4">
                            <p
                                className="section-description max-w-2xl text-center"
                                style={typography.desc.Normal}
                            >
                                We help founders, startups, and businesses turn their ideas into reality through strategy, design, and collaboration.
                            </p>
                        </div>
                    </div>

                    {loading && (
                        <div className="flex justify-center py-24">
                            <div className="w-6 h-6 rounded-full border-2 border-[#FF5A36] border-t-transparent animate-spin" />
                        </div>
                    )}

                    {error && (
                        <div className="flex justify-center py-24">
                            <p className="text-slate-400 text-sm">Could not load case studies.</p>
                        </div>
                    )}

                    {!loading && !error && (
                        <div className="relative">
                            <ScrollFade targetRef={scrollRef} fadeSize={32} />
                            <div
                                ref={scrollRef}
                                className="flex overflow-x-auto snap-x snap-mandatory gap-8 pb-12 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                            >
                                <AnimatePresence mode="popLayout">
                                    {caseStudies.map((study, idx) => (
                                        <motion.div
                                            key={study.slug}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ duration: 0.35, delay: idx * 0.07 }}
                                            onClick={() => navigate(`/resources/case-study/${study.slug}`)}
                                            className="w-[320px] md:w-[400px] shrink-0 snap-center group flex flex-col bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-1 cursor-pointer"
                                        >
                                            <div className="h-56 overflow-hidden relative">
                                                <div className="absolute inset-0 bg-slate-900/5 group-hover:bg-transparent transition-colors duration-500 z-10" />
                                                <img
                                                    src={study.heroImage}
                                                    alt={study.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                                />
                                            </div>
                                            <div className="p-8 flex flex-col flex-grow">
                                                <div className="flex items-center justify-between mb-4">
                                                    <span className="text-[10px] font-bold tracking-widest uppercase text-[#FF5A36] bg-[#FF5A36]/10 px-3 py-1 rounded-full">
                                                        {study.industry}
                                                    </span>
                                                </div>
                                                <h3
                                                    className="font-display font-bold text-slate-900 mb-3 group-hover:text-[#FF5A36] transition-colors"
                                                    style={{ fontSize: blogsCardTitleSize }}
                                                >
                                                    {study.client}
                                                </h3>
                                                <p
                                                    className="text-slate-500 leading-relaxed mb-8 flex-grow"
                                                    style={{ fontSize: blogsBodySize }}
                                                >
                                                    {study.subtitle}
                                                </p>
                                                <div className="mt-auto pt-6 border-t border-slate-100">
                                                    <div
                                                        className="inline-flex items-center gap-2 font-bold text-slate-900 group-hover:text-[#FF5A36] transition-colors"
                                                        style={{ fontSize: blogsBodySize }}
                                                    >
                                                        View Case Study <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </div>
                    )}
                </section>
            </Block>
        </>
    );
};

export default Stories;
