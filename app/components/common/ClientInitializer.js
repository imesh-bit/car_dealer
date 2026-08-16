"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function ClientInitializer() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Authoritative "navigation finished" signal. next/navigation's router
  // (router.push/replace) does its own internal History API calls that
  // bypass the window.history monkey-patch below entirely — usePathname/
  // useSearchParams are the one thing guaranteed to update once any
  // client-side navigation actually completes, regardless of how it was
  // triggered (Link click, router.push from a form submit handler, etc).
  useEffect(() => {
    const preloader = document.getElementById("global-preloader");
    if (!preloader) return;
    preloader.style.opacity = "0";
    preloader.style.transition = "opacity 180ms ease-in-out";
    const hideTimeout = window.setTimeout(() => {
      preloader.style.display = "none";
    }, 180);
    return () => window.clearTimeout(hideTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams?.toString()]);

  useEffect(() => {
    let cancelled = false;
    let hideTimeout = null;
    let safetyTimeout = null;
    let originalPushState = null;
    let originalReplaceState = null;

    const preloader = document.getElementById("global-preloader");

    const showPreloader = () => {
      if (!preloader) return;
      if (hideTimeout) {
        window.clearTimeout(hideTimeout);
      }
      preloader.style.display = "block";
      preloader.style.opacity = "1";
      preloader.style.transition = "opacity 180ms ease-in-out";

      // Belt-and-suspenders: if nothing else ever hides it (a failed fetch
      // that never navigates, an unforeseen code path), don't leave the
      // whole page stuck behind the overlay forever.
      if (safetyTimeout) {
        window.clearTimeout(safetyTimeout);
      }
      safetyTimeout = window.setTimeout(hidePreloader, 8000);
    };

    const hidePreloader = () => {
      if (!preloader) return;
      if (safetyTimeout) {
        window.clearTimeout(safetyTimeout);
        safetyTimeout = null;
      }
      preloader.style.opacity = "0";
      preloader.style.transition = "opacity 180ms ease-in-out";
      if (hideTimeout) {
        window.clearTimeout(hideTimeout);
      }
      hideTimeout = window.setTimeout(() => {
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

    const isInternalAnchor = (anchor) => {
      if (!anchor) return false;
      const href = anchor.getAttribute("href");
      if (!href) return false;
      return (
        !href.startsWith("#") &&
        !href.startsWith("mailto:") &&
        !href.startsWith("tel:") &&
        anchor.target !== "_blank" &&
        !anchor.hasAttribute("download")
      );
    };

    const handleClick = (event) => {
      if (event.defaultPrevented) return;

      const anchor = event.target.closest("a[href]");
      if (anchor && isInternalAnchor(anchor)) {
        showPreloader();
      }
    };

    const handleSubmit = (event) => {
      if (event.defaultPrevented) return;
      showPreloader();
    };

    const handleRouteChange = () => {
      hidePreloader();
    };

    const setupHistoryListeners = () => {
      if (!window.history || !window.history.pushState) return;

      originalPushState = window.history.pushState;
      originalReplaceState = window.history.replaceState;

      window.history.pushState = function (...args) {
        const result = originalPushState.apply(this, args);
        window.dispatchEvent(new Event("routechange"));
        return result;
      };

      window.history.replaceState = function (...args) {
        const result = originalReplaceState.apply(this, args);
        window.dispatchEvent(new Event("routechange"));
        return result;
      };
    };

    hidePreloader();
    window.addEventListener("click", handleClick, true);
    window.addEventListener("submit", handleSubmit, true);
    window.addEventListener("beforeunload", showPreloader);
    window.addEventListener("load", hidePreloader);
    window.addEventListener("routechange", handleRouteChange);
    window.addEventListener("popstate", handleRouteChange);

    setupHistoryListeners();

    const scheduleEnhancements = () => {
      window.setTimeout(() => {
        initEnhancements();
      }, 150);
    };

    scheduleEnhancements();

    return () => {
      cancelled = true;
      if (hideTimeout) {
        window.clearTimeout(hideTimeout);
      }
      if (safetyTimeout) {
        window.clearTimeout(safetyTimeout);
      }
      window.removeEventListener("click", handleClick, true);
      window.removeEventListener("submit", handleSubmit, true);
      window.removeEventListener("beforeunload", showPreloader);
      window.removeEventListener("load", hidePreloader);
      window.removeEventListener("routechange", handleRouteChange);
      window.removeEventListener("popstate", handleRouteChange);

      if (originalPushState) {
        window.history.pushState = originalPushState;
      }
      if (originalReplaceState) {
        window.history.replaceState = originalReplaceState;
      }
    };
  }, []);

  return null;
}
