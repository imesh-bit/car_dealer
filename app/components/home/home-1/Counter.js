"use client";
import React, { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";

const Counter = () => {
  const counters = [
    { number: 45, label: "Active Listings", delay: 100, icon: "📦" },
    { number: 12, label: "Verified Suppliers", delay: 200, icon: "✅" },
    { number: 18, label: "Countries Served", delay: 300, icon: "🌍" },
    { number: 320, label: "Successful Shipments", delay: 400, icon: "🚚" },
  ];

  return (
    <>
      {counters.map((counter, index) => (
        <div
          key={index}
          className="col-12 col-sm-6 col-lg-3 home1-counter-item"
          data-aos="fade-up"
          data-wow-delay={counter.delay}
          suppressHydrationWarning
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div
            className="funfact_one home1-counter-card"
            style={{
              width: "100%",
              maxWidth: "360px",
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <div className="home1-counter-icon" aria-hidden="true">
              <span>{counter.icon}</span>
            </div>
            <div className="details">
              <div className="timer">
                <CounterWithAnimation end={counter.number} />
              </div>
              <p className="para">{counter.label}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

const CounterWithAnimation = ({ end }) => {
  const countRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
      }
    }, options);

    const currentRef = countRef.current; // Create a local variable

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <span ref={countRef}>
      {inView ? <CountUp end={end} duration={2} separator="," /> : "0"}
    </span>
  );
};

export default Counter;
