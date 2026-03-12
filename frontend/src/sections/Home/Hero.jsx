import { useState, useEffect, useRef } from "react";
import {typography} from '../../constants/global';
import {Sparkles, ArrowRight, TrendingUp} from "lucide-react";
import Button from "../../components/ui/Button";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { logoCloud } from '../../constants/home';
import Block from "../../components/layout/Block";

const renderLogoRow = (row) =>
  row.map((logo, index) => (
    <div key={`logo-${index}`} className="flex items-center lg:mx-14 mx-8">
      <img src={logo} alt='' className="h-10 w-auto" />
    </div>
  ));

const LogoMarqueeRow = (row) => (
  <div className="flex overflow-hidden">
    <div className="flex w-max items-center shrink-0 animate-marquee">
      {renderLogoRow(row)}
      {renderLogoRow(row)}
    </div>
  </div>
);

const Hero = () => {
  const [index, setIndex] = useState(0);
  const phrases = [
    "Predict Customer Behavior",
    "Automate Journeys",
    "Optimize Engagement"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const containerRef = useRef(null);
  const { scrollY } = useScroll();

  const y1 = useTransform(scrollY, [0, 1000], [0, -100]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -200]);
  const y3 = useTransform(scrollY, [0, 1000], [0, -150]);
  const y4 = useTransform(scrollY, [0, 1000], [0, -300]);

  return (
    <>
    <Block xpad="none" topMargin="none">
    <section ref={containerRef} className="relative min-h-screen flex flex-col items-center md:justify-center pt-[20vh] md:pt-2 overflow-hidden">

      {/* Static base layers */}
      <motion.div style={{ y: y1 }} className="absolute inset-0 grid-pattern z-0" />
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-white via-brand/35 to-indigo-100/40 animate-gradient" />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-white via-white/10 to-white/100" />

      {/* Glow 1 — top left, wide morph + strong drift */}
      <motion.div
        style={{ y: y3 }}
        className="absolute top-1/4 -left-20 w-90 h-90 bg-brand/35 blur-3xl z-0"
        animate={{
          x: [0, 90, 20, 110, 40, 0],
          y: [0, -60, -110, -40, -90, 0],
          scale: [1, 1.25, 0.85, 1.35, 0.95, 1],
          opacity: [0.2, 0.35, 0.15, 0.4, 0.18, 0.2],
          borderRadius: [
            "30% 70% 70% 30% / 30% 30% 70% 70%",
            "70% 30% 30% 70% / 70% 70% 30% 30%",
            "40% 60% 70% 30% / 60% 40% 60% 40%",
            "60% 40% 40% 60% / 30% 70% 30% 70%",
            "30% 70% 70% 30% / 30% 30% 70% 70%",
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      />

      {/* Glow 2 — bottom right, pulsing + drifting */}
      <motion.div
        style={{ y: y4 }}
        className="absolute bottom-1/4 -right-20 w-128 h-128 bg-indigo-400/12 blur-3xl z-0"
        animate={{
          x: [0, -100, -30, -120, -50, 0],
          y: [0, 80, 130, 50, 100, 0],
          scale: [1, 1.3, 0.8, 1.25, 0.9, 1],
          opacity: [0.1, 0.25, 0.08, 0.22, 0.12, 0.1],
          borderRadius: [
            "50%",
            "30% 70% 60% 40% / 50% 30% 70% 50%",
            "70% 30% 40% 60% / 30% 60% 40% 70%",
            "50%",
            "40% 60% 30% 70% / 60% 40% 60% 40%",
            "50%",
          ],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Glow 3 — center, largest, most fluid */}
      <motion.div
        style={{ y: y2 }}
        className="absolute top-1/2 left-1/3 w-128 h-98 bg-brand/25 blur-2xl z-0"
        animate={{
          x: [0, 120, 30, 150, 60, 20, 0],
          y: [0, -70, -140, -50, -110, -30, 0],
          scale: [1, 1.3, 0.8, 1.4, 0.88, 1.15, 1],
          opacity: [0.2, 0.38, 0.14, 0.35, 0.16, 0.28, 0.2],
          borderRadius: [
            "50%",
            "70% 30% 30% 70% / 60% 40% 60% 40%",
            "30% 70% 60% 40% / 40% 60% 40% 60%",
            "60% 40% 70% 30% / 30% 70% 50% 50%",
            "40% 60% 30% 70% / 70% 30% 70% 30%",
            "50%",
          ],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Glow 4 — top right, punchy ambient */}
      <motion.div
        className="absolute top-10 right-10 w-80 h-80 bg-indigo-400/12 blur-3xl z-0"
        animate={{
          x: [0, -70, 20, -100, 0],
          y: [0, 90, 40, 120, 0],
          scale: [1, 0.75, 1.3, 0.8, 1],
          opacity: [0.12, 0.28, 0.08, 0.24, 0.12],
          borderRadius: [
            "50%",
            "30% 70% 70% 30% / 30% 30% 70% 70%",
            "70% 30% 30% 70% / 70% 70% 30% 30%",
            "40% 60% 60% 40% / 60% 40% 40% 60%",
            "50%",
          ],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
          delay: 3,
        }}
      />

      {/* Glow 5 — bottom center, strong breathing */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-52 bg-brand/25 blur-3xl z-0"
        animate={{
          scaleX: [1, 1.6, 0.7, 1.5, 0.85, 1],
          scaleY: [1, 0.5, 1.5, 0.65, 1.3, 1],
          opacity: [0.15, 0.32, 0.08, 0.28, 0.1, 0.15],
          x: [0, 40, -30, 50, -20, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
          delay: 1.5,
        }}
      />

      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-0 left-0 right-0 h-[60vh] z-0 opacity-10 pointer-events-none overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-brand/5 to-transparent" />
      </motion.div>

      {/* Content */}
      <div className="mx-auto px-6 max-w-5xl text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand/10 border border-brand/20 !text-brand mb-4"
        >
          <TrendingUp size={18} />
          <p className="section-title uppercase" style={{color: 'var(--color-brand)', fontSize: '1rem'}}>Lifetime Value With Our AI Agent</p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-4 section-title" style={typography.title.XXL}
        >
          <h1>Autonomous AI Agents that</h1>
          <div className="h-[6.2rem] md:h-[5.2rem] relative overflow-hidden flex justify-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={index}
                initial={{ y: 20, opacity: 0, filter: "blur(8px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                exit={{ y: -20, opacity: 0, filter: "blur(8px)" }}
                transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                className="absolute whitespace-wrap"
              >
                <span className="highlight">{phrases[index]}</span>
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
          <p className="section-description" style={typography.desc.Normal}>
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
          <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
            <Button size="lg" className="group relative overflow-hidden transition-all hover:pr-12">
              <p className="section-description relative z-10 flex items-center gap-2" style={{color: 'white'}}>
                <Sparkles size={18} className="text-brand" />
                Run a Free Audit
              </p>
              <ArrowRight className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all" size={20} />
            </Button>
          </Link>
        </motion.div>
      </div>

    </section>
    </Block>

    <Block xpad="small">
      <div className="w-full py-8 flex flex-col items-center gap-6 overflow-hidden">
        <p className="section-eyebrow">{logoCloud.eyebrow}</p>
        <div className="w-full overflow-hidden mask-fade-x" style={{ '--fade': '20px' }}>
          {LogoMarqueeRow(logoCloud.clients)}
        </div>
      </div>
    </Block>
    </>
  );
};

export default Hero;