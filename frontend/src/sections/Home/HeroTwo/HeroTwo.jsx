import { useState, useEffect, useRef } from "react";
import {
  SparklesIcon,
  ArrowRightIcon,
  TrendingUpIcon,
  ChevronRightIcon
} from "../../../components/Icons/Icons";

import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";

const HeroTwo = () => {
    const [index, setIndex] = useState(0);
    const phrases = [
      "predict customer behavior",
      "automate journeys",
      "optimize engagement"
    ];
  
    useEffect(() => {
      const timer = setInterval(() => {
        setIndex((prev) => (prev + 1) % phrases.length);
      }, 3000);
      return () => clearInterval(timer);
    }, []);
  
    const containerRef = useRef(null);
    
    // Track scroll progress based on the window scroll instead of container
    const { scrollY } = useScroll();
  
    // Transform scroll position into parallax movements
    // These will move as the user scrolls down the page
    const y1 = useTransform(scrollY, [0, 1000], [0, -100]);
    const y2 = useTransform(scrollY, [0, 1000], [0, -200]);
    const y3 = useTransform(scrollY, [0, 1000], [0, -150]);
    const y4 = useTransform(scrollY, [0, 1000], [0, -300]);
  
    return (
      <>
      <Block xpad="none" topMargin="none">
      <section ref={containerRef} className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden">
        {/* Background Elements */}
        <motion.div style={{ y: y1 }} className="absolute inset-0 grid-pattern z-0" />
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-white via-brand/35 to-indigo-100/40 animate-gradient" />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-white via-white/10 to-white/100" />
      
        <motion.div 
          style={{ y: y3 }}
          className="absolute top-1/4 -left-20 w-64 h-64 bg-brand/15 rounded-3xl blur-3xl z-0"
        />
        <motion.div 
          style={{ y: y4 }}
          className="absolute bottom-1/4 -right-20 w-128 h-128 bg-indigo-500/3 rounded-full blur-3xl z-0"
        />
        <motion.div 
          style={{ y: y2 }}
          className="absolute top-1/2 left-1/3 w-128 h-98 bg-brand/15 rounded-full blur-2xl z-0"
        />
        
        {/* Animated Grid Background (Evolved from original) - Removed dots as requested */}
        <motion.div 
          style={{ y: y2 }}
          className="absolute bottom-0 left-0 right-0 h-[60vh] z-0 opacity-10 pointer-events-none overflow-hidden"
        >
          {/* Just a subtle gradient overlay now */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand/5 to-transparent" />
        </motion.div>
  
        <div className=" mx-auto px-6 max-w-5xl text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand/10 border border-brand/20 !text-brand mb-4"
          >
            <TrendingUpIcon size={14} />
            <p className="section-title uppercase" style={{color: 'var(--color-brand)', fontSize: '1rem'}}>Lifetime Value With Our AI Agent</p>
          </motion.div>
  
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-4"
          >
            <h1 className="section-title lg:!text-[4.2rem]" style={{fontWeight: '600'}}>Autonomous AI agents that</h1>
            <div className="h-[5.2rem] relative overflow-hidden flex justify-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={index}
                  initial={{ y: 20, opacity: 0, filter: "blur(8px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: -20, opacity: 0, filter: "blur(8px)" }}
                  transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                  className="absolute whitespace-wrap"
                >
                  <h1 className="section-title lg:!text-[4.2rem]" style={{fontWeight: '600'}}>
                    <span className="highlight">{phrases[index]}</span>
                  </h1>
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.h1>
  
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:max-w-[90%] mx-auto mb-12 leading-relaxed"
          >
            <p className="section-description" style={{fontSize: '1.4rem'}}>
              Improve retention and LTV with real-time decisioning at scale. 
              <br />
              The next generation of martech is agentic.
            </p>
          </motion.p>
  
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button className="group relative px-8 py-4 bg-slate-900 text-white rounded-4xl font-semibold overflow-hidden transition-all hover:pr-12">
              <p className="section-description relative z-10 flex items-center gap-2" style={{color: 'white'}}>
                <SparklesIcon size={18} className="text-brand" />
                See how it works
              </p>
              <ArrowRightIcon className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all" size={20} />
            </button>
            
            <button className="flex items-center gap-2 px-8 py-4 text-slate-900 font-semibold hover:text-brand transition-colors">
              <p className="section-description relative z-10 flex items-center gap-2">
                Calculate your ROI
                <ChevronRightIcon size={20} />
              </p>
            </button>
          </motion.div>
  
          {/* Carousel Indicators (Static for now as requested) */}
          <div className="flex justify-center gap-2 mt-16">
            <div className="w-2 h-2 rounded-full bg-slate-200" />
            <div className="w-8 h-2 rounded-full bg-brand" />
            <div className="w-2 h-2 rounded-full bg-slate-200" />
          </div>
        </div>

       
      </section>
      </Block>
      <Block xpad="small">
      <div className="w-full py-8 flex flex-col items-center gap-6 overflow-hidden">
            <p className="section-eyebrow">
                {logoCloud.eyebrow}
            </p>

            <div className="w-full overflow-hidden mask-fade-x" style={{ '--fade': '20px', backgroundColor: '' }}
            >
                {LogoMarqueeRow(logoCloud.clients)}
            </div>
        </div>
        </Block>
      </>
    );
  };

import { hero, logoCloud } from '../../../constants/home';
import Block from "../../../components/layout/Block";

const renderLogoRow = (row) =>
  row.map((logo, index) => {
      return (
          <div
              key={`logo-${index}`}
              className="flex items-center lg:mx-14 mx-8"
          >
              <img src={logo} alt='' className="h-10 w-auto" />
          </div>
      );
});

const LogoMarqueeRow = (row) => (
  <div className="flex overflow-hidden">
      <div className="flex w-max items-center shrink-0 animate-marquee">
          {renderLogoRow(row)}
          {renderLogoRow(row)}
      </div>
  </div>
);

  
export default HeroTwo;