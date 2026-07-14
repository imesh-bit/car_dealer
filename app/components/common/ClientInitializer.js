"use client";

import Aos from "aos";
import { useEffect } from "react";
import "aos/dist/aos.css";

if (typeof window !== "undefined") {
  import("bootstrap");
}

export default function ClientInitializer() {
  useEffect(() => {
    Aos.init({
      duration: 1200,
    });
  }, []);

  return null;
}
