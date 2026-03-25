import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export default function CalCom() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "free-audit"});
      cal("ui", {
        theme: "light",
        cssVarsPerTheme: {
          light: {"cal-brand": "#FF5C35"},
          dark: {"cal-brand": "#FF5C35"}},
        hideEventTypeDetails: false,
        layout: "month_view"
      });
    })();
  }, [])

  return (
      <Cal
        namespace="free-audit"
        calLink="consult-attributics/free-audit"
        style={{ width: "100%", height: "100%", overflow: "scroll" }}
        config={{
          layout: "month_view",
          useSlotsViewOnMobileScreen: true,
          theme: "light",
        }}
      />
  );
};