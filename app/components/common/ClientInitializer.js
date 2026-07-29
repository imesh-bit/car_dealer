"use client";

import { useEffect } from "react";
import { useNavigation } from "next/navigation";

export default function ClientInitializer() {
  const navigation = useNavigation();

  useEffect(() => {
    let cancelled = false;

    const preloader = document.getElementById("global-preloader");

    const showPreloader = () => {
      if (!preloader) return;
      preloader.style.display = "block";
      preloader.style.opacity = "1";
      preloader.style.transition = "opacity 180ms ease-in-out";
    };

    const hidePreloader = () => {
      if (!preloader) return;
      preloader.style.opacity = "0";
      preloader.style.transition = "opacity 180ms ease-in-out";
      window.setTimeout(() => {
        if (preloader) preloader.style.display = "none";
      }, 180);
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

    const handleAnchorClick = (event) => {
      const anchor = event.target.closest("a[href]");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        anchor.target === "_blank" ||
        anchor.hasAttribute("download")
      ) {
        return;
      }

      showPreloader();
    };

    const handleFormSubmit = (event) => {
      if (!event.target.closest("form")) return;
      showPreloader();
    };

    const handleBeforeUnload = () => {
      showPreloader();
    };

    if (navigation.state !== "idle") {
      showPreloader();
    } else {
      hidePreloader();
    }

    window.addEventListener("click", handleAnchorClick, true);
    window.addEventListener("submit", handleFormSubmit, true);
    window.addEventListener("beforeunload", handleBeforeUnload);

    const scheduleEnhancements = () => {
      window.setTimeout(() => {
        initEnhancements();
      }, 150);
    };

    scheduleEnhancements();

    return () => {
      cancelled = true;
      window.removeEventListener("click", handleAnchorClick, true);
      window.removeEventListener("submit", handleFormSubmit, true);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [navigation.state]);

  return null;
}
