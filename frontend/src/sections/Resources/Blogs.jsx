import { motion, AnimatePresence } from "motion/react";
import { ArrowRight } from "lucide-react";
import Block from "../../components/layout/Block";
import { useState } from "react";

const tabs = ["Featured", "Articles", "Case Studies"];

const caseStudies = [
  {
    id: "truva",
    type: "Featured",
    title: "Truva",
    description: "Building a modern, robust platform for real estate that simplifies the buying and selling process with transparency and speed.",
    liveSite: "www.truva.com",
    published: "©2024",
    industry: "Real Estate",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "gynoveda",
    type: "Featured",
    title: "Gynoveda",
    description: "Empowering women's health through Ayurveda. We helped scale their digital presence to reach millions seeking natural wellness solutions.",
    liveSite: "www.gynoveda.com",
    published: "©2024",
    industry: "Health & Wellness",
    image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "unicef",
    type: "Articles",
    title: "UNICEF",
    description: "Driving global impact through optimized donation funnels and engagement campaigns that connect with donors worldwide.",
    liveSite: "www.unicef.org",
    published: "©2023",
    industry: "Non-Profit",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "club-mahindra",
    type: "Articles",
    title: "Club Mahindra",
    description: "Reimagining the vacation ownership experience with a seamless digital booking platform and personalized member journeys.",
    liveSite: "www.clubmahindra.com",
    published: "©2023",
    industry: "Hospitality",
    image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "americana",
    type: "Case Studies",
    title: "Americana Restaurant",
    description: "Transforming the quick-service restaurant industry with a unified ordering system and loyalty program across multiple brands.",
    liveSite: "www.americana.com",
    published: "©2024",
    industry: "Food & Beverage",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "fintech-pro",
    type: "Case Studies",
    title: "FintechPro",
    description: "Accelerating user onboarding and increasing transaction volume through AI-driven behavioral nudges.",
    liveSite: "www.fintechpro.com",
    published: "©2024",
    industry: "Finance",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "retail-plus",
    type: "Case Studies",
    title: "RetailPlus",
    description: "Creating a unified omnichannel experience that increased customer lifetime value by 35% within six months.",
    liveSite: "www.retailplus.com",
    published: "©2023",
    industry: "E-Commerce",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200"
  }
];

const Blogs = () => {
    const [activeTab, setActiveTab] = useState("Featured");

    const filtered = caseStudies.filter((s) => s.type === activeTab);

    return (
        <>
            <Block xpad="large" topMargin="none">
                <section className="container mb-12">
                    <div className="flex flex-wrap items-center justify-center gap-2 md:gap-8 border-b border-slate-200">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`pb-4 px-4 text-sm font-bold tracking-wide transition-colors relative ${
                                    activeTab === tab ? "!text-[#FF5A36]" : "text-slate-500 hover:text-slate-800"
                                }`}
                            >
                                <p className="section-eyebrow !my-0">{tab}</p>
                                {activeTab === tab && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF5A36]"
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </section>

                <section className="container relative">
                    <div className="flex flex-col items-center text-center mb-16">
                        <h2 className="section-title text-4xl md:text-6xl font-display !font-extrabold text-slate-900 mb-6">
                            Impactful <span className="highlight">Projects</span>
                        </h2>
                        <div className="flex items-center gap-4">
                            <div className="h-px w-16 bg-[#FF5A36]" />
                            <p className="section-description text-slate-600 max-w-xl text-left">
                                We help <span className="font-bold text-slate-900">founders, startups,</span> and businesses turn their <span className="font-bold text-slate-900">ideas</span> into reality through strategy, design, and <span className="font-bold text-slate-900">collaboration.</span>
                            </p>
                        </div>
                    </div>

                    {/* <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" /> */}
                    {/* <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" /> */}

                    <div className="flex overflow-x-auto snap-x snap-mandatory gap-8 pb-12 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        <AnimatePresence mode="popLayout">
                            {filtered.map((study, idx) => (
                                <motion.div
                                    key={study.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.35, delay: idx * 0.07 }}
                                    className="w-[320px] md:w-[400px] shrink-0 snap-center group flex flex-col bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-1"
                                >
                                    <div className="h-56 overflow-hidden relative">
                                        <div className="absolute inset-0 bg-slate-900/5 group-hover:bg-transparent transition-colors duration-500 z-10" />
                                        <img
                                            src={study.image}
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
                                        <h3 className="text-2xl font-display font-bold text-slate-900 mb-3 group-hover:text-[#FF5A36] transition-colors">
                                            {study.title}
                                        </h3>
                                        <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-grow">
                                            {study.description}
                                        </p>
                                        <div className="mt-auto pt-6 border-t border-slate-100">
                                            <div className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 group-hover:text-[#FF5A36] transition-colors">
                                                View Case Study <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </section>
            </Block>
        </>
    );
};

export default Blogs;