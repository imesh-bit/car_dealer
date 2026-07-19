export function getMenuItems(t) {
  return [
    {
      label: t("nav.home"),
      path: "/",
    },
    {
      label: t("nav.pages"),
      subMenu: [
        {
          label: t("nav.aboutUs"),
          path: "/about-us",
        },
        {
          label: t("nav.loanCalculator"),
          path: "/loan-calculator",
        },
        {
          label: t("nav.contact"),
          path: "/contact",
        },
        {
          label: t("nav.faq"),
          path: "/faq",
        },
        {
          label: t("nav.service"),
          path: "/service",
        },
        {
          label: t("nav.termsConditions"),
          path: "/terms-conditions",
        },
      ],
    },
  ];
}
