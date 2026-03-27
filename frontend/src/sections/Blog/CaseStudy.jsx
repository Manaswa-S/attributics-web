import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import Block from '../../components/layout/Block';
import { typography } from '../../constants/global';
import { Dot, ChevronRight, CircleChevronRight } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL;

// ── Shared: numbered section heading ──────────────────────────────────────────
function SectionHeading({ index, label, dark = false }) {
  return (
    <h2 className="section-title md:mb-10 mb-4 flex items-center gap-4" style={typography.title.BoldMD}>
      <span
        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm text-white ${
          dark ? 'bg-black' : 'bg-brand'
        }`}
      >
        {String(index).padStart(2, '0')}
      </span>
      {label}
    </h2>
  );
}

// ── Shared: bulleted point list ───────────────────────────────────────────────
// Each point: { subtitle?, description }
function PointList({ points }) {
  return (
    <ul className="flex flex-col gap-8 md:pl-6 pl-2 text-justify w-full">
      {points.map((point, i) => {
        const hasSubtitle = typeof point.subtitle === 'string' && point.subtitle.trim().length > 0;
        return (
          <li
            key={i}
            className={`flex ${hasSubtitle ? 'md:gap-8 gap-2' : ''} ${!hasSubtitle ? '-ml-2 md:-ml-6' : ''}`}
          >
            {hasSubtitle && (
            <ChevronRight size={18} className="text-brand shrink-0 mt-1" />
            )}

            <div className="flex-1">
              {hasSubtitle && (
                <p className="section-title mb-2" style={typography.title.SM}>{point.subtitle}</p>
              )}
              <p className="section-description w-full text-justify" style={typography.desc.Small}>
                {point.description}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function getSolutionBlocks(item) {
  if (Array.isArray(item?.blocks) && item.blocks.length > 0) {
    return item.blocks;
  }

  const blocks = [];
  const pushText = (text) => {
    if (typeof text === 'string' && text.trim()) {
      blocks.push({ type: 'text', text: text.trim() });
    }
  };
  const pushPoints = (points) => {
    if (!Array.isArray(points)) return;
    const cleaned = points
      .filter(point => typeof point === 'string' && point.trim())
      .map(point => point.trim());
    if (cleaned.length > 0) {
      blocks.push({ type: 'points', items: cleaned });
    }
  };

  const description = item?.description;
  if (Array.isArray(description)) {
    description.forEach(part => {
      if (Array.isArray(part)) {
        pushPoints(part);
      } else {
        pushText(part);
      }
    });
  } else {
    pushText(description);
  }

  if (Array.isArray(item?.points)) {
    pushPoints(item.points);
  }

  return blocks;
}

function SolutionList({ items }) {
  return (
    <div className="flex flex-col gap-8 md:pl-6 pl-2 text-justify w-full">
      {items.map((item, i) => {
        const hasSubtitle = typeof item.subtitle === 'string' && item.subtitle.trim().length > 0;
        const blocks = getSolutionBlocks(item);
        return (
          <div
            key={i}
            className={`flex ${hasSubtitle ? 'md:gap-8 gap-2' : ''} ${!hasSubtitle ? '-ml-2 md:-ml-6' : ''}`}
          >
            {hasSubtitle && (
              <ChevronRight size={18} className="text-brand shrink-0 mt-1" />
            )}

            <div className="flex-1">
              {hasSubtitle && (
                <p className="section-title mb-2" style={typography.title.SM}>{item.subtitle}</p>
              )}

              <div className="flex flex-col gap-4">
                {blocks.map((block, index) => {
                  if (block.type === 'points') {
                    return (
                      <ul key={index} className="flex flex-col gap-2">
                        {block.items.map((point, pIndex) => (
                          <li key={pIndex} className="section-description flex items-start gap-3" style={typography.desc.Small}>
                            <Dot size={24} className="text-brand shrink-0 ml-4"/>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    );
                  }

                  return (
                    <p key={index} className="section-description w-full text-justify" style={typography.desc.Small}>
                      {block.text}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function PointsFlowList({items}) {
  return(
    <div className="flex flex-col md:pl-6 pl-2 text-justify w-full">
      {items.map((step, index) => {
        const hasTitle = typeof step.title === 'string' && step.title.trim().length > 0;
        return (
          <div
            key={index}
            className={`flex ${hasTitle ? 'md:gap-8 gap-2' : ''} ${!hasTitle ? '-ml-2 md:-ml-6' : ''}`}
          >
            {hasTitle && (
              <div className="flex flex-col items-center shrink-0 w-6">
                <div className="w-2.5 h-2.5 rounded-full bg-brand shrink-0 mt-1.5" />
                {index !== items.length - 1 && (
                  <div className="w-[2px] flex-1 bg-brand mt-1" />
                )}
              </div>
            )}
            <div className={`${hasTitle && index !== items.length - 1 ? 'pb-8' : ''}`}>
              {hasTitle && (
                <>
                  <div className="text-brand font-mono text-md mb-1">{String(index + 1).padStart(2, '0')}</div>
                  <h3 className="section-title mb-2" style={typography.title.SM}>{step.title}</h3>
                </>
              )}
              <p className="section-description w-full text-justify" style={typography.desc.Small}>{step.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  )
}

// ── Image block ───────────────────────────────────────────────────────────────
function ImageBlock({ src, alt, aspect = 'auto', className = '' }) {
  return (
    <div className={`${className} mt-8 md:mt-12`}>
      <div className={`${aspect} w-full overflow-hidden rounded-2xl bg-zinc-100`}>
        <img
          src={src}
          alt={alt}
          className="w-full h-auto object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

export default function CaseStudyDetail({ slug, type }) {
  if (!type) {
    type = "caseStudies"
  }
  const [caseStudy, setCaseStudy] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    let isMounted = true;
    const fetchCaseStudy = async () => {
      try {
        const res = await fetch(`/content/built/${type}/slugs/${slug}.json`);
        if (res.ok) {
          const data = await res.json();
          if (isMounted) setCaseStudy(data);
          return;
        }
      } catch (err) {
        console.error(err);
      }
      if (isMounted) {
        setLoading(false);
      }
    };
    fetchCaseStudy();
    return () => { isMounted = false; };
  }, [slug]);

  useEffect(() => { if (caseStudy) setLoading(false); }, [caseStudy]);

  if (loading) return (
    <Block xpad="stories" topMargin="medium">
      <CaseStudyDetailSkeleton />
    </Block>
  );

  if (!caseStudy) {
    return (
      <div className="min-h-screen bg-white text-zinc-900 font-sans pb-24 flex items-center justify-center">
        <p className="text-sm text-zinc-500">Case study not found.</p>
      </div>
    );
  }

  // ── Derived helpers ──────────────────────────────────────────────────────
  const metaFields = [
    { label: 'Client',   value: caseStudy.client },
    { label: 'Role',     value: caseStudy.role },
    { label: 'Timeline', value: caseStudy.timeline },
    { label: 'Platform', value: caseStudy.platform },
    { label: 'Industry', value: caseStudy.industry }
  ].filter((f) => f.value);

  const images      = (caseStudy.images || []).filter(Boolean);
  const overview  = Array.isArray(caseStudy.overview)  && caseStudy.overview.length  > 0 ? caseStudy.overview  : null;
  const challenges  = Array.isArray(caseStudy.challenge)  && caseStudy.challenge.length  > 0 ? caseStudy.challenge  : null;
  const objectives  = Array.isArray(caseStudy.objectives) && caseStudy.objectives.length > 0 ? caseStudy.objectives : null;
  const solutions   = Array.isArray(caseStudy.solution)   && caseStudy.solution.length   > 0 ? caseStudy.solution   : null;
  const hasProcess  = Array.isArray(caseStudy.process)    && caseStudy.process.length    > 0;
  const hasResults  = Array.isArray(caseStudy.results)    && caseStudy.results.length    > 0;
  const techStack   = Array.isArray(caseStudy.techStack)  && caseStudy.techStack.length  > 0 ? caseStudy.techStack  : null;
  const conclusion  = Array.isArray(caseStudy.conclusion) && caseStudy.conclusion.length > 0 ? caseStudy.conclusion : null;

  // Running counter for section numbers
  let sectionIdx = 0;
  const nextIdx = () => ++sectionIdx;

  return (
    <Block xpad="stories" topMargin="medium">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="min-h-screen pb-0"
      >
        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <header className="px-2 md:px-12">
          <div className="w-full">
            {caseStudy.title && (
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="section-title"
                style={typography.title.BoldXXL}
              >
                {caseStudy.title}
              </motion.h1>
            )}
            {caseStudy.subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="section-description max-w-3xl mt-4 md:px-2"
                style={typography.desc.Normal}
              >
                {caseStudy.subtitle}
              </motion.p>
            )}
          </div>

          {metaFields.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-12 pt-4 border-t border-zinc-200"
            >
              {/* Mobile: horizontal scroll */}
              <div className="flex md:hidden overflow-x-auto gap-x-8 pb-2 scrollbar-hide snap-x snap-mandatory px-4 -mx-4">
                {metaFields.map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex-none snap-start text-center min-w-[160px]"
                  >
                    <div className="section-eyebrow mb-2">{label}</div>
                    <div className="section-description" style={typography.desc.SmallerBlack}>{value}</div>
                  </div>
                ))}
              </div>

              {/* Desktop: original flex wrap */}
              <div className="hidden md:flex flex-wrap justify-center gap-x-12 gap-y-8">
                {metaFields.map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex-1 min-w-[200px] text-center"
                  >
                    <div className="section-eyebrow mb-2">{label}</div>
                    <div className="section-description" style={typography.desc.SmallerBlack}>{value}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </header>

        {/* ── Hero image ────────────────────────────────────────────────────── */}
        <div className='mt-8 md:mt-22 px-2'>
          {caseStudy.heroImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className=""
            >
              <div className="aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden rounded-2xl bg-zinc-100">
                <img
                  src={caseStudy.heroImage}
                  alt={caseStudy.title || 'Case study hero'}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
        )}
        </div>

        {/* ── Body ──────────────────────────────────────────────────────────── */}
        <main className="md:mt-22 md:px-12 mt-8 px-2">

          {/* Overview */}
          {overview && (
            <div className="">
              <SectionHeading index={nextIdx()} label="Overview" />
              <div className="flex flex-col gap-6 w-full text-justify">
                {overview.map((para, index) => (
                  <p key={index} className="section-description" style={typography.desc.Small}>
                    {para}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Challenge */}
          {challenges && (
            <div className="md:mt-12 mt-8">
              <SectionHeading index={nextIdx()} label="The Challenge" />
              <PointList points={challenges} />
            </div>
          )}

          {/* Objectives */}
          {objectives && (
            <div className="md:mt-12 mt-8">
              <SectionHeading index={nextIdx()} label="Objectives" dark />
              <PointList points={objectives} />
            </div>
          )}

          {/* Solution */}
          {solutions && (
            <div className="md:mt-12 mt-8">
              <SectionHeading index={nextIdx()} label="The Solution" />
              <SolutionList items={solutions} />
            </div>
          )}

          {/* First extra image */}
          {images[0] && <ImageBlock src={images[0]} alt="Project detail" />}

          {/* Process */}
          {hasProcess && (
            <div className="mt-12">
              <SectionHeading index={nextIdx()} label="The Process" />
              <PointsFlowList items={caseStudy.process} />
            </div>
          )}

          {/* Second extra image */}
          {images[1] && <ImageBlock src={images[1]} alt="Project detail" />}

          {/* Any remaining images */}
          {images.slice(2).map((src, i) => (
            <ImageBlock className='mt-12' key={i} src={src} alt={`Project detail ${i + 3}`} />
          ))}

          {/* Impact metrics */}
          {hasResults && (
            (() => {
              const resultsAreStrings = Array.isArray(caseStudy.results)
                && caseStudy.results.length > 0
                && caseStudy.results.every((r) => typeof r === "string");

              if (resultsAreStrings) {
                return (
                  <div className="md:mt-12 mt-8">
                    <SectionHeading index={nextIdx()} label="The Impact" />
                    <div className="flex flex-col gap-6 w-full text-justify">
                      {caseStudy.results.map((result, index) => (
                        <p key={index} className="section-description" style={typography.desc.Small}>
                          {result}
                        </p>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <div className="bg-gray-100 rounded-3xl p-8 md:p-16 mt-12">
                  <h2 className="section-title mb-12 text-center" style={typography.title.BoldMD}>The Impact</h2>
                  <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                    {caseStudy.results.map((result, index) => (
                      <div
                        key={index}
                        className="text-center flex flex-col items-center"
                        style={{ width: "calc(33.333% - 2rem)", minWidth: "160px", maxWidth: "220px" }}
                      >
                        <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand mb-4 break-words w-full">
                          {result.value}
                        </div>
                        <div className="section-eyebrow" style={{ color: "black" }}>
                          {result.metric}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()
          )}

          {/* Tech Stack */}
          {techStack && (
            <div className="md:mt-12 mt-8 w-full">
              <SectionHeading index={nextIdx()} label="Tech Stack" />
              <div className="flex flex-col divide-y divide-zinc-100">
                {techStack.map((item, index) => {
                  const hasTitle = typeof item.title === 'string' && item.title.trim().length > 0;
                  return (
                    <div key={index} className="flex flex-col md:flex-row md:items-baseline md:gap-12 py-3">
                      {hasTitle ? (
                        <>
                          <span className="section-eyebrow md:w-50 md:shrink-0 mb-1 md:mb-0">
                            {item.title}
                          </span>
                          <span className="section-description" style={typography.desc.SmallerBlack}>
                            {item.description}
                          </span>
                        </>
                      ) : (
                        <p className="section-description" style={typography.desc.SmallerBlack}>
                          {item}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Conclusion */}
          {conclusion && (
            <div className="border-t border-zinc-200 pt-8 mt-12">
              <SectionHeading index={nextIdx()} label="Conclusion" />
              <div className="flex flex-col gap-6 w-full text-justify">
                {conclusion.map((para, index) => (
                  <p key={index} className="section-description" style={typography.desc.Small}>
                    {para}
                  </p>
                ))}
              </div>
            </div>
          )}

        </main>
      </motion.div>
    </Block>
  );
}


function CaseStudyDetailSkeleton() {
  return (
    <div className="min-h-screen pb-0 animate-pulse">

      {/* ── Hero ── */}
      <header className="px-12">
        {/* Title */}
        <div className="h-10 bg-zinc-200 rounded-xl w-3/4 mb-4" />
        <div className="h-10 bg-zinc-200 rounded-xl w-1/2 mb-4" />
        {/* Subtitle */}
        <div className="h-5 bg-zinc-100 rounded-lg w-full max-w-2xl mt-4" />
        <div className="h-5 bg-zinc-100 rounded-lg w-5/6 max-w-2xl mt-2" />

        {/* Meta fields */}
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 mt-12 pt-4 border-t border-zinc-200">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex-1 min-w-[200px] flex flex-col items-center gap-2">
              <div className="h-3 w-16 bg-zinc-200 rounded-full" />
              <div className="h-4 w-24 bg-zinc-100 rounded-full" />
            </div>
          ))}
        </div>
      </header>

      {/* ── Hero image ── */}
      <div className="mt-22">
        <div className="aspect-[16/9] md:aspect-[21/9] w-full rounded-2xl bg-zinc-100" />
      </div>

      {/* ── Body ── */}
      <main className="mt-22 px-12">

        {/* Section: Overview */}
        <SkeletonSection />
        <div className="flex flex-col gap-3 mt-6">
          <div className="h-4 bg-zinc-100 rounded-lg w-full" />
          <div className="h-4 bg-zinc-100 rounded-lg w-11/12" />
          <div className="h-4 bg-zinc-100 rounded-lg w-4/5" />
          <div className="h-4 bg-zinc-100 rounded-lg w-full mt-2" />
          <div className="h-4 bg-zinc-100 rounded-lg w-2/3" />
        </div>

        {/* Section: Challenge */}
        <div className="mt-12">
          <SkeletonSection />
          <SkeletonPointList rows={3} />
        </div>

        {/* Section: Solution */}
        <div className="mt-12">
          <SkeletonSection />
          <SkeletonPointList rows={2} />
        </div>

        {/* Extra image */}
        <div className="aspect-[16/9] w-full rounded-2xl bg-zinc-100 mt-12" />

        {/* Section: Process */}
        <div className="mt-12">
          <SkeletonSection />
          <SkeletonFlowList rows={4} />
        </div>

        {/* Impact metrics */}
        <div className="bg-zinc-100 rounded-3xl p-12 md:p-16 mt-12">
          <div className="h-7 bg-zinc-200 rounded-xl w-40 mx-auto mb-12" />
          <div className="grid grid-cols-3 gap-12">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-3">
                <div className="h-14 w-28 bg-zinc-200 rounded-xl" />
                <div className="h-3 w-20 bg-zinc-300 rounded-full" />
              </div>
            ))}
          </div>
        </div>

        {/* Tech stack */}
        <div className="mt-12">
          <SkeletonSection />
          <div className="flex flex-col divide-y divide-zinc-100">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-12 py-3">
                <div className="h-3 w-28 bg-zinc-200 rounded-full shrink-0" />
                <div className="h-3 bg-zinc-100 rounded-full flex-1" />
              </div>
            ))}
          </div>
        </div>

        {/* Conclusion */}
        <div className="border-t border-zinc-200 pt-8 mt-12">
          <SkeletonSection />
          <div className="flex flex-col gap-3 mt-6">
            <div className="h-4 bg-zinc-100 rounded-lg w-full" />
            <div className="h-4 bg-zinc-100 rounded-lg w-5/6" />
            <div className="h-4 bg-zinc-100 rounded-lg w-full" />
            <div className="h-4 bg-zinc-100 rounded-lg w-3/4" />
          </div>
        </div>

      </main>
    </div>
  );
}

// ── Skeleton sub-components ───────────────────────────────────────────────────

// Section heading row: numbered circle + label bar
function SkeletonSection() {
  return (
    <div className="flex items-center gap-4 mb-10">
      <div className="w-8 h-8 rounded-full bg-zinc-200 shrink-0" />
      <div className="h-5 bg-zinc-200 rounded-lg w-40" />
    </div>
  );
}

// Chevron + two lines per row (matches PointList)
function SkeletonPointList({ rows = 3 }) {
  return (
    <ul className="flex flex-col gap-8 pl-6">
      {Array.from({ length: rows }).map((_, i) => (
        <li key={i} className="flex gap-8">
          <div className="w-4 h-4 bg-zinc-200 rounded shrink-0 mt-1" />
          <div className="flex flex-col gap-2 flex-1">
            <div className="h-4 bg-zinc-200 rounded-lg w-1/3" />
            <div className="h-3 bg-zinc-100 rounded-lg w-full" />
            <div className="h-3 bg-zinc-100 rounded-lg w-4/5" />
          </div>
        </li>
      ))}
    </ul>
  );
}

// Dot + dashed line connector (matches PointsFlowList)
function SkeletonFlowList({ rows = 4 }) {
  return (
    <div className="flex flex-col pl-6">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-8">
          <div className="flex flex-col items-center shrink-0 w-6">
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-300 mt-1.5 shrink-0" />
            {i !== rows - 1 && <div className="w-[2px] flex-1 bg-zinc-200 mt-1" />}
          </div>
          <div className={`flex flex-col gap-2 flex-1 ${i !== rows - 1 ? 'pb-8' : ''}`}>
            <div className="h-3 w-6 bg-zinc-200 rounded-full" />
            <div className="h-4 bg-zinc-200 rounded-lg w-1/3" />
            <div className="h-3 bg-zinc-100 rounded-lg w-full" />
            <div className="h-3 bg-zinc-100 rounded-lg w-3/4" />
          </div>
        </div>
      ))}
    </div>
  );
}
