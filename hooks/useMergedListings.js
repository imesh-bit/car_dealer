"use client";
import { useEffect, useMemo, useState } from "react";

const REFRESH_EVENT = "voiture:listings-updated";

// Every screen mounts several components that each want the listings data
// (hero filter, category cards, featured/popular sliders, ...). Without a
// shared cache each one fired its own independent fetch to /api/listings
// (which itself hits Supabase live, no caching) — e.g. 4+ duplicate round
// trips for identical data on a single page load. This module-level store
// is shared by every useMergedListings() call so only one fetch happens per
// refresh, and every subscriber re-renders once it resolves.
let cachedListings = [];
let hasFetchedOnce = false;
let inFlightPromise = null;
const subscribers = new Set();

const notifySubscribers = () => {
  subscribers.forEach((callback) => callback(cachedListings));
};

const fetchListings = () => {
  if (inFlightPromise) return inFlightPromise;

  inFlightPromise = fetch("/api/listings", { cache: "no-store" })
    .then((response) => {
      if (!response.ok) throw new Error("Failed to load listings");
      return response.json();
    })
    .then((data) => {
      cachedListings = Array.isArray(data) ? data : [];
    })
    .catch((error) => {
      console.error("Failed to load uploaded listings", error);
      cachedListings = [];
    })
    .finally(() => {
      hasFetchedOnce = true;
      inFlightPromise = null;
      notifySubscribers();
    });

  return inFlightPromise;
};

export const useMergedListings = () => {
  const [listings, setListings] = useState(cachedListings);

  useEffect(() => {
    subscribers.add(setListings);

    if (hasFetchedOnce) {
      // Cache may have moved on since this component's initial render.
      setListings(cachedListings);
    } else {
      fetchListings();
    }

    const refresh = () => fetchListings();
    const handleVisibility = () => {
      if (document.visibilityState === "visible") refresh();
    };

    window.addEventListener(REFRESH_EVENT, refresh);
    window.addEventListener("focus", refresh);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      subscribers.delete(setListings);
      window.removeEventListener(REFRESH_EVENT, refresh);
      window.removeEventListener("focus", refresh);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return useMemo(() => [...listings], [listings]);
};
