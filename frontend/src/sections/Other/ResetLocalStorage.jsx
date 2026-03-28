import { useEffect } from "react";

export default function ResetStorage({ clearAll = true }) {
  useEffect(() => {
    if (clearAll) {
      localStorage.clear();
      sessionStorage.clear();
    } else {
      const keys = [
        "caseStudyGate",
        // add more keys here as needed
      ];
      keys.forEach((k) => {
        localStorage.removeItem(k);
        sessionStorage.removeItem(k);
      });
    }

    window.history.back();
  }, [clearAll]);

  return null;
}