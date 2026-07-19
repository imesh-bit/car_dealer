"use client";

import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";

const ShowAllCarsLink = ({ href = "/page-list-v1", className = "more_listing" }) => {
  const { t } = useTranslation();

  return (
    <Link href={href} className={className}>
      {t("home.showAllCars")}{" "}
      <span className="icon">
        <span className="fas fa-plus" />
      </span>
    </Link>
  );
};

export default ShowAllCarsLink;
