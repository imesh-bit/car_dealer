"use client";

import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";

const Navigation = () => {
  const { t } = useTranslation();

  const links = [
    { label: t("nav.home"), path: "/" },
    { label: t("nav.aboutUs"), path: "/about-us" },
    { label: t("nav.listings"), path: "/listing-v1" },
    { label: t("nav.blog"), path: "/blog" },
    { label: t("nav.user"), path: "/user-profile" },
    { label: t("nav.service"), path: "/service" },
  ];

  return (
    <>
      {links.map((link, index) => (
        <li className="list-inline-item" key={index}>
          <Link href={link.path}>{link.label}</Link>
        </li>
      ))}
    </>
  );
};

export default Navigation;
