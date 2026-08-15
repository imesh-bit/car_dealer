"use client";
import React from "react";
import Link from "next/link";
import { useMergedListings } from "@/hooks/useMergedListings";

const CategoryIcon = ({ name, color }) => {
  const common = { width: 26, height: 26, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (name) {
    case "car":
      return (
        <svg {...common}>
          <path d="M4 16V11L6 6H18L20 11V16" />
          <path d="M4 16H20V18C20 18.55 19.55 19 19 19H17C16.45 19 16 18.55 16 18V16" />
          <path d="M8 16V18C8 18.55 7.55 19 7 19H5C4.45 19 4 18.55 4 18V16" />
          <circle cx="7.5" cy="16" r="1.4" fill={color} stroke="none" />
          <circle cx="16.5" cy="16" r="1.4" fill={color} stroke="none" />
        </svg>
      );
    case "bike":
      return (
        <svg {...common}>
          <circle cx="6" cy="17" r="3" />
          <circle cx="18" cy="17" r="3" />
          <path d="M9 17L12 10L15 13H18" />
          <path d="M6 17L9 11H12" />
        </svg>
      );
    case "truck":
      return (
        <svg {...common}>
          <path d="M2 8H14V16H2V8Z" />
          <path d="M14 11H18L21 14V16H14V11Z" />
          <circle cx="6" cy="18" r="2" />
          <circle cx="17" cy="18" r="2" />
        </svg>
      );
    case "machinery":
      return (
        <svg {...common}>
          <rect x="3" y="10" width="7" height="6" />
          <path d="M10 10H14L17 14V16H10V10Z" />
          <circle cx="6.5" cy="18" r="1.6" />
          <circle cx="14.5" cy="18" r="1.6" />
        </svg>
      );
    case "engine":
      return (
        <svg {...common}>
          <rect x="3" y="9" width="12" height="8" />
          <path d="M15 12H19V17H15" />
          <path d="M6 9V6H9V9" />
        </svg>
      );
    case "cooling":
      return (
        <svg {...common}>
          <path d="M12 2V22M4.5 6L19.5 18M19.5 6L4.5 18" />
        </svg>
      );
    case "electrical":
      return (
        <svg {...common}>
          <path d="M13 2L4 14H12L11 22L20 10H12L13 2Z" />
        </svg>
      );
    case "brakes":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case "suspension":
      return (
        <svg {...common}>
          <path d="M8 3V8M8 8L11 10M8 8L5 10" />
          <path d="M16 21V16M16 16L19 14M16 16L13 14" />
          <path d="M8 12H16" />
        </svg>
      );
    case "processedFood":
      return (
        <svg {...common}>
          <rect x="5" y="6" width="14" height="14" rx="2" />
          <path d="M9 6V4H15V6" />
        </svg>
      );
    case "dryGoods":
      return (
        <svg {...common}>
          <path d="M6 9L12 4L18 9V20H6V9Z" />
          <path d="M9 20V14H15V20" />
        </svg>
      );
    case "household":
      return (
        <svg {...common}>
          <rect x="4" y="9" width="16" height="10" rx="1.5" />
          <path d="M4 9L8 4H16L20 9" />
        </svg>
      );
    case "rawMaterials":
      return (
        <svg {...common}>
          <path d="M4 18L9 6H15L20 18Z" />
          <path d="M8 18L10.5 10L13.5 10L16 18" />
        </svg>
      );
    default:
      return null;
  }
};

const categoryGroups = {
  automobile: [
    { icon: "car", title: "Cars", value: "Cars", queryKey: "type" },
    { icon: "bike", title: "Bikes", value: "Bikes", queryKey: "type" },
    { icon: "truck", title: "Trucks", value: "Trucks", queryKey: "type" },
    { icon: "machinery", title: "Machinery", value: "Machinery", queryKey: "type" },
  ],
  "auto-part": [
    { icon: "engine", title: "Engine", value: "Engine", queryKey: "partCategory" },
    { icon: "cooling", title: "Cooling", value: "Cooling", queryKey: "partCategory" },
    { icon: "electrical", title: "Electrical", value: "Electrical", queryKey: "partCategory" },
    { icon: "brakes", title: "Brakes", value: "Brakes", queryKey: "partCategory" },
    { icon: "suspension", title: "Suspension", value: "Suspension", queryKey: "partCategory" },
  ],
  species: [
    { icon: "processedFood", title: "Processed Food Items", value: "Processed Food Items", queryKey: "productCategory" },
    { icon: "dryGoods", title: "Dry Goods & Spices", value: "Dry Goods & Spices", queryKey: "productCategory" },
    { icon: "household", title: "Household & Daily Essentials", value: "Household & Daily Essentials", queryKey: "productCategory" },
    { icon: "rawMaterials", title: "Industrial Raw Materials", value: "Industrial Raw Materials", queryKey: "productCategory" },
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
// CSS Modules, or a global stylesheet loading in a particular order, so it
// renders identically no matter what the rest of the build pipeline does
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
    fontWeight: 700,
    fontSize: 18,
    lineHeight: 1.3,
    color: "#0f172a",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
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
                <CategoryIcon name={item.icon} color={accent} />
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