import { motion } from "motion/react";

// ─── StepIndicator2 — Style 1 ─────────────────────────────────────────────────
// A shared sliding background pill (layoutId) that glides between badges.
// The smoothest possible feel — one continuous pill moving, not each badge
// independently growing/shrinking.
export const StepIndicator2Style1 = ({ problems, activeIndex }) => (
  <div className="mt-10 flex items-center gap-1">
    {problems.map((p, i) => {
      const isActive = i === activeIndex;
      const isPast = i < activeIndex;

      return (
        <div key={i} className="flex items-center gap-1">
          <div className="relative">
            {/* Sliding background — same layoutId means ONE element moves across */}
            {isActive && (
              <motion.div
                layoutId="active-pill"
                className="absolute inset-0 rounded-full bg-[#FF5A36]/10 border border-[#FF5A36]/30"
                transition={{ type: "spring", stiffness: 350, damping: 35 }}
              />
            )}

            <div
              className={`relative flex items-center gap-2 rounded-full px-3.5 py-2 transition-none`}
            >
              {/* Number */}
              <motion.span
                animate={{
                  color: isActive ? "#FF5A36" : isPast ? "#FF5A36" : "#CBD5E1",
                  opacity: isPast ? 0.45 : 1,
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="text-[11px] font-bold leading-none tabular-nums"
              >
                {String(i + 1).padStart(2, "0")}
              </motion.span>

              {/* Label clips in/out via max-width */}
              <motion.span
                animate={{
                  maxWidth: isActive ? 120 : 0,
                  opacity: isActive ? 1 : 0,
                }}
                transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
                className="text-[11px] font-semibold text-[#FF5A36] whitespace-nowrap overflow-hidden leading-none"
                style={{ display: "block" }}
              >
                {p.problem}
              </motion.span>
            </div>
          </div>

          {/* Connector */}
          {i < problems.length - 1 && (
            <motion.div
              className="h-px w-4 rounded-full shrink-0"
              animate={{ backgroundColor: isPast ? "#FF5A36" : "#E2E8F0", opacity: isPast ? 0.5 : 1 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          )}
        </div>
      );
    })}
  </div>
);
