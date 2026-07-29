"use client";

import { useEffect } from "react";

export default function ClientInitializer() {
  useEffect(() => {
    let cancelled = false;

    const hidePreloader = () => {
      const preloader = document.getElementById("global-preloader");
      if (preloader) {
        preloader.style.opacity = "0";
        preloader.style.transition = "opacity 180ms ease-in-out";
        window.setTimeout(() => {
          preloader.style.display = "none";
        }, 180);
      }
    };

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

    hidePreloader();

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
