"use client";

import { useEffect, useState } from "react";

const JapanTimeDisplay = ({ compact = false }) => {
  const [japanTime, setJapanTime] = useState("--:--:--");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Tokyo",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });

      setJapanTime(formatter.format(now));
    };

    updateTime();
    const timer = window.setInterval(updateTime, 1000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <span suppressHydrationWarning className={compact ? "d-inline-block" : ""}>
      {compact ? `JST ${japanTime}` : `Japan Time: ${japanTime}`}
    </span>
  );
};

export default JapanTimeDisplay;
