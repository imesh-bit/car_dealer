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

// counts up from 0 to the real value instead of just appearing — skipped
// entirely for reduced-motion users, who see the final number immediately
const AnimatedCount = ({ value, reducedMotion }) => {
  const [display, setDisplay] = useState(reducedMotion ? value : 0);

  useEffect(() => {
    if (reducedMotion) {
      setDisplay(value);
      return undefined;
    }
    let raf;
    const duration = 550;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      setDisplay(Math.round(value * progress));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => raf && cancelAnimationFrame(raf);
  }, [value, reducedMotion]);

  return display;
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

// Only enable trust-strip items that are literally true for your business —
// an icon implying a guarantee or certification you don't actually have
// does more damage than showing nothing. Customize freely via props.
const TRUST_ITEMS = [
  { icon: "lock", label: "Secure inquiries" },
  { icon: "check", label: "Verified listings" },
  { icon: "ship", label: "Ships from Japan" },
];

const TrustIcon = ({ name }) => {
  const common = { width: 13, height: 13, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };
  if (name === "lock") return <svg {...common}><rect x="4" y="10" width="16" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></svg>;
  if (name === "check") return <svg {...common}><path d="M20 6L9 17L4 12" /></svg>;
  if (name === "ship") return <svg {...common}><path d="M3 14L5 20H19L21 14" /><path d="M6 14V6H14L18 10V14" /></svg>;
  return null;
};

const MOBILE_BREAKPOINT = 768;
const AUTO_SLIDE_MS = 3200;
const RESUME_AFTER_INTERACTION_MS = 4000;
const ENTRANCE_STAGGER_MS = 55;

const styles = {
  root: { boxSizing: "border-box", width: "100%" },
  headerRow: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 },
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
  trustStrip: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "6px 16px",
    marginBottom: 16,
    fontSize: 12,
    color: "#64748b",
  },
  trustItem: { display: "flex", alignItems: "center", gap: 5 },
  scrollOuter: { position: "relative", width: "100%" },

  desktopRow: { display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 16, width: "100%", paddingBottom: 4 },

  mobileRow: {
    display: "flex",
    gap: 12,
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

  card: (hovered, pressed, mobile, entered, focused) => ({
    boxSizing: "border-box",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    width: mobile ? 168 : "100%",
    minWidth: mobile ? 168 : 0,
    flexShrink: mobile ? 0 : undefined,
    minHeight: mobile ? 172 : 155,
    scrollSnapAlign: mobile ? "start" : undefined,
    overflow: "hidden",
    background: "#ffffff",
    border: hovered ? "1px solid #d5e0ef" : "1px solid #e8edf4",
    borderRadius: 16,
    padding: mobile ? 16 : 18,
    textDecoration: "none",
    cursor: "pointer",
    opacity: entered ? 1 : 0,
    transform: !entered
      ? "translateY(10px)"
      : pressed
        ? "scale(0.985)"
        : hovered
          ? "translateY(-3px)"
          : "translateY(0)",
    boxShadow: focused
      ? "0 0 0 3px rgba(37,99,235,0.35), 0 10px 28px rgba(10,35,87,0.10)"
      : hovered
        ? "0 10px 28px rgba(10,35,87,0.10)"
        : "0 2px 8px rgba(10,35,87,0.04)",
    outline: "none",
    transition:
      "opacity 0.35s ease, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.18s ease, border-color 0.18s ease",
  }),

  cardContent: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    flexDirection: "column",
    flex: 1,
    width: "100%",
  },

  iconBadgeWrap: { position: "relative", marginBottom: 0, display: "inline-flex" },
  iconGlow: (hovered, bg) => ({
    position: "absolute",
    inset: -6,
    borderRadius: "50%",
    background: bg,
    opacity: hovered ? 0.55 : 0,
    transform: hovered ? "scale(1)" : "scale(0.6)",
    transition: "opacity 0.25s ease, transform 0.25s ease",
    pointerEvents: "none",
  }),
  iconBadge: (hovered, mobile) => ({
    boxSizing: "border-box",
    position: "relative",
    width: mobile ? 46 : 48,
    height: mobile ? 46 : 48,
    flexShrink: 0,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transform: hovered ? "scale(1.06)" : "scale(1)",
    transition: "transform 0.18s ease",
  }),
  iconBadgeOuter: (mobile) => ({ marginBottom: mobile ? 12 : 14 }),

  popularBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    display: "flex",
    alignItems: "center",
    gap: 3,
    background: "#FFF4E5",
    color: "#B45309",
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: 0.2,
    padding: "3px 7px",
    borderRadius: 999,
  },

  title: (mobile) => ({
    boxSizing: "border-box",
    margin: "0 0 6px",
    fontWeight: 700,
    fontSize: mobile ? 15.5 : 15,
    lineHeight: 1.3,
    color: "#173B68",
    fontFamily: "Inter, sans-serif",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  }),

  foot: { boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, width: "100%", marginTop: "auto" },
  count: (mobile) => ({ boxSizing: "border-box", fontSize: mobile ? 13 : 13, fontWeight: 600, whiteSpace: "nowrap" }),
  chevron: (hovered, accent, mobile) => ({
    boxSizing: "border-box",
    width: mobile ? 26 : 28,
    height: mobile ? 26 : 28,
    flexShrink: 0,
    borderRadius: "50%",
    background: hovered ? accent : "#f4f6f9",
    color: hovered ? "#ffffff" : "#94a3b8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background 0.18s ease, color 0.18s ease, transform 0.18s ease",
  }),
};

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

