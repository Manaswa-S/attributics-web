import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { caseStudies as localCaseStudies } from '../../constants/resources';
import Block from '../../components/layout/Block';

const API_URL = import.meta.env.VITE_API_URL;

export default function CaseStudyDetail({ slug }) {
  const navigate = useNavigate();
  const [caseStudy, setCaseStudy] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let isMounted = true;
    const fetchCaseStudy = async () => {
      try {
        const res = await fetch(`${API_URL}/api/case-studies/${slug}`);
        if (res.ok) {
          const data = await res.json();
          if (isMounted) setCaseStudy(data);
          return;
        }
      } catch (err) {
        console.error(err);
      }

      const fallback = localCaseStudies.find(
        (study) => study.id === slug || study.slug === slug
      );
      if (isMounted) setCaseStudy(fallback || null);
      setLoading(false);
    };

    fetchCaseStudy();
    return () => {
      isMounted = false;
    };
  }, [slug]);

  useEffect(() => {
    if (caseStudy) setLoading(false);
  }, [caseStudy]);

  const onBack = () => navigate('/resources');

  if (loading) {
    return (
      <div className="min-h-screen bg-white text-zinc-900 font-sans pb-24" />
    );
  }

  if (!caseStudy) {
    return (
      <div className="min-h-screen bg-white text-zinc-900 font-sans pb-24 flex items-center justify-center">
        <p className="text-sm text-zinc-500">Case study not found.</p>
      </div>
    );
  }

  return (
    <Block xpad='large' topMargin='medium'>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen bg-white text-zinc-900 font-sans pb-0"
    >
      {/* Hero Section */}
      <header className="pt-0 pb-20 px-6 max-w-6xl mx-auto">
        <div className="max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-8"
          >
            {caseStudy.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl md:text-2xl text-zinc-500 leading-relaxed max-w-3xl"
          >
            {caseStudy.subtitle}
          </motion.p>
        </div>

        {/* Meta Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-10 border-t border-zinc-200"
        >
          <div>
            <div className="text-xs font-bold tracking-widest uppercase text-zinc-400 mb-2">Client</div>
            <div className="font-medium">{caseStudy.client}</div>
          </div>
          <div>
            <div className="text-xs font-bold tracking-widest uppercase text-zinc-400 mb-2">Role</div>
            <div className="font-medium">{caseStudy.role}</div>
          </div>
          <div>
            <div className="text-xs font-bold tracking-widest uppercase text-zinc-400 mb-2">Timeline</div>
            <div className="font-medium">{caseStudy.timeline}</div>
          </div>
          <div>
            <div className="text-xs font-bold tracking-widest uppercase text-zinc-400 mb-2">Platform</div>
            <div className="font-medium">{caseStudy.platform}</div>
          </div>
        </motion.div>
      </header>

      {/* Hero Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="max-w-7xl mx-auto px-6 mb-32"
      >
        <div className="aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden rounded-2xl bg-zinc-100">
          <img
            src={caseStudy.heroImage}
            alt={caseStudy.title}
            className="w-full h-auto object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </motion.div>

      {/* Content Sections */}
      <main className="max-w-6xl mx-auto px-6">
        {/* Challenge & Solution */}
        <div className="grid md:grid-cols-12 gap-16 mb-32">
          <div className="md:col-span-5">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-4">
              <span className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center text-sm">01</span>
              The Challenge
            </h2>
            <p className="text-lg text-zinc-600 leading-relaxed">
              {caseStudy.challenge}
            </p>
          </div>
          <div className="md:col-span-1 hidden md:block"></div>
          <div className="md:col-span-6">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-4">
              <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm">02</span>
              The Solution
            </h2>
            <p className="text-lg text-zinc-600 leading-relaxed">
              {caseStudy.solution}
            </p>
          </div>
        </div>

        {/* Full Width Image */}
        {caseStudy.images[0] && (
          <div className="mb-32">
            <div className="aspect-[16/9] w-full overflow-hidden rounded-2xl bg-zinc-100">
              <img
                src={caseStudy.images[0]}
                alt="Project detail"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        )}

        {/* Process */}
        <div className="mb-32">
          <h2 className="text-3xl font-bold mb-12">The Process</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {caseStudy.process.map((step, index) => (
              <div key={index} className="relative">
                <div className="text-orange-500 font-mono text-sm mb-4">0{index + 1}</div>
                <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                <p className="text-zinc-600 leading-relaxed">{step.description}</p>
                {/* Decorative line */}
                {index !== caseStudy.process.length - 1 && (
                  <div className="hidden md:block absolute top-2 left-8 w-full h-[1px] bg-zinc-200 -z-10"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Secondary Image */}
        {caseStudy.images[1] && (
          <div className="mb-32">
            <div className="aspect-[4/3] md:aspect-[16/9] w-full overflow-hidden rounded-2xl bg-zinc-100">
              <img
                src={caseStudy.images[1]}
                alt="Project detail"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        )}

        {/* Results */}
        <div className="bg-zinc-50 rounded-3xl p-12 md:p-20 mb-0">
          <h2 className="text-3xl font-bold mb-12 text-center">The Impact</h2>
          <div className="grid md:grid-cols-3 gap-12 text-center">
            {caseStudy.results.map((result, index) => (
              <div key={index}>
                <div className="text-5xl md:text-6xl font-bold text-orange-500 mb-4">
                  {result.value}
                </div>
                <div className="text-zinc-600 font-medium uppercase tracking-wider text-sm">
                  {result.metric}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next Project CTA */}
        {/* <div className="text-center border-t border-zinc-200 pt-32">
          <p className="text-sm font-bold tracking-widest uppercase text-zinc-400 mb-6">Next Project</p>
          <button
            onClick={onBack}
            className="group inline-flex items-center gap-4 text-4xl md:text-6xl font-bold hover:text-orange-500 transition-colors"
          >
            View More Work
            <ArrowUpRight className="w-10 h-10 md:w-12 md:h-12 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
          </button>
        </div> */}
      </main>
    </motion.div>
    </Block>
  );
}
