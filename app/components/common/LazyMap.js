"use client";

import { useEffect, useRef, useState } from "react";

const MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387194.0622843894!2d-74.30932844391303!3d40.69701928424492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sbd!4v1683361997895!5m2!1sen!2sbd";

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
