import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Clock } from "lucide-react";

const tabs = ["Featured", "Articles", "Case Studies"];

const featuredResources = [
  {
    id: 1,
    type: "ARTICLE",
    title: "Understanding the Mobile Delivery Gap",
    action: "Read Article"
  },
  {
    id: 2,
    type: "CASE STUDY",
    title: "Building the new Marketwatch app",
    action: "See the Case Study"
  },
  {
    id: 3,
    type: "ARTICLE",
    title: "The Future of Lifecycle Marketing",
    action: "Read Article"
  },
  {
    id: 4,
    type: "ARTICLE",
    title: "Mastering Customer Retention in 2024",
    action: "Read Article"
  },
  {
    id: 5,
    type: "CASE STUDY",
    title: "AI-Driven Personalization Strategies",
    action: "See the Case Study"
  }
];

const caseStudies = [
  {
    id: "truva",
    title: "Truva",
    description: "Building a modern, robust platform for real estate that simplifies the buying and selling process with transparency and speed.",
    liveSite: "www.truva.com",
    published: "©2024",
    industry: "Real Estate",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "gynoveda",
    title: "Gynoveda",
    description: "Empowering women's health through Ayurveda. We helped scale their digital presence to reach millions seeking natural wellness solutions.",
    liveSite: "www.gynoveda.com",
    published: "©2024",
    industry: "Health & Wellness",
    image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "unicef",
    title: "UNICEF",
    description: "Driving global impact through optimized donation funnels and engagement campaigns that connect with donors worldwide.",
    liveSite: "www.unicef.org",
    published: "©2023",
    industry: "Non-Profit",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "club-mahindra",
    title: "Club Mahindra",
    description: "Reimagining the vacation ownership experience with a seamless digital booking platform and personalized member journeys.",
    liveSite: "www.clubmahindra.com",
    published: "©2023",
    industry: "Hospitality",
    image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "americana",
    title: "Americana Restaurant",
    description: "Transforming the quick-service restaurant industry with a unified ordering system and loyalty program across multiple brands.",
    liveSite: "www.americana.com",
    published: "©2024",
    industry: "Food & Beverage",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "fintech-pro",
    title: "FintechPro",
    description: "Accelerating user onboarding and increasing transaction volume through AI-driven behavioral nudges.",
    liveSite: "www.fintechpro.com",
    published: "©2024",
    industry: "Finance",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "retail-plus",
    title: "RetailPlus",
    description: "Creating a unified omnichannel experience that increased customer lifetime value by 35% within six months.",
    liveSite: "www.retailplus.com",
    published: "©2023",
    industry: "E-Commerce",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200"
  }
];

const recentArticles = [
  {
    id: 1,
    title: "What is a UI Kit? Examples and Why you need one",
    excerpt: "Our documentation for Base Components and Core Elements is now complete.",
    author: "Bessie Cooper",
    date: "Jan 06, 2024",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600",
    authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100"
  },
  {
    id: 2,
    title: "Is the Future of Finance Decentralized?",
    excerpt: "Our documentation for Base Components and Core Elements is now complete.",
    author: "Brooklyn Simmons",
    date: "Jan 06, 2024",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=600",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100"
  },
  {
    id: 3,
    title: "Fintech Fails and Lessons Learned",
    excerpt: "Our documentation for Base Components and Core Elements is now complete.",
    author: "Leslie Alexander",
    date: "Jan 06, 2024",
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=600",
    authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100"
  }
];

