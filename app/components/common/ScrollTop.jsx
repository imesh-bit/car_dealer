"use client";
import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Top: 0 takes us all the way back to the top of the page
  // Behavior: smooth keeps it smooth!
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    // Button is displayed after scrolling for 500 pixels
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <>
      {isVisible && (
        <>
          <div
            className="scrollToHome"
            style={{
              cursor: "pointer",
              position: "fixed",
              right: "1rem",
              bottom: "5rem",
              zIndex: 1200,
              width: "58px",
              height: "58px",
              borderRadius: "999px",
              background: "var(--primary-color)",
              color: "#ffffff",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.18)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.1rem",
            }}
            onClick={scrollToTop}
          >
            <i className="fas fa-arrow-up" aria-hidden="true" />
          </div>
        </>
      )}
    </>
  );
}
