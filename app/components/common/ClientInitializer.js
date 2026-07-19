"use client";

import { useEffect } from "react";

export default function ClientInitializer() {
  useEffect(() => {
    let cancelled = false;

    const initEnhancements = async () => {
      const hasAnimatedElements = document.querySelector("[data-aos]");
      const hasBootstrapComponents = document.querySelector(
        ".modal, .offcanvas, .dropdown, .collapse, [data-bs-toggle]"
      );

      const tasks = [];

      if (hasAnimatedElements) {
        tasks.push(
          import("aos").then(({ default: Aos }) => {
            import("aos/dist/aos.css");
            if (!cancelled) {
              Aos.init({ duration: 1200, once: true });
            }
          })
        );
      }

      if (hasBootstrapComponents) {
        tasks.push(import("bootstrap"));
      }

      await Promise.all(tasks);
    };

    const scheduleEnhancements = () => {
      window.setTimeout(() => {
        initEnhancements();
      }, 150);
    };

    scheduleEnhancements();

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
