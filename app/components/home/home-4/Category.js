"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useMergedListings } from "@/hooks/useMergedListings";

// icons8 URL format: https://img.icons8.com/{style}/{size}/{hexColorNoHash}/{icon-name}.png
// "ios" is a thin outline style that reads well at small sizes; color is set
// per category below instead of the old hardcoded FFFFFF (which was invisible
// on the light pastel circles).
const ICONS8_STYLE = "ios";
const ICONS8_SIZE = 100;

const Icons8Icon = ({ iconName, alt, color, size = 28 }) => {
  const [failed, setFailed] = useState(false);
  const hex = color.replace("#", "");
  const src = `https://img.icons8.com/${ICONS8_STYLE}/${ICONS8_SIZE}/${hex}/${iconName}.png`;

  if (failed) {
    // graceful fallback if the CDN request is blocked (CSP, ad-blocker, offline)
    // instead of leaving a blank, confusing gap in the circle
    return (
      <div
        aria-hidden="true"
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          border: `1.5px solid ${color}`,
        }}
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

// pastel background + matching solid accent, paired so the icon/count are
// always readable against their own circle
const palette = [
  { bg: "#E6F0FF", accent: "#2B7FED" },
  { bg: "#E8FBF0", accent: "#23B48A" },
  { bg: "#EFEAFB", accent: "#7B47E6" },
  { bg: "#FDEFE4", accent: "#E08A2B" },
  { bg: "#FDE9EC", accent: "#D9436A" },
];

// every value below is applied inline — nothing here depends on styled-jsx,
// CSS Modules, or a global stylesheet loading in a particular order
const styles = {
  root: { boxSizing: "border-box" },
  subtitle: { margin: "0 0 16px", fontSize: 14, color: "#94a3b8" },
  grid: {
    boxSizing: "border-box",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 16,
    width: "100%",
  },
  card: {
    boxSizing: "border-box",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    overflow: "visible",
    background: "#ffffff",
    borderRadius: 20,
    padding: 20,
    boxShadow: "0 6px 20px rgba(10,35,87,0.06)",
    textDecoration: "none",
  },
  iconBadge: {
    boxSizing: "border-box",
    width: 56,
    height: 56,
    flexShrink: 0,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  title: {
    boxSizing: "border-box",
    margin: "0 0 6px",
    fontWeight: 500,
    fontSize: 13,
    lineHeight: 1.3,
    color: "#1A3760",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontFamily: '"Inter", sans-serif',
  },
  foot: {
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    width: "100%",
  },
  count: { boxSizing: "border-box", fontSize: 14, fontWeight: 500 },
  chevron: {
    boxSizing: "border-box",
    width: 32,
    height: 32,
    flexShrink: 0,
    borderRadius: "50%",
    background: "#f2f4f8",
    color: "#94a3b8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

const Category = ({ category = "automobile", subtitle }) => {
  const mergedListings = useMergedListings();
  const categories = categoryGroups[category] || categoryGroups.automobile;

  const categoryCounts = categories.map((item) => ({
    ...item,
    listing: mergedListings.filter((listing) => {
      if (category === "automobile") {
        if ((listing.category || "automobile") !== "automobile") return false;
        return String(listing.bodyType || "").trim().toLowerCase() === item.value.toLowerCase();
      }
      if (category === "auto-part") {
        return (listing.partCategory || "").toLowerCase() === item.value.toLowerCase();
      }
      if (category === "species") {
        return (listing.productCategory || "").toLowerCase() === item.value.toLowerCase();
      }
      return false;
    }).length,
  }));

  return (
    <div style={styles.root}>
      {subtitle && <p style={styles.subtitle}>{subtitle}</p>}

      <div style={styles.grid}>
        {categoryCounts.map((item, index) => {
          const href =
            item.queryKey === "type"
              ? `/listing-v1?type=${encodeURIComponent(item.value)}`
              : `/listing-v1?category=${encodeURIComponent(category)}&${item.queryKey}=${encodeURIComponent(item.value)}`;

          const { bg, accent } = palette[index % palette.length];

          return (
            <Link
              key={`${item.title}-${index}`}
              href={href}
              aria-label={`${item.title}, ${item.listing} listings`}
              style={styles.card}
            >
              <div style={{ ...styles.iconBadge, background: bg }}>
                <Icons8Icon iconName={item.icon8} alt={item.title} color={accent} />
              </div>

              <p style={styles.title}>{item.title}</p>

              <div style={styles.foot}>
                <span style={{ ...styles.count, color: accent }}>
                  {item.listing} {item.listing === 1 ? "Listing" : "Listings"}
                </span>
                <span style={styles.chevron} aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Category;