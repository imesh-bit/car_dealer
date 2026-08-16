"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useMergedListings } from "@/hooks/useMergedListings";

const ICONS8_STYLE = "ios";
const ICONS8_SIZE = 100;

const Icons8Icon = ({ iconName, alt, color, size = 22 }) => {
  const [failed, setFailed] = useState(false);
  const hex = color.replace("#", "");
  const src = `https://img.icons8.com/${ICONS8_STYLE}/${ICONS8_SIZE}/${hex}/${iconName}.png`;

  if (failed) {
    return (
      <div
        aria-hidden="true"
        style={{ width: size, height: size, borderRadius: "50%", border: `1.5px solid ${color}` }}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      loading="lazy"
      decoding="async"
      style={{ display: "block", width: size, height: size, objectFit: "contain" }}
      onError={() => setFailed(true)}
    />
  );
};

const categoryGroups = {
  automobile: [
    { icon8: "car--v1", title: "Cars", value: "Cars", queryKey: "type" },
    { icon8: "motorcycle", title: "Bikes", value: "Bikes", queryKey: "type" },
    { icon8: "truck--v1", title: "Trucks", value: "Trucks", queryKey: "type" },
    { icon8: "bulldozer", title: "Machinery", value: "Machinery", queryKey: "type" },
  ],
  "auto-part": [
    { icon8: "engine", title: "Engine", value: "Engine", queryKey: "partCategory" },
    { icon8: "cooling", title: "Cooling", value: "Cooling", queryKey: "partCategory" },
    { icon8: "electrical", title: "Electrical", value: "Electrical", queryKey: "partCategory" },
    { icon8: "brake-discs", title: "Brakes", value: "Brakes", queryKey: "partCategory" },
    { icon8: "suspension-dampers", title: "Suspension", value: "Suspension", queryKey: "partCategory" },
  ],
  species: [
    { icon8: "food-bar", title: "Processed Food Items", value: "Processed Food Items", queryKey: "productCategory" },
    { icon8: "vegan-food", title: "Dry Goods & Spices", value: "Dry Goods & Spices", queryKey: "productCategory" },
    { icon8: "sponge", title: "Household & Daily Essentials", value: "Household & Daily Essentials", queryKey: "productCategory" },
    { icon8: "ingredients", title: "Industrial Raw Materials", value: "Industrial Raw Materials", queryKey: "productCategory" },
  ],
};

const palette = [
  { bg: "#E6F0FF", accent: "#2B7FED" },
  { bg: "#E8FBF0", accent: "#23B48A" },
  { bg: "#EFEAFB", accent: "#7B47E6" },
  { bg: "#FDEFE4", accent: "#E08A2B" },
  { bg: "#FDE9EC", accent: "#D9436A" },
];

const MOBILE_BREAKPOINT = 768;
const AUTO_SLIDE_MS = 3200;
const RESUME_AFTER_INTERACTION_MS = 4000;

const styles = {
  root: { boxSizing: "border-box", width: "100%" },
  headerRow: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 },
  heading: { margin: 0, fontSize: 18, lineHeight: 1.3, fontWeight: 700, color: "#173B68", fontFamily: "Inter, sans-serif" },
  viewAll: (hovered) => ({
    display: "flex",
    alignItems: "center",
    gap: 4,
    fontSize: 14,
    fontWeight: 600,
    color: hovered ? "#1D4ED8" : "#2563EB",
    textDecoration: hovered ? "underline" : "none",
    flexShrink: 0,
    transition: "color 0.15s ease",
  }),
  scrollOuter: { position: "relative", width: "100%" },

  // desktop: unchanged 4-equal-column grid, no scrolling
  desktopRow: { display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 16, width: "100%", paddingBottom: 4 },

  // mobile: compact horizontal-scroll row, sized to match the reference screenshot
  mobileRow: {
    display: "flex",
    gap: 10,
    overflowX: "auto",
    overflowY: "hidden",
    WebkitOverflowScrolling: "touch",
    scrollSnapType: "x proximity",
    scrollBehavior: "smooth",
    scrollbarWidth: "none",
    paddingBottom: 4,
  },

  arrowBtn: (side, hovered) => ({
    position: "absolute",
    top: "50%",
    [side]: -8,
    transform: "translateY(-50%)",
    width: 30,
    height: 30,
    borderRadius: "50%",
    border: "1px solid #e5eaf1",
    background: hovered ? "#0f172a" : "#ffffff",
    color: hovered ? "#ffffff" : "#334155",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 12px rgba(10,35,87,0.12)",
    cursor: "pointer",
    zIndex: 3,
    transition: "background 0.15s ease, color 0.15s ease",
  }),

  fade: (side) => ({
    position: "absolute",
    [side]: 0,
    top: 0,
    bottom: 4,
    width: 24,
    pointerEvents: "none",
    background: side === "left" ? "linear-gradient(to right, #ffffff, rgba(255,255,255,0))" : "linear-gradient(to left, #ffffff, rgba(255,255,255,0))",
    zIndex: 2,
  }),

  card: (hovered, pressed, mobile) => ({
    boxSizing: "border-box",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    width: mobile ? 155 : "100%",
    minWidth: mobile ? 155 : 0,
    flexShrink: mobile ? 0 : undefined,
    minHeight: mobile ? 140 : 155,
    scrollSnapAlign: mobile ? "start" : undefined,
    overflow: "hidden",
    background: "#ffffff",
    border: hovered ? "1px solid #d5e0ef" : "1px solid #e8edf4",
    borderRadius: 16,
    padding: mobile ? 14 : 18,
    textDecoration: "none",
    cursor: "pointer",
    transform: pressed ? "scale(0.985)" : hovered ? "translateY(-3px)" : "translateY(0)",
    boxShadow: hovered ? "0 10px 28px rgba(10,35,87,0.10)" : "0 2px 8px rgba(10,35,87,0.04)",
    transition: "transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease",
  }),

  iconBadge: (hovered, mobile) => ({
    boxSizing: "border-box",
    width: mobile ? 40 : 48,
    height: mobile ? 40 : 48,
    flexShrink: 0,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: mobile ? 10 : 14,
    transform: hovered ? "scale(1.06)" : "scale(1)",
    transition: "transform 0.18s ease",
  }),

  title: (mobile) => ({
    boxSizing: "border-box",
    margin: "0 0 6px",
    fontWeight: 700,
    fontSize: mobile ? 14 : 15,
    lineHeight: 1.3,
    color: "#173B68",
    fontFamily: "Inter, sans-serif",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  }),

  foot: { boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, width: "100%", marginTop: "auto" },
  count: (mobile) => ({ boxSizing: "border-box", fontSize: mobile ? 12 : 13, fontWeight: 600, whiteSpace: "nowrap" }),
  chevron: (hovered, accent, mobile) => ({
    boxSizing: "border-box",
    width: mobile ? 24 : 28,
    height: mobile ? 24 : 28,
    flexShrink: 0,
    borderRadius: "50%",
    background: hovered ? accent : "#f4f6f9",
    color: hovered ? "#ffffff" : "#94a3b8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background 0.18s ease, color 0.18s ease",
  }),
};

