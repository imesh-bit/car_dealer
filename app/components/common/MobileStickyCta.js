const MobileStickyCta = ({ car }) => {
  const priceNumber = Number(car.price);
  const usdApprox = priceNumber
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(priceNumber * 0.0068)
    : "—";

  return (
    <div
      role="contentinfo"
      aria-label="Quick inquiry bar"
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        zIndex: 1100,
        background: "#ffffff",
        borderTop: "1px solid rgba(148, 163, 184, 0.18)",
        boxShadow: "0 -12px 30px rgba(15, 23, 42, 0.12)",
        padding: "0.85rem 0.95rem calc(0.85rem + env(safe-area-inset-bottom))",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
        flexWrap: "wrap",
      }}
    >
      <div
        style={{
          display: "grid",
          gap: "0.2rem",
          minWidth: 0,
          flex: "1 1 1",
          maxWidth: "calc(100% - 150px)",
        }}
      >
        <span
          style={{
            fontSize: "0.7rem",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            color: "#64748b",
            fontWeight: 700,
          }}
        >
          JPY / FOB Japan
        </span>
        <strong
          style={{
            fontSize: "1.35rem",
            lineHeight: 1.05,
            color: "#0f172a",
            fontWeight: 800,
          }}
        >
          ¥{priceNumber.toLocaleString()}
        </strong>
        <span
          style={{
            fontSize: "0.78rem",
            color: "#64748b",
          }}
        >
          Approx. {usdApprox} USD
        </span>
      </div>

      <a
        href="#contact-seller"
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "3.6rem",
          minWidth: "145px",
          padding: "0 1.25rem",
          borderRadius: "999px",
          background: "#f59e0b",
          color: "#0f172a",
          fontSize: "0.95rem",
          fontWeight: 800,
          textDecoration: "none",
          textAlign: "center",
          whiteSpace: "nowrap",
          boxShadow: "0 12px 24px rgba(245, 158, 11, 0.18)",
          transition: "transform 0.18s ease, boxShadow 0.18s ease",
          width: "100%",
          maxWidth: "180px",
        }}
      >
        INQUIRE NOW
      </a>
    </div>
  );
};

export default MobileStickyCta;
