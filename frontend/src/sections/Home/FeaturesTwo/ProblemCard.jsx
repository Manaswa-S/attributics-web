import { useEffect, useRef } from "react";
import { LineChart } from "lucide-react";
import { animate, motion, useReducedMotion } from "motion/react";

// ─── Counter ──────────────────────────────────────────────────────────────────
// Re-runs every time `start` flips to true (card becomes active again).
// Cleanup cancels any in-progress animation before restarting.
const Counter = ({ from, to, prefix, suffix, start }) => {
  const nodeRef = useRef(null);

  useEffect(() => {
    if (!start) return;

    const node = nodeRef.current;
    if (!node) return;

    // Reset to zero so it always counts up from 0 on each activation
    node.textContent = `${prefix}${from}${suffix}`;

    const controls = animate(from, to, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate(value) {
        node.textContent = `${prefix}${Math.round(value)}${suffix}`;
      },
    });

    // No cleanup — let the animation always run to completion
    // even if the card is scrolled away mid-animation
  }, [start]); // fires every time start flips false → true

  return <span ref={nodeRef}>{prefix}{from}{suffix}</span>;
};

// ─── Shared animation variants ────────────────────────────────────────────────
const fadeUp = {
  hidden: (delay = 0) => ({
    opacity: 0,
    y: 16,
    transition: { duration: 0.3, ease: [0.4, 0, 1, 1], delay: 0 },
  }),
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

// ─── ProblemCard ──────────────────────────────────────────────────────────────
const ProblemCard = ({ data, isActive }) => {
  const reduceMotion = useReducedMotion();

  return (
    // Card shell — fades + lifts in when it becomes active
    <motion.div
      key={data.id} // re-triggers animation when card changes
      initial={reduceMotion ? false : { opacity: 0, y: 40, scale: 0.97 }}
      animate={isActive
        ? { opacity: 1, y: 0, scale: 1 }
        : { opacity: 0, y: -28, scale: 0.97 }
      }
      transition={isActive
        ? { duration: 0.6, ease: [0.22, 1, 0.36, 1] }          // snappy enter
        : { duration: 0.45, ease: [0.4, 0, 1, 1] }             // smooth exit upward
      }
      className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_15px_40px_rgb(0,0,0,0.1)] border border-white relative overflow-hidden"
    >
      {/* Top shimmer line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      {/* Heading */}
      <motion.h3
        className="section-title mb-6"
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
        variants={fadeUp}
        custom={0.08}
      >
        {data.problem}
      </motion.h3>

      {/* Body text */}
      <motion.p
        className="section-description mb-12"
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
        variants={fadeUp}
        custom={0.16}
      >
        {data.solution}
      </motion.p>

      {/* Metric box */}
      <motion.div
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#FF5A36]/10 to-transparent p-8 border border-[#FF5A36]/20"
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
        variants={fadeUp}
        custom={0.24}
      >
        <div className="absolute inset-0 bg-[#FF5A36]/5 blur-2xl" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6 justify-between">
          <div>
            <div className="text-5xl md:text-6xl font-display font-extrabold text-[#FF5A36] tracking-tighter mb-2">
              <Counter
                from={0}
                to={data.metricValue}
                prefix={data.metricPrefix}
                suffix={data.metricSuffix}
                start={isActive}
              />
            </div>

            <div className="section-description uppercase !text-brand">
              {data.metricLabel}
            </div>
          </div>

          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0">
            <LineChart className="w-8 h-8 text-[#FF5A36]" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProblemCard;