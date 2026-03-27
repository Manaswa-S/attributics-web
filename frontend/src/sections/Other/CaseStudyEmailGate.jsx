import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { typography } from "../../constants/global";
import { motion, AnimatePresence } from "motion/react";

const VITE_WORKER_CASESTUDY_EMAILGATE_URL = import.meta.env.VITE_WORKER_CASESTUDY_EMAILGATE_URL;

const STORAGE_KEY = "caseStudyGate";
const SNOOZE_COUNT = 9;

function getStoredData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function setStoredData(patch) {
  const existing = getStoredData() || {};
  const updated = { ...existing, ...patch };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

export default function CaseStudyEmailGate({
  resourceName = "Case Study",
  onSuccess,
  forceOpen = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (forceOpen) {
      const t = setTimeout(() => setIsOpen(true), 600);
      return () => clearTimeout(t);
    }

    const data = getStoredData();

    if (data?.emailSubmitted) {
      onSuccess?.(data.email ?? "");
      return;
    }

    if (data?.snoozeCount != null && data.snoozeCount > 0) {
      const newCount = data.snoozeCount - 1;
      setStoredData({ snoozeCount: newCount, lastSeen: new Date().toISOString() });
      return;
    }

    const t = setTimeout(() => {
      setIsOpen(true);
      setStoredData({ popupSeen: true, lastSeen: new Date().toISOString() });
    }, 600);
    return () => clearTimeout(t);
  }, [forceOpen]);

  const handleXClose = () => setIsOpen(false);

  const handleMaybeLater = () => {
    setIsOpen(false);
    setStoredData({ snoozeCount: SNOOZE_COUNT, snoozedAt: new Date().toISOString() });
  };

  const handleSubmit = async () => {
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("That doesn't look like a valid email.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(VITE_WORKER_CASESTUDY_EMAILGATE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), resource: resourceName }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.message || "Server error");
      }

      setStoredData({
        email: email.trim(),
        emailSubmitted: true,
        submittedAt: new Date().toISOString(),
        snoozeCount: 0,
      });

      setIsOpen(false);
      onSuccess?.(email.trim());
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="gate-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
          onClick={(e) => e.target === e.currentTarget && handleXClose()}
        >
          <motion.div
            key="gate-modal"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-white rounded-2xl shadow-xl w-full max-w-3xl p-8"
          >
            <button
              onClick={handleXClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close"
            >
              <X size={24} className="text-grey shrink-0" />
            </button>

            <span className="inline-block py-1 px-3 rounded-full section-eyebrow bg-brand/15 !text-brand">
              {resourceName}
            </span>

            <h2 className="section-title mt-2" style={typography.title.MD}>
              Join In for Practical Wisdom
            </h2>

            <p className="section-description mt-2 px-1" style={typography.desc.Small}>
              We share case studies, useful ideas, and clear explanations - everything
              you need to understand how things really work.
            </p>

            <input
              type="email"
              placeholder="you@company.com"
              value={email}
              autoFocus
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              className={`mt-6 w-full section-description px-4 py-3 rounded-xl border outline-none transition-all
                ${error
                  ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200"
                  : "border-brand bg-gray-50 focus:border-brand/40 focus:bg-white focus:ring-2 focus:ring-brand/40"
                }`}
            />

            <AnimatePresence>
              {error && (
                <motion.p
                  key="gate-error"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="section-description !text-red-500 mt-4"
                  style={typography.desc.Small}
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            <button
              onClick={handleSubmit}
              disabled={loading}
              style={typography.desc.SmallerBlack}
              className="section-description !text-white w-full mt-6 bg-brand hover:bg-brand/70 disabled:opacity-60 disabled:cursor-not-allowed text-white py-3 rounded-xl transition-colors"
            >
              {loading ? "Sending…" : "Get Access"}
            </button>

            <button
              onClick={handleMaybeLater}
              style={typography.desc.Smaller}
              className="w-full mt-2 section-description !text-gray-400 hover:!text-gray-600 py-2 transition-colors"
            >
              Maybe Later
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}