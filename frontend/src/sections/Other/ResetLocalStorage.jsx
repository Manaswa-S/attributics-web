import { useEffect } from "react";

export default function ResetLocalStorage({ clearAll = false }) {
  useEffect(() => {
    if (clearAll) {
      localStorage.clear();
    } else {
      const keys = [
        "caseStudyGate",
        // add more keys here as needed
      ];
      keys.forEach((k) => localStorage.removeItem(k));
    }

    // Go back one page immediately
    window.history.back();
  }, [clearAll]);

  return null; // no UI
}