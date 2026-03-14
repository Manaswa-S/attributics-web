import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X, ArrowRight, ChevronDown } from "lucide-react";
import { typography } from "../../constants/global";
import { formEndpoints } from "../../constants/contact";

const API_URL = import.meta.env.VITE_API_URL;

// ─── Field components ─────────────────────────────────────────────────────────

const Field = ({ label, error, children }) => (
  <div>
    <label className="block text-xs font-bold tracking-widest uppercase text-slate-400 mb-2">
      {label}
    </label>
    {children}
    {error && <p className="text-red-400 text-xs mt-1.5">{error}</p>}
  </div>
);

const inputClass = (hasError) =>
  `w-full bg-slate-50 border rounded-xl px-5 py-3.5 text-slate-800 text-sm font-medium
   focus:outline-none focus:ring-2 focus:ring-[#FF5A36]/20 focus:border-[#FF5A36] transition-all
   ${hasError ? "border-red-300 bg-red-50" : "border-slate-200"}`;

// ─── Modal ────────────────────────────────────────────────────────────────────

const AuditModal = ({ isOpen, onClose }) => {
  const [form, setForm] = useState({ name: "", email: "", size: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email.";
    if (!form.size) e.size = "Please select a company size.";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setStatus("submitting");
    try {
      const res = await fetch(`${API_URL}/api/forms/${formEndpoints.freeAudit}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, companySize: form.size }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  const handleClose = () => {
    onClose();
    // Reset after exit animation finishes
    setTimeout(() => {
      setForm({ name: "", email: "", size: "" });
      setErrors({});
      setStatus("idle");
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">

          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
            className="absolute backdrop-blur-sm bg-slate-900/60 inset-0"
            style={{
            //   background: "radial-gradient(ellipse at center, rgba(53, 53, 77, 0.75) 0%, rgba(0,0,0,0.85) 100%)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-xl"
          >
            <div className="bg-white rounded-[2rem] shadow-[0_32px_80px_rgba(0,0,0,0.25)] overflow-hidden">

              {/* Top accent bar */}
              {/* <div className="h-1 w-full bg-gradient-to-r from-[#FF5A36] via-[#ff8a70] to-[#FF5A36]" /> */}

              <div className="p-8 md:p-12">

                {/* Header */}
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <p className="section-eyebrow !text-brand mb-1">
                      Free Consultation
                    </p>
                    <h3 className="section-title" style={typography.title.MD}>
                      Audit Your Stack
                    </h3>
                    <p className="section-description mt-2" style={typography.desc.Small}>
                        Leave your details below and our MarTech architects will reach out to schedule your comprehensive audit.
                    </p>
                  </div>
                  <button
                    onClick={handleClose}
                    className="ml-4 mt-1 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 transition-all shrink-0"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Success state */}
                {status === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="py-8 flex flex-col items-center text-center gap-4"
                  >
                    <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center">
                      <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-lg">You're on the list.</p>
                      <p className="text-slate-500 text-sm mt-1">We'll be in touch within 1 business day.</p>
                    </div>
                    <button
                      onClick={handleClose}
                      className="mt-2 text-xs font-bold text-slate-400 hover:text-slate-700 transition-colors underline underline-offset-4"
                    >
                      Close
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <Field label="Full Name" error={errors.name}>
                      <input
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Jane Smith"
                        className={inputClass(!!errors.name)}
                      />
                    </Field>

                    <Field label="Work Email" error={errors.email}>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="jane@company.com"
                        className={inputClass(!!errors.email)}
                      />
                    </Field>

                    <Field label="Company Size" error={errors.size}>
                      <div className="relative">
                        <select
                          name="size"
                          value={form.size}
                          onChange={handleChange}
                          className={`${inputClass(!!errors.size)} appearance-none cursor-pointer`}
                        >
                          <option value="" disabled>Select size...</option>
                          <option value="1-50">1–50 Employees</option>
                          <option value="51-200">51–200 Employees</option>
                          <option value="201-1000">201–1000 Employees</option>
                          <option value="1000+">1000+ Employees</option>
                        </select>
                        <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                      </div>
                    </Field>

                    {status === "error" && (
                      <p className="text-red-400 text-xs text-center">
                        Something went wrong. Please try again.
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="group mt-2 relative w-full bg-brand/95 hover:bg-brand/100 text-white py-4 rounded-xl font-bold text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed overflow-hidden"
                    >
                      {status === "submitting" ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                          Sending...
                        </span>
                      ) : (
                        <>
                          Request Audit
                          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                        </>
                      )}
                    </button>
                  </form>
                )}

              </div>
            </div>
          </motion.div>

        </div>
      )}
    </AnimatePresence>
  );
};

export default AuditModal;