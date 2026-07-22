"use client";
import React, { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";
import { CarFront, ShieldCheck, Star, Users } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const Counter = () => {
  const { t } = useTranslation();

  const counters = [
    { number: 27600, labelKey: "home.carsForSale", delay: 100, icon: CarFront },
    { number: 6500, labelKey: "home.dealerReviews", delay: 200, icon: Star },
    { number: 8230, labelKey: "home.visitorsPerDay", delay: 300, icon: Users },
    { number: 5250, labelKey: "home.verifiedDealers", delay: 400, icon: ShieldCheck },
  ];

  return (
    <>
      {counters.map((counter, index) => (
        <div
          key={index}
          className="col-sm-6 col-lg-3 home1-counter-item"
          data-aos="fade-up"
          data-wow-delay={counter.delay}
          suppressHydrationWarning
        >
          <div className="funfact_one home1-counter-card">
            <div className="home1-counter-icon" aria-hidden="true">
              <counter.icon size={22} strokeWidth={2.2} />
            </div>
            <div className="details">
              <div className="timer">
                <CounterWithAnimation end={counter.number} />
              </div>
              <p className="para">{t(counter.labelKey)}</p>
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
