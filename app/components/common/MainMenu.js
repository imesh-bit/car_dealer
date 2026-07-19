"use client";
import { getMenuItems } from "@/lib/i18n/getMenuItems";
import { isParentActive } from "@/utils/isMenuActive";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/hooks/useTranslation";

const MainMenu = () => {
    const path = usePathname();
    const { t } = useTranslation();
    const menuItems = getMenuItems(t);

    return (
        <>
            {menuItems.map((menuItem, index) => {
                if (!menuItem.subMenu) {
                    return (
                        <li className="dropitem" key={index}>
                            <Link
                                href={menuItem.path}
                                className={
                                    path === menuItem.path ? "active" : ""
                                }
                            >
                                <span className="title">{menuItem.label}</span>
                            </Link>
                        </li>
                    );
                }

                return (
                    <li className="dropitem" key={index}>
                        <a
                            className={
                                isParentActive(menuItem.subMenu, path)
                                    ? "active"
                                    : ""
                            }
                            href="#"
                        >
                            <span className="title">{menuItem.label}</span>
                            <span className="arrow"></span>
                        </a>
                        <ul className="sub-menu">
                            {menuItem.subMenu.map((subItem, subIndex) => (
                                <li key={subIndex} className="dropitem">
                                    {subItem.subMenu ? (
                                        <>
                                            <a
                                                className={
                                                    isParentActive(
                                                        subItem.subMenu,
                                                        path
                                                    )
                                                        ? "active"
                                                        : ""
                                                }
                                                href="#"
                                            >
                                                {subItem.label}
                                            </a>
                                            <span className="arrow"></span>
                                            <ul className="sub-menu">
                                                {subItem.subMenu.map(
                                                    (
                                                        nestedSubItem,
                                                        nestedSubIndex
                                                    ) => (
                                                        <li key={nestedSubIndex}>
                                                            <Link
                                                                className={
                                                                    path ===
                                                                    nestedSubItem.path
                                                                        ? "active"
                                                                        : ""
                                                                }
                                                                href={
                                                                    nestedSubItem.path
                                                                }
                                                            >
                                                                {
                                                                    nestedSubItem.label
                                                                }
                                                            </Link>
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </>
                                    ) : (
                                        <Link
                                            href={subItem.path}
                                            className={
                                                path === subItem.path
                                                    ? "active"
                                                    : ""
                                            }
                                        >
                                            {subItem.label}
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </li>
                );
            })}
        </>
    );
};

export default MainMenu;
