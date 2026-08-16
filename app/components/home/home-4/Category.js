"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useMergedListings } from "@/hooks/useMergedListings";

// icons8 URL format: https://img.icons8.com/{style}/{size}/{hexColorNoHash}/{icon-name}.png
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

const styles = {
  root: { boxSizing: "border-box", width: "100%" },
  headerRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  heading: { margin: 0, fontSize: 13, fontWeight: 600, color: "#1A3760", fontFamily: "Inter, sans-serif", letterSpacing: 0 },
  viewAll: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    fontSize: 13.5,
    fontWeight: 600,
    color: "#2563EB",
    textDecoration: "none",
    flexShrink: 0,
  },
  // horizontally scrollable row — always fits any viewport: shows all 4
  // cards in view when there's room, and lets people swipe when there isn't,
  // instead of squeezing into a fixed grid that could wrap awkwardly
  scrollRow: {
    display: "flex",
    gap: 12,
    overflowX: "auto",
    overflowY: "hidden",
    WebkitOverflowScrolling: "touch",
    scrollSnapType: "x proximity",
    paddingBottom: 4,
    // hide scrollbar visually while staying scrollable
    scrollbarWidth: "none",
  },
  card: {
    boxSizing: "border-box",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    flex: "1 1 0",
    minWidth: 128,
    maxWidth: 168,
    scrollSnapAlign: "start",
    overflow: "visible",
    background: "#ffffff",
    border: "1px solid #eef1f6",
    borderRadius: 16,
    padding: 14,
    textDecoration: "none",
  },
  iconBadge: {
    boxSizing: "border-box",
    width: 44,
    height: 44,
    flexShrink: 0,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  title: {
    boxSizing: "border-box",
    margin: "0 0 4px",
    fontWeight: 600,
    fontSize: 13,
    lineHeight: 1.3,
    color: "#1A3760",
    fontFamily: "Inter, sans-serif",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  foot: {
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 6,
    width: "100%",
  },
  count: { boxSizing: "border-box", fontSize: 12.5, fontWeight: 600, whiteSpace: "nowrap" },
  chevron: {
    boxSizing: "border-box",
    width: 24,
    height: 24,
    flexShrink: 0,
    borderRadius: "50%",
    background: "#f2f4f8",
    color: "#94a3b8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

const Category = ({ category = "automobile", title = "Browse Categories", viewAllHref }) => {
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
      <div style={styles.headerRow}>
        <h3 style={styles.heading}>{title}</h3>
        <Link href={viewAllHref || `/listing-v1?category=${encodeURIComponent(category)}`} style={styles.viewAll}>
          View All
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>

      <div style={styles.scrollRow}>
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
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
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