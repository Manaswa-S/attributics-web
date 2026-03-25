import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import Block from "../../../components/layout/Block";
import { StepIndicator2Style1 } from "./Indicators";
import ProblemCard from "./ProblemCard";
import { features } from "../../../constants/home";
import { typography } from "../../../constants/global";

const ActiveIndicator = StepIndicator2Style1;

// ─── Breakpoint hook ──────────────────────────────────────────────────────────
const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== "undefined" && window.innerWidth >= 1024
  );

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const handler = (e) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return isDesktop;
};

// ─── Mobile Layout ───────────────────────────────────────────────────────────
const MobileLayout = ({ problems }) => (
  <section className="py-12 sm:py-16">
    <div className="w-full">
      <div className="mb-8 sm:mb-12 px-1">
        <span className="block section-eyebrow mb-4 sm:mb-5">
          {features.eyebrow}
        </span>

        <h2 className="section-title" style={typography.title.XXL}>
          {features.headline}{" "}
          <span className="highlight">{features.highlighted}</span>
        </h2>

        <p className="mt-4 section-description" style={typography.desc.Normal}>
          {features.description}
        </p>
      </div>

      <div className="flex flex-col gap-5 sm:gap-7">
        {problems.map((item) => (
          <ProblemCard key={item.id} data={item} isActive />
        ))}
      </div>
    </div>
  </section>
);

// ─── Desktop Layout (Clean Sticky + Scroll) ──────────────────────────────────
const DesktopLayout = ({ problems }) => {
  const sectionRef = useRef(null);
  const N = problems.length;
  const [pinState, setPinState] = useState("start");

  // Total scroll distance = N screens.
  // This gives us 1 screen pinned + (N-1) screens to scroll the cards.
  const sectionHeight = `${N * 100}vh`;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Move the right column from 0 to -(N-1) * 100% across the scroll.
  const translateY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${(((N - 1) / N) * 100)}%`]
  );

  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      setActiveIndex(Math.round(v * (N - 1)));
    });
    return () => unsub();
  }, [scrollYProgress, N]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v <= 0) setPinState("start");
    else if (v >= 1) setPinState("end");
    else setPinState("pinned");
  });

  const pinStyle =
    pinState === "pinned"
      ? { position: "fixed", top: 0, left: 0, width: "100%", height: "100vh" }
      : pinState === "start"
        ? { position: "absolute", top: 0, left: 0, width: "100%", height: "100vh" }
        : { position: "absolute", bottom: 0, left: 0, width: "100%", height: "100vh" };

  return (
    <section ref={sectionRef} style={{ height: sectionHeight, position: "relative" }}>
      {/* Pinned viewport (JS fallback if sticky fails) */}
      <div style={pinStyle} className="px-3 sm:px-8 md:px-16 lg:px-50 xl:px-50">
        <div className="container mx-auto h-full">
          <div
            className="grid h-full"
            style={{
              gridTemplateColumns: "1fr 1fr",
              gap: "clamp(2rem, 4vw, 5rem)",
              alignItems: "center",
            }}
          >
            {/* LEFT: pinned content */}
            <div className="flex flex-col justify-center h-full">
              <span className="block section-eyebrow mb-5 lg:mb-7">
                {features.eyebrow}
              </span>

              <h2 className="section-title" style={typography.title.XXL}>
                {features.headline}
                <br />
                <span className="highlight">{features.highlighted}</span>
              </h2>

              <p className="mt-5 section-description" style={typography.desc.Normal}>
                {features.description}
              </p>

              <ActiveIndicator problems={problems} activeIndex={activeIndex} />
            </div>

            {/* RIGHT: scrolling cards inside a fixed viewport */}
            <div
              className="overflow-hidden h-full"
              style={{
                padding: "clamp(1rem, 2vw, 2.5rem)",
                maskImage:
                  "linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)",
              }}
            >
              <motion.div
                className="flex flex-col"
                style={{
                  translateY,
                  height: `${N * 100}vh`,
                }}
              >
                {problems.map((item, i) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-end"
                    style={{ height: `100vh` }}
                  >
                    <ProblemCard data={item} isActive={activeIndex === i} />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── Main Component ──────────────────────────────────────────────────────────
const Challenge = () => {
  const isDesktop = useIsDesktop();
  const problems = features.problems;

  return (
    <>
      {isDesktop ? (
        <DesktopLayout problems={problems} />
      ) : (
        <MobileLayout problems={problems} />
      )}
    </>
  );
};

export default Challenge;
