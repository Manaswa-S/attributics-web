import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export default function CalCom() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "30min" });
      cal("ui", {
        theme: "light",
        cssVarsPerTheme: {
          light: { "cal-brand": "#FF5C35" },
          dark:  { "cal-brand": "#FF5C35" },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <div style={{ margin: "0 -16px", overflow: "hidden", height: "100%" }}>
      <Cal
        namespace="30min"
        calLink="manaswa-sangamnere-w9lwkm/30min"
        style={{ width: "100%", height: "100%", overflow: "scroll" }}
        config={{
          layout: "month_view",
          useSlotsViewOnMobileScreen: "true",
          theme: "light",
        }}
      />
    </div>
  );
}