const Category = ({
  category = "automobile",
  title = "",
  viewAllHref,
  showTrustStrip = true,
  trustItems = TRUST_ITEMS,
}) => {
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
  const [focusedCard, setFocusedCard] = useState(null);
  const [hoveredArrow, setHoveredArrow] = useState(null);
  const [viewAllHovered, setViewAllHovered] = useState(false);
  const [enteredCards, setEnteredCards] = useState(() => new Set());
  const [justUpdated, setJustUpdated] = useState(false);
  const prevCategoryRef = useRef(category);

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

  // "Popular" is computed from real counts, not fabricated — only the
  // category(ies) genuinely tied for the highest listing count qualify,
  // and nothing is shown while everything is still at zero
  const maxCount = Math.max(0, ...categoryCounts.map((c) => c.listing));

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e) => setReducedMotion(e.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  // staggered entrance — skipped for reduced-motion users, who see
  // everything already in place
  useEffect(() => {
    if (reducedMotion) {
      setEnteredCards(new Set(categoryCounts.map((_, i) => i)));
      return undefined;
    }
    const timers = categoryCounts.map((_, i) =>
      setTimeout(() => {
        setEnteredCards((prev) => new Set(prev).add(i));
      }, i * ENTRANCE_STAGGER_MS)
    );
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion, category]);

  // briefly rings the grid when the category actually changes (not on first
  // mount) so it's obvious this section just updated to match the new tab
  useEffect(() => {
    if (prevCategoryRef.current === category) return undefined;
    prevCategoryRef.current = category;
    if (reducedMotion) return undefined;

    setJustUpdated(true);
    const timer = setTimeout(() => setJustUpdated(false), 900);
    return () => clearTimeout(timer);
  }, [category, reducedMotion]);

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
    const step = firstCard ? firstCard.getBoundingClientRect().width + 12 : 180;
    el.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  const pauseThenResume = () => {
    setPaused(true);
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => setPaused(false), RESUME_AFTER_INTERACTION_MS);
  };

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
      {title && (
        <div style={styles.headerRow}>
          <h3 style={styles.heading}>{title}</h3>
        </div>
      )}

      {showTrustStrip && trustItems?.length > 0 && (
        <div style={styles.trustStrip}>
          {trustItems.map((t) => (
            <span key={t.label} style={styles.trustItem}>
              <TrustIcon name={t.icon} /> {t.label}
            </span>
          ))}
        </div>
      )}

      <div
        className={justUpdated ? "category-grid-pulse" : undefined}
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
            const isFocused = focusedCard === index;
            const isEntered = enteredCards.has(index);
            const isPopular = maxCount > 0 && item.listing === maxCount;

            return (
              <Link
                key={`${item.title}-${index}`}
                href={href}
                role="listitem"
                className={`category-card${isPopular ? " category-card--popular" : ""}`}
                aria-label={`${item.title}, ${item.listing} listings${isPopular ? ", most listings in this group" : ""}`}
                style={styles.card(isHovered, isPressed, isMobile, isEntered, isFocused)}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => {
                  setHoveredCard((cur) => (cur === index ? null : cur));
                  setPressedCard((cur) => (cur === index ? null : cur));
                }}
                onMouseDown={() => setPressedCard(index)}
                onMouseUp={() => setPressedCard((cur) => (cur === index ? null : cur))}
                onTouchStart={() => setPressedCard(index)}
                onTouchEnd={() => setPressedCard((cur) => (cur === index ? null : cur))}
                onFocus={() => setFocusedCard(index)}
                onBlur={() => setFocusedCard((cur) => (cur === index ? null : cur))}
              >
                <div className="category-card__content" style={styles.cardContent}>
                  {isPopular && (
                    <span className="category-card__badge-pop" style={styles.popularBadge}>
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L14.5 9H21L15.5 13L17.5 20L12 16L6.5 20L8.5 13L3 9H9.5L12 2Z" /></svg>
                      Popular
                    </span>
                  )}

                  <div style={styles.iconBadgeOuter(isMobile)}>
                    <div style={styles.iconBadgeWrap}>
                      <div style={styles.iconGlow(isHovered, bg)} />
                      <div style={{ ...styles.iconBadge(isHovered, isMobile), background: bg }}>
                        <Icons8Icon iconName={item.icon8} alt={item.title} color={accent} size={isMobile ? 22 : 24} />
                      </div>
                    </div>
                  </div>

                  <p style={styles.title(isMobile)}>{item.title}</p>

                  <div style={styles.foot}>
                    <span style={{ ...styles.count(isMobile), color: accent }}>
                      <AnimatedCount value={item.listing} reducedMotion={reducedMotion} /> {item.listing === 1 ? "Listing" : "Listings"}
                    </span>
                    <span className="category-card__chevron" style={styles.chevron(isHovered, accent, isMobile)} aria-hidden="true">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                        <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
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

      <style jsx>{`
        @keyframes categoryGridPulse {
          0% {
            box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.28);
          }
          100% {
            box-shadow: 0 0 0 14px rgba(37, 99, 235, 0);
          }
        }
        :global(.category-grid-pulse) {
          border-radius: 18px;
          animation: categoryGridPulse 0.9s ease-out;
        }

        /* A light sweep that crosses the card on hover — cheap, common
           "premium" cue that draws the eye without any layout cost. */
        :global(.category-card::before) {
          content: "";
          position: absolute;
          inset: 0;
          left: -75%;
          width: 45%;
          background: linear-gradient(
            115deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.5) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          transform: skewX(-18deg);
          pointer-events: none;
          z-index: 0;
          transition: left 0.7s ease;
        }
        :global(.category-card:hover::before) {
          left: 130%;
        }

        /* Genuinely-earned attention: only the card(s) actually tied for
           the most listings get a soft radar-style ping ring, reinforcing
           that this one is worth a look. */
        @keyframes categoryPopularRing {
          0% {
            opacity: 0.55;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(1.055);
          }
        }
        :global(.category-card--popular::after) {
          content: "";
          position: absolute;
          inset: -2px;
          border-radius: 16px;
          border: 2px solid rgba(245, 158, 11, 0.5);
          pointer-events: none;
          z-index: 0;
          animation: categoryPopularRing 2.2s ease-out infinite;
        }

        :global(.category-card:hover .category-card__chevron) {
          transform: translateX(2px);
        }

        @media (prefers-reduced-motion: reduce) {
          :global(.category-card::before) {
            display: none;
          }
          :global(.category-card--popular::after) {
            animation: none;
            opacity: 0.45;
          }
        }
      `}</style>
    </div>
  );
};

export default Category;