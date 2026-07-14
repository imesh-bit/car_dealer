"use client";
import React, { useState } from "react";
import menuItems from "@/data/menuItems";
import { isParentActive } from "@/utils/isMenuActive";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const CustomMenuItem = ({ item, path }) => {
    const [isOpen, setIsOpen] = useState(item.subMenu ? isParentActive(item.subMenu, path) : false);

    if (item.subMenu) {
        return (
            <li className={`nav-item custom-submenu ${isOpen ? "open" : ""}`}>
                <div
                    className={`nav-link d-flex justify-content-between align-items-center ${
                        isParentActive(item.subMenu, path) ? "active" : ""
                    }`}
                    onClick={() => setIsOpen(!isOpen)}
                    style={{ cursor: "pointer" }}
                >
                    <span>{item.label}</span>
                    <i className={`fas fa-angle-${isOpen ? "up" : "down"}`}></i>
                </div>
                {isOpen && (
                    <ul className="list-unstyled ps-3 sub-menu-list">
                        {item.subMenu.map((subItem, index) => (
                            <CustomMenuItem
                                key={index}
                                item={subItem}
                                path={path}
                            />
                        ))}
                    </ul>
                )}
            </li>
        );
    }

    return (
        <li className="nav-item">
            <Link
                href={item.path}
                className={`nav-link ${item.path === path ? "active" : ""}`}
            >
                {item.label}
            </Link>
        </li>
    );
};

const MobileMenu = () => {
    const path = usePathname();

    const socialLinks = [
        {
            name: "Facebook",
            icon: "fab fa-facebook-f",
            link: "#",
        },
        {
            name: "Twitter",
            icon: "fab fa-twitter",
            link: "#",
        },
        {
            name: "Instagram",
            icon: "fab fa-instagram",
            link: "#",
        },
        {
            name: "YouTube",
            icon: "fab fa-youtube",
            link: "#",
        },
        {
            name: "Pinterest",
            icon: "fab fa-pinterest",
            link: "#",
        },
    ];

    const contactInfo = [
        {
            icon: "flaticon-map",
            text: "47 Bakery Street, London, UK",
        },
        {
            icon: "flaticon-phone-call",
            text: "1-800-458-56987",
        },
        {
            icon: "flaticon-clock",
            text: "Mon - Fri 8:00 - 18:00",
        },
    ];

    return (
        <>
            <div className="stylehome1 h0">
                <div className="mobile-menu">
                    <div className="header stylehome1">
                        <div className="mobile_menu_bar">
                            <a
                                className="menubar"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#mobileMenu"
                                aria-controls="mobileMenu"
                            >
                                <small>Menu</small>
                                <span />
                            </a>
                        </div>
                        {/* End mobile_menu_bar */}

                        <div className="mobile_menu_main_logo">
                            <Image
                                width={140}
                                height={45}
                                priority
                                src="/images/header-logo2.svg"
                                alt="brand"
                            />
                        </div>
                        {/* End .mobile_menu_main_logo */}
                    </div>
                </div>
                {/* /.mobile-menu */}
            </div>
            {/* End mobile menu header */}

            {/* start mobile sidebar menu */}
            <div
                className="offcanvas offcanvas-end mobile_menu-canvas"
                tabIndex="-1"
                id="mobileMenu"
                aria-labelledby="mobileMenuLabel"
                data-bs-scroll="true"
            >
                <div className="offcanvas-body">
                    <div className="pro-header">
                        <Link href="/">
                            <Image
                                width={140}
                                height={45}
                                priority
                                src="/images/header-logo.svg"
                                alt="brand"
                            />
                        </Link>
                        <div
                            className="fix-icon"
                            data-bs-dismiss="offcanvas"
                            aria-label="Close"
                        >
                            <i className="fa-light fa-circle-xmark"></i>
                        </div>
                    </div>
                    {/* End pro-header */}

                    {/* mobile menu items start */}
                    <div className="custom-mobile-menu">
                        <ul className="list-unstyled">
                            {menuItems.map((item, index) => (
                                <CustomMenuItem
                                    key={index}
                                    item={item}
                                    path={path}
                                />
                            ))}
                        </ul>
                    </div>
                    {/* mobile menu items end */}

                    <div className="pro-footer mm-add-listing mt-5">
                        <div className="border-none">
                            <div className="mmenu-contact-info">
                                {contactInfo.map((info, index) => (
                                    <span className="phone-num" key={index}>
                                        <i className={info.icon} />{" "}
                                        <a href="#">{info.text}</a>
                                    </span>
                                ))}
                            </div>

                            <div className="social-links">
                                {socialLinks.map((link, index) => (
                                    <a href={link.link} key={index}>
                                        <span className={link.icon} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* End mm-add-listng */}
                </div>
                {/* End offcanvas-body */}
            </div>
            {/* End mobile sidebar menu */}
        </>
    );
};

export default MobileMenu;
