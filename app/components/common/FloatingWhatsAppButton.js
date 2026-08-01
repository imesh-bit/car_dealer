const FloatingWhatsAppButton = () => {
  const whatsappNumber = "819063609950";
  const whatsappMessage = encodeURIComponent(
    "Hi RAIKO GROUP, I'd like to inquire about your listings."
  );

  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      style={{
        position: "fixed",
        right: "1rem",
        bottom: "calc(5.4rem + env(safe-area-inset-bottom))",
        zIndex: 1200,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "58px",
        height: "58px",
        borderRadius: "999px",
        background: "#25d366",
        color: "#ffffff",
        boxShadow: "0 10px 30px rgba(37, 211, 102, 0.35)",
        textDecoration: "none",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
    >
      <span
        className="fab fa-whatsapp"
        aria-hidden="true"
        style={{ fontSize: "1.8rem", lineHeight: 1 }}
      />
    </a>
  );
};

export default FloatingWhatsAppButton;