// single source of truth for mobile vs desktop — replaces the earlier
// styled-jsx @media approach, which isn't confirmed to reliably apply in
// this project's build (same class of issue that dropped the card styling
// entirely a few fixes back)
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
};

const Category = ({ category = "automobile", title = "", viewAllHref }) => {
  const mergedListings = useMergedListings();
  const categories = categoryGroups[category] || categoryGroups.automobile;
  const isMobile = useIsMobile();

  const scrollRef = useRef(null);
  const resumeTimeoutRef = useRef(null);

  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [pressedCard, setPressedCard] = useState(null);
  const [hoveredArrow, setHoveredArrow] = useState(null);
  const [viewAllHovered, setViewAllHovered] = useState(false);

  const categoryCounts = categories.map((item) => ({
    ...item,
    listing: mergedListings.filter((listing) => {
      if (category === "automobile") {
        if ((listing.category || "automobile") !== "automobile") return false;
        return String(listing.bodyType || "").trim().toLowerCase() === item.value.toLowerCase();
      }
      if (category === "auto-part") {
        return String(listing.partCategory || "").toLowerCase() === item.value.toLowerCase();
      }
      if (category === "species") {
        return String(listing.productCategory || "").toLowerCase() === item.value.toLowerCase();
      }
      return false;
    }).length,
  }));

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e) => setReducedMotion(e.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  const updateEdgeFades = () => {
    if (!isMobile) {
      setCanScrollLeft(false);
      setCanScrollRight(false);
      return;
    }
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    updateEdgeFades();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile, categoryCounts.length]);

  const scrollByCard = (direction) => {
    if (!isMobile) return;
    const el = scrollRef.current;
    if (!el) return;
    const firstCard = el.firstElementChild;
    const step = firstCard ? firstCard.getBoundingClientRect().width + 10 : 165;
    el.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  const pauseThenResume = () => {
    setPaused(true);
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => setPaused(false), RESUME_AFTER_INTERACTION_MS);
  };

  // auto-slide — mobile only; desktop already shows every category at once
  // so automatic movement there would have nothing meaningful to do
  useEffect(() => {
    if (reducedMotion || !isMobile) return undefined;

    const interval = setInterval(() => {
      const el = scrollRef.current;
      if (!el || paused || document.hidden) return;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
      if (atEnd) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollByCard(1);
      }
    }, AUTO_SLIDE_MS);

    const onVisibility = () => {
      if (!document.hidden) updateEdgeFades();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisibility);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused, reducedMotion, isMobile]);

  useEffect(() => () => resumeTimeoutRef.current && clearTimeout(resumeTimeoutRef.current), []);

  const rowStyle = isMobile ? styles.mobileRow : styles.desktopRow;

  return (
    <div style={styles.root}>
      <div style={{ ...styles.headerRow, justifyContent: title ? "space-between" : "flex-end" }}>
        {title && <h3 style={styles.heading}>{title}</h3>}
        <Link
          href={viewAllHref || `/listing-v1?category=${encodeURIComponent(category)}`}
          style={styles.viewAll(viewAllHovered)}
          onMouseEnter={() => setViewAllHovered(true)}
          onMouseLeave={() => setViewAllHovered(false)}
        >
          View All
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>

      <div
        style={styles.scrollOuter}
        onMouseEnter={() => isMobile && setPaused(true)}
        onMouseLeave={() => isMobile && !resumeTimeoutRef.current && setPaused(false)}
        onFocus={() => isMobile && setPaused(true)}
        onBlur={() => isMobile && setPaused(false)}
      >
        <div
          ref={scrollRef}
          style={rowStyle}
          onScroll={isMobile ? updateEdgeFades : undefined}
          onTouchStart={isMobile ? pauseThenResume : undefined}
          role="list"
        >
          {categoryCounts.map((item, index) => {
            const href =
              item.queryKey === "type"
                ? `/listing-v1?type=${encodeURIComponent(item.value)}`
                : `/listing-v1?category=${encodeURIComponent(category)}&${item.queryKey}=${encodeURIComponent(item.value)}`;

            const { bg, accent } = palette[index % palette.length];
            const isHovered = hoveredCard === index;
            const isPressed = pressedCard === index;

            return (
              <Link
                key={`${item.title}-${index}`}
                href={href}
                role="listitem"
                aria-label={`${item.title}, ${item.listing} listings`}
                style={styles.card(isHovered, isPressed, isMobile)}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => {
                  setHoveredCard((cur) => (cur === index ? null : cur));
                  setPressedCard((cur) => (cur === index ? null : cur));
                }}
                onMouseDown={() => setPressedCard(index)}
                onMouseUp={() => setPressedCard((cur) => (cur === index ? null : cur))}
                onTouchStart={() => setPressedCard(index)}
                onTouchEnd={() => setPressedCard((cur) => (cur === index ? null : cur))}
              >
                <div style={{ ...styles.iconBadge(isHovered, isMobile), background: bg }}>
                  <Icons8Icon iconName={item.icon8} alt={item.title} color={accent} size={isMobile ? 20 : 24} />
                </div>

                <p style={styles.title(isMobile)}>{item.title}</p>

                <div style={styles.foot}>
                  <span style={{ ...styles.count(isMobile), color: accent }}>
                    {item.listing} {item.listing === 1 ? "Listing" : "Listings"}
                  </span>
                  <span style={styles.chevron(isHovered, accent, isMobile)} aria-hidden="true">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {isMobile && canScrollLeft && <div style={styles.fade("left")} aria-hidden="true" />}
        {isMobile && canScrollRight && <div style={styles.fade("right")} aria-hidden="true" />}

        {isMobile && canScrollLeft && (
          <button
            type="button"
            aria-label="Scroll categories left"
            style={styles.arrowBtn("left", hoveredArrow === "left")}
            onMouseEnter={() => setHoveredArrow("left")}
            onMouseLeave={() => setHoveredArrow((cur) => (cur === "left" ? null : cur))}
            onClick={() => {
              pauseThenResume();
              scrollByCard(-1);
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
        {isMobile && canScrollRight && (
          <button
            type="button"
            aria-label="Scroll categories right"
            style={styles.arrowBtn("right", hoveredArrow === "right")}
            onMouseEnter={() => setHoveredArrow("right")}
            onMouseLeave={() => setHoveredArrow((cur) => (cur === "right" ? null : cur))}
            onClick={() => {
              pauseThenResume();
              scrollByCard(1);
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default Category;