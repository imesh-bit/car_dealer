"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useMergedListings } from "@/hooks/useMergedListings";

const HeartIcon = ({ filled }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? "#e11d48" : "none"} stroke={filled ? "#e11d48" : "#334155"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61C19.32 3.09 16.93 3.09 15.41 4.61L12 8L8.59 4.61C7.07 3.09 4.68 3.09 3.16 4.61C1.64 6.13 1.64 8.52 3.16 10.04L12 18.9L20.84 10.04C22.36 8.52 22.36 6.13 20.84 4.61Z" />
  </svg>
);

const PinIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10C20 15.5 12 22 12 22C12 22 4 15.5 4 10C4 5.58 7.58 2 12 2C16.42 2 20 5.58 20 10Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

// badge shown on the photo — color communicates meaning (condition or status),
// not just decoration
const getBadge = (listing) => {
  if (listing.tags?.includes("new")) return { label: "New", bg: "#0F9B8E" };
  if (listing.tags?.includes("used")) return { label: "Used", bg: "#334155" };
  if (listing.featured) return { label: "Featured", bg: "#7C3AED" };
  return { label: "Special", bg: "#2563EB" };
};

const formatPrice = (price, currency = "¥") => {
  const n = Number(price);
  if (Number.isNaN(n)) return `${currency} ${price}`;
  return `${currency} ${n.toLocaleString()}`;
};

const styles = {
  card: {
    boxSizing: "border-box",
    display: "block",
    background: "#ffffff",
    borderRadius: 16,
    overflow: "hidden",
    boxShadow: "0 6px 20px rgba(10,35,87,0.08)",
    textDecoration: "none",
    height: "100%",
  },
  photoWrap: { position: "relative", width: "100%", aspectRatio: "4 / 3", background: "#eef1f6" },
  saveBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 32,
    height: 32,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.92)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    cursor: "pointer",
    zIndex: 2,
  },
  badge: {
    position: "absolute",
    left: 10,
    bottom: 10,
    color: "#fff",
    fontSize: 12,
    fontWeight: 600,
    padding: "4px 10px",
    borderRadius: 8,
    zIndex: 2,
  },
  body: { padding: "14px 14px 16px" },
  title: { margin: "0 0 4px", fontSize: 15, fontWeight: 700, color: "#0f172a" },
  specs: { margin: "0 0 8px", fontSize: 13, color: "#64748b" },
  location: { display: "flex", alignItems: "center", gap: 4, margin: "0 0 10px", fontSize: 12.5, color: "#94a3b8" },
  price: { margin: 0, fontSize: 16, fontWeight: 700, color: "#2563EB" },
  verified: { display: "flex", alignItems: "center", gap: 6, fontSize: 12.5, fontWeight: 600, color: "#16a34a", margin: "0 0 8px" },
  metaRow: { display: "flex", flexWrap: "wrap", gap: "6px 14px", fontSize: 12.5, color: "#64748b", margin: "0 0 4px", listStyle: "none", padding: 0 },
};

const FeaturedFilterListing = ({ category = "automobile" }) => {
  const [filter, setFilter] = useState("*");
  const [saved, setSaved] = useState({});
  const isAutomobileView = category === "automobile";
  const mergedListings = useMergedListings();
  const searchParams = useSearchParams();
  const featuredParam = searchParams?.get ? searchParams.get("featured") : null;

  const visibleListings = mergedListings.filter(
    (item) => (item.category || "automobile") === category
  );

  const onlyFeatured = featuredParam === "1" || featuredParam === "true";
  const listingsForDisplay = onlyFeatured
    ? visibleListings.filter((l) => l.featured)
    : visibleListings;

  const filteredItems =
    filter === "*"
      ? listingsForDisplay.slice(0, 8)
      : listingsForDisplay.filter((item) => item.tags.includes(filter)).slice(0, 8);

  const toggleSaved = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    setSaved((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="popular_listing_sliders">
      {isAutomobileView && (
        <div className="nav nav-tabs justify-content-center">
          <button className={filter === "*" ? "active nav-link" : "nav-link"} onClick={() => setFilter("*")}>
            All Status
          </button>
          <button className={filter === "new" ? "active nav-link" : "nav-link"} onClick={() => setFilter("new")}>
            New
          </button>
          <button className={filter === "used" ? "active nav-link" : "nav-link"} onClick={() => setFilter("used")}>
            Used
          </button>
        </div>
      )}

      <div className="row">
        {filteredItems.map((listing) => {
          const badge = getBadge(listing);
          const isSpecies = listing.category === "species";
          const isPart = listing.category === "auto-part";

          return (
            <div className="col-sm-6 col-xl-3" key={listing.id}>
              <Link href={`/listing-single-v1/${listing.id}`} style={styles.card}>
                <div style={styles.photoWrap}>
                  <button
                    type="button"
                    aria-label={saved[listing.id] ? "Remove from saved" : "Save listing"}
                    style={styles.saveBtn}
                    onClick={(e) => toggleSaved(e, listing.id)}
                  >
                    <HeartIcon filled={!!saved[listing.id]} />
                  </button>

                  <span style={{ ...styles.badge, background: isSpecies ? "#16a34a" : badge.bg }}>
                    {isSpecies ? "Verified" : badge.label}
                  </span>

                  <Image
                    fill
                    sizes="(max-width: 767px) 100vw, (max-width: 1200px) 50vw, 284px"
                    style={{ objectFit: "cover", objectPosition: "center" }}
                    src={listing.image}
                    alt={listing.title}
                  />
                </div>

                <div style={styles.body}>
                  <p style={styles.title}>{listing.title}</p>

                  {isSpecies ? (
                    <>
                      <p style={styles.verified}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 6L9 17L4 12" />
                        </svg>
                        Verified supplier
                      </p>
                      <ul style={styles.metaRow}>
                        <li>{listing.productCategory}</li>
                        <li>{listing.packagingType}</li>
                        <li>{listing.orderScale}</li>
                        <li>MOQ: {listing.minimumOrderQuantity || "N/A"}</li>
                      </ul>
                    </>
                  ) : isPart ? (
                    <>
                      <p style={styles.specs}>
                        {[listing.partCategory, listing.brand, listing.condition].filter(Boolean).join(" · ")}
                      </p>
                      {listing.location && (
                        <p style={styles.location}>
                          <PinIcon /> {listing.location}
                        </p>
                      )}
                      <p style={styles.price}>{formatPrice(listing.price, listing.currency)}</p>
                    </>
                  ) : (
                    <>
                      <p style={styles.specs}>
                        {[listing.year, listing.transmission, listing.fuelType].filter(Boolean).join(" · ")}
                      </p>
                      {listing.location && (
                        <p style={styles.location}>
                          <PinIcon /> {listing.location}
                        </p>
                      )}
                      <p style={styles.price}>{formatPrice(listing.price, listing.currency)}</p>
                    </>
                  )}
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FeaturedFilterListing;