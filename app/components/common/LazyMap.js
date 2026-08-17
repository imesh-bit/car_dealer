"use client";

import { useEffect, useRef, useState } from "react";

// OpenStreetMap embed for Fuji, Shizuoka location
// Address: 924-1 Tenma, Fuji, Shizuoka, Japan 419-0205
// Coordinates: 35.1065, 138.6759
const MAP_EMBED_URL =
  "https://www.openstreetmap.org/export/embed.html?bbox=138.4%2C34.9%2C138.9%2C35.4&layer=mapnik&marker=35.1065%2C138.6759";

const LazyMap = ({ title = "Dealer location map" }) => {
  const containerRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="h-100 w-100">
      {shouldLoad ? (
        <iframe
          src={MAP_EMBED_URL}
          title={title}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          style={{ border: 0, width: "100%", height: "100%" }}
        />
      ) : (
        <div
          aria-hidden="true"
          style={{ width: "100%", height: "100%", background: "#eef2f6" }}
        />
      )}
    </div>
  );
};

export default LazyMap;