const HeaderFeaturedSection = () => (
  <>
    <section className="container mx-auto px-6 max-w-7xl mb-16">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl"
      >
        <h1 className="text-5xl md:text-6xl font-display font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.1]">
          Resource <span className="text-[#FF5A36]">Center</span>
        </h1>
        <p className="text-xl text-slate-600 leading-relaxed">
          Learn about everything from customer success stories, product info, to viewpoints from the core team.
        </p>
      </motion.div>
    </section>

    <section className="container mx-auto px-6 max-w-7xl mb-12 relative">
      <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
      
      <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {featuredResources.map((resource, idx) => (
          <motion.div
            key={resource.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="w-[300px] md:w-[400px] shrink-0 snap-center relative rounded-[2rem] overflow-hidden h-[320px] group cursor-pointer bg-[#FFF6F4] border border-[#FFE8E2] hover:-translate-y-1 hover:shadow-md transition-all duration-300"
          >
            <div className="relative z-10 p-8 flex flex-col h-full">
              <span className="text-xs font-bold tracking-widest uppercase mb-4 text-[#FF5A36]">
                {resource.type}
              </span>
              <h3 className="text-3xl font-display font-bold leading-tight mb-auto text-slate-900">
                {resource.title}
              </h3>
              <button className="bg-white text-slate-900 px-6 py-3 rounded-full font-bold text-sm self-start shadow-sm border border-[#FFE8E2] group-hover:border-[#FF5A36] group-hover:text-[#FF5A36] transition-all duration-300 flex items-center gap-2">
                {resource.action} <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  </>
);

const TabsImpactfulSection = ({ activeTab, onTabChange }) => (
  <>
    <section className="container mx-auto px-6 max-w-7xl mb-20">
      <div className="flex flex-wrap items-center justify-center gap-2 md:gap-8 border-b border-slate-200">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`pb-4 px-4 text-sm font-bold tracking-wide transition-colors relative ${
              activeTab === tab ? "text-[#FF5A36]" : "text-slate-500 hover:text-slate-800"
            }`}
          >
            {tab}
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

    <section className="container mx-auto px-6 max-w-7xl mb-32 relative">
      <div className="flex flex-col items-center text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-display font-extrabold text-slate-900 mb-6">
          Impactful <span className="text-[#FF5A36]">Projects</span>
        </h2>
        <div className="flex items-center gap-4">
          <div className="h-px w-16 bg-[#FF5A36]" />
          <p className="text-slate-600 max-w-xl text-left">
            We help <span className="font-bold text-slate-900">founders, startups,</span> and businesses turn their <span className="font-bold text-slate-900">ideas</span> into reality through strategy, design, and <span className="font-bold text-slate-900">collaboration.</span>
          </p>
        </div>
      </div>
      
      <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      <div className="flex overflow-x-auto snap-x snap-mandatory gap-8 pb-12 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {caseStudies.map((study, idx) => (
          <motion.div
            key={study.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
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
      </div>
    </section>
  </>
);

const RecentlyAddedSection = () => (
  <section className="bg-[#FAFAFA] py-24 border-t border-slate-100">
    <div className="container mx-auto px-6 max-w-7xl">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-display font-extrabold tracking-tight text-slate-900 mb-4">
          Recently <span className="text-[#FF5A36]">Added</span>
        </h2>
        <p className="text-slate-500 text-lg">
          We provide tips and resources from industry leaders. For real.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {recentArticles.map((article, idx) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="bg-white rounded-3xl overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 group cursor-pointer hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300"
          >
            <div className="h-48 overflow-hidden">
              <img 
                src={article.image} 
                alt={article.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6 md:p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-3 leading-snug group-hover:text-[#FF5A36] transition-colors">
                {article.title}
              </h3>
              <p className="text-slate-500 text-sm mb-8 line-clamp-2">
                {article.excerpt}
              </p>
              
              <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <img src={article.authorAvatar} alt={article.author} className="w-8 h-8 rounded-full object-cover" />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-900">{article.author}</span>
                    <span className="text-[10px] text-slate-500">Regional Marketing Developer</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 bg-[#FF5A36]/10 text-[#FF5A36] px-2.5 py-1 rounded-full text-[10px] font-bold">
                  <Clock size={10} />
                  {article.date}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Hero = () => {
  const [activeTab, setActiveTab] = useState("Featured");
  
  return (
    <div className="pt-32 pb-20 bg-white">
      <HeaderFeaturedSection />
      <TabsImpactfulSection activeTab={activeTab} onTabChange={setActiveTab} />
      <RecentlyAddedSection />
    </div>
  );
};

export default Hero;
