"use client";
import { useCallback, useEffect, useMemo, useState } from "react";

const REFRESH_EVENT = "voiture:listings-updated";

export const useMergedListings = () => {
  const [uploadedListings, setUploadedListings] = useState([]);

  const loadListings = useCallback(async () => {
    try {
      const response = await fetch("/api/listings", { cache: "no-store" });
      if (!response.ok) {
        throw new Error("Failed to load listings");
      }

      const data = await response.json();
      setUploadedListings(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load uploaded listings", error);
      setUploadedListings([]);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const refresh = () => {
      if (isMounted) loadListings();
    };

    refresh();

    const handleVisibility = () => {
      if (document.visibilityState === "visible") refresh();
    };

    window.addEventListener(REFRESH_EVENT, refresh);
    window.addEventListener("focus", refresh);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      isMounted = false;
      window.removeEventListener(REFRESH_EVENT, refresh);
      window.removeEventListener("focus", refresh);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [loadListings]);

  return useMemo(() => [...uploadedListings], [uploadedListings]);
};