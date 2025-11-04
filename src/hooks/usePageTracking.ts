import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "@/components/Analytics";

export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view
    trackPageView(location.pathname + location.search);

    // Track time on page
    const startTime = Date.now();

    return () => {
      const timeOnPage = Date.now() - startTime;
      if (typeof window.gtag !== "undefined") {
        window.gtag("event", "timing_complete", {
          name: "time_on_page",
          value: timeOnPage,
          event_category: "engagement",
          event_label: location.pathname,
        });
      }
    };
  }, [location]);
};
