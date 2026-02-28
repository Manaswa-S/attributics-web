import { useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProblemCard from "./ProblemCard";
import { features } from "../../../constants/home";
import Block from "../../../components/layout/Block";
import { StepIndicator2Style1, StepIndicator2Style2, StepIndicator2Style3 } from "./Indicators";


gsap.registerPlugin(ScrollTrigger);

// ─── Main ─────────────────────────────────────────────────────────────────────
const ProblemSolution = () => {
  const sectionRef   = useRef(null);
  const panelWrapRef = useRef(null);   // the sliding strip
  const [activeIndex, setActiveIndex] = useState(null);
    
  const problems = features.problems;

  const N = problems.length;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1 slack screen before first card, (N-1) transitions, 1 slack screen after last card
      const SLACK = 0.3;
      const totalScreens = SLACK + (N - 1) + SLACK;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 0,
          start: "top top",
          end: () => `+=${window.innerHeight * totalScreens}`,
          onUpdate: (self) => {
            const slackFrac = SLACK / totalScreens;
            const inner = Math.max(0, Math.min(1,
              (self.progress - slackFrac) / (1 - 2 * slackFrac)
            ));
            setActiveIndex(Math.min(N - 1, Math.floor(inner * N)));
          },
        },
      });

      tl.clear();
      tl.set({}, {}, 0) // start spacer
        .to(panelWrapRef.current, {
          yPercent: -((N - 1) / N) * 100,
          ease: "none",
          duration: (N - 1) / totalScreens,
        }, SLACK / totalScreens)
        .set({}, {}, 1); // end spacer
    }, sectionRef);

    return () => ctx.revert();
  }, [N]);

  return (
    <Block xpad="large">
    <section
      ref={sectionRef}
      className="relative"
    >
      {/* The pinned viewport — exactly 100vh tall */}
      <div className="relative h-screen flex items-center">
        <div className="container w-full">
          <div className="flex flex-col items-center gap-12 lg:gap-22 grid grid-cols-1 lg:grid-cols-[8fr_8fr]">

            {/* ── LEFT: static ── */}
            <div className="lg:w-[100%] shrink-0">
              <span className="block section-eyebrow mb-7">
                The Challenge
              </span>
              <h2 className="section-title" style={{fontSize: '4.2rem', fontWeight: '600'}}>
                Closing The Gap{" "}
                <br className="hidden lg:block" />
                From{" "}
                <br className="hidden lg:block" />
                <span className="highlight">Insight To Action.</span>
              </h2>
              <p className="mt-5 section-description" style={{fontSize: '1.4rem'}}>
                Scroll to see how our autonomous agents solve the biggest bottlenecks in modern marketing.
              </p>

              {/* Vertical step indicators */}
              <StepIndicator2Style1 problems={problems} activeIndex={activeIndex} />

            </div>

            {/* ── RIGHT: sliding card strip ── */}
            <div
              className="w-full z-10 px-10 py-10"
              style={{
                height: "75vh",
                maskImage: "linear-gradient(to bottom, transparent 0%, black 18%, black 30%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 18%, black 80%, transparent 100%)",
                overflow: "hidden",
              }}
            >
              <div
                ref={panelWrapRef}
                className="flex flex-col"
                style={{ height: `${N * 100}%` }}
              >
                {problems.map((item, i) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-center"
                    style={{ height: `${100 / N}%` }}
                  >
                    <ProblemCard
                      data={item}
                      isActive={activeIndex === i}
                    />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
    </Block>
  );
};

export default ProblemSolution;