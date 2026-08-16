"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import rates from "@/data/orderInquiryRates.json";

const areSettingsEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

/* ---------- small inline icons ---------- */
const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" /><path d="M12 7V12L15 14" />
  </svg>
);
const LockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="10" width="16" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" />
  </svg>
);
const CheckIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6L9 17L4 12" />
  </svg>
);
const AlertIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" /><path d="M12 8V13" /><circle cx="12" cy="16.5" r="0.75" fill="currentColor" stroke="none" />
  </svg>
);

/* ---------- validation ---------- */
const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
const isValidPhone = (v) => v.replace(/\D/g, "").length >= 7;

const STEPS = [
  { key: "shipping", label: "Shipping" },
  { key: "contact", label: "Your Info" },
  { key: "review", label: "Review" },
];

const SUBMIT_LOCK_MS = 2500;

// Prices in orderInquiryRates.json and baseFobPrice are assumed to be JPY —
// everything else is a display-only estimate. These rates are static and
// will drift; swap for a live FX source before relying on them beyond a
// rough preview.
const CURRENCIES = {
  JPY: { symbol: "¥", label: "Japanese Yen (JPY)", rate: 1, decimals: 0 },
  USD: { symbol: "$", label: "US Dollar (USD)", rate: 0.0067, decimals: 2 },
  EUR: { symbol: "€", label: "Euro (EUR)", rate: 0.0062, decimals: 2 },
  GBP: { symbol: "£", label: "British Pound (GBP)", rate: 0.0053, decimals: 2 },
  LKR: { symbol: "Rs.", label: "Sri Lankan Rupee (LKR)", rate: 2.05, decimals: 0 },
  INR: { symbol: "₹", label: "Indian Rupee (INR)", rate: 0.56, decimals: 0 },
};
const DEFAULT_CURRENCY = "JPY";
const DEFAULT_SETTINGS = {
  defaultCurrency: DEFAULT_CURRENCY,
  currencies: CURRENCIES,
  portRates: rates,
};

// how wide the widget's own container needs to be before pairing fields
// side by side. Based on the container's real measured width, not the
// browser viewport — a col-md-6 style breakpoint would fire based on
// viewport width even when this sits in a narrow sidebar, which is exactly
// what caused the cramped/overflowing desktop layout.
const TWO_COL_MIN_WIDTH = 420;

const styles = {
  root: { boxSizing: "border-box", width: "100%", maxWidth: "100%", overflowX: "hidden" },
  progressWrap: { display: "flex", alignItems: "center", marginBottom: 22, width: "100%" },
  progressCircle: (state) => ({
    width: 26,
    height: 26,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 12,
    fontWeight: 700,
    flexShrink: 0,
    color: state === "done" || state === "active" ? "#fff" : "#94a3b8",
    background: state === "done" ? "#0F9B8E" : state === "active" ? "#2563EB" : "#eef1f6",
    transition: "background 0.2s ease",
  }),
  progressLabel: (state) => ({
    marginLeft: 8,
    fontSize: 12.5,
    fontWeight: state === "active" ? 700 : 500,
    color: state === "active" ? "#0f172a" : "#94a3b8",
    whiteSpace: "nowrap",
  }),
  progressLine: (filled) => ({
    flex: 1,
    minWidth: 12,
    height: 2,
    background: filled ? "#0F9B8E" : "#e2e8f0",
    margin: "0 8px",
    transition: "background 0.2s ease",
  }),
  fieldGroup: { boxSizing: "border-box", width: "100%", marginBottom: 15, minWidth: 0 },
  fieldRow: (cols) => ({
    display: "grid",
    gridTemplateColumns: cols === 2 ? "1fr 1fr" : "1fr",
    gap: 14,
    width: "100%",
    boxSizing: "border-box",
  }),
  label: { display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 },
  errorText: { display: "flex", alignItems: "center", gap: 4, color: "#dc2626", fontSize: 12, marginTop: 4 },
  validText: { display: "flex", alignItems: "center", gap: 4, color: "#0F9B8E", fontSize: 12, marginTop: 4 },
  navRow: { display: "flex", gap: 10, marginTop: 4, width: "100%" },
  activityLine: { display: "flex", alignItems: "center", gap: 6, fontSize: 12.5, color: "#0F9B8E", fontWeight: 600, marginBottom: 10 },
  dot: { width: 6, height: 6, borderRadius: "50%", background: "#0F9B8E", flexShrink: 0 },
  trustRow: { display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "6px 16px", marginTop: 10, fontSize: 12, color: "#64748b" },
  trustItem: { display: "flex", alignItems: "center", gap: 5 },
  fallbackLink: { display: "block", textAlign: "center", marginTop: 8, fontSize: 12.5, color: "#2563EB" },
  stickyBar: {
    position: "fixed",
    left: 0,
    right: 0,
    bottom: 0,
    background: "#0f172a",
    color: "#fff",
    padding: "10px 16px calc(10px + env(safe-area-inset-bottom))",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 40,
    boxShadow: "0 -6px 20px rgba(0,0,0,0.15)",
  },
  reviewCard: { background: "#f8fafc", borderRadius: 12, padding: "14px 16px", marginBottom: 16, fontSize: 13.5, color: "#334155", width: "100%", boxSizing: "border-box" },
  reviewRow: { display: "flex", justifyContent: "space-between", gap: 12, padding: "4px 0" },
  reviewValue: { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", textAlign: "right", minWidth: 0 },
  doneWrap: { textAlign: "center", padding: "20px 8px" },
  doneIconWrap: {
    width: 56, height: 56, borderRadius: "50%", background: "#E8FBF0", color: "#0F9B8E",
    display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px",
  },
  currencyRow: { display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8, marginBottom: 16, width: "100%" },
  currencySelect: { flex: "1 1 180px", minWidth: 0, maxWidth: 260 },
  currencyNote: { fontSize: 11.5, color: "#94a3b8", marginTop: 4 },
  checkRow: { display: "flex", flexWrap: "wrap", gap: 16, marginBottom: 15 },
};

// measures the widget's OWN container width via ResizeObserver, instead of
// relying on window.innerWidth — this is what makes the two-column fields
// respond correctly whether the form is full-width or inside a narrow sidebar
const useContainerWidth = () => {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) setWidth(entry.contentRect.width);
    });
    observer.observe(el);
    setWidth(el.getBoundingClientRect().width);
    return () => observer.disconnect();
  }, []);

  return [ref, width];
};

// the sticky bottom bar spans the full viewport by design, so it's the one
// place viewport width (rather than container width) is actually correct
const useIsMobileViewport = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
};

const Field = ({ label, error, valid, children }) => (
  <div style={styles.fieldGroup}>
    <label style={styles.label}>{label}</label>
    {children}
    {error && <span style={styles.errorText}><AlertIcon /> {error}</span>}
    {!error && valid && <span style={styles.validText}><CheckIcon size={12} /> {valid}</span>}
  </div>
);

const QuoteInquiry = ({ hideTitle, baseFobPrice = 10000, requestsToday }) => {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const hasLoadedSettingsRef = useRef(false);
  const ratesSource = settings.portRates || DEFAULT_SETTINGS.portRates;
  const countries = Object.keys(ratesSource);
  const [containerRef, containerWidth] = useContainerWidth();
  const isMobileViewport = useIsMobileViewport();
  const twoCol = containerWidth >= TWO_COL_MIN_WIDTH;

  useEffect(() => {
    if (hasLoadedSettingsRef.current) return;
    hasLoadedSettingsRef.current = true;

    const loadSettings = async () => {
      try {
        const response = await fetch("/api/inquiry-settings", { cache: "no-store" });
        if (!response.ok) return;
        const data = await response.json();
        const merged = {
          ...DEFAULT_SETTINGS,
          ...data,
          currencies: {
            ...DEFAULT_SETTINGS.currencies,
            ...(data.currencies || {}),
          },
          portRates: data.portRates || DEFAULT_SETTINGS.portRates,
        };

        setSettings((prev) => (areSettingsEqual(prev, merged) ? prev : merged));
      } catch (error) {
        console.error("Failed to load inquiry settings", error);
      }
    };

    loadSettings();
  }, []);

  const [stepIndex, setStepIndex] = useState(0);
  const [done, setDone] = useState(false);
  const [touched, setTouched] = useState({});
  const [currency, setCurrency] = useState(settings.defaultCurrency || DEFAULT_CURRENCY);
  const [formData, setFormData] = useState({
    country: countries[0],
    port: ratesSource[countries[0]][0].name,
    portPrice: ratesSource[countries[0]][0].price,
    inspection: true,
    insurance: false,
    fullName: "",
    email: "",
    phone: "",
    phone2: "",
    agreeTerms: false,
  });

  useEffect(() => {
    setCurrency(settings.defaultCurrency || DEFAULT_CURRENCY);
  }, [settings.defaultCurrency]);

  useEffect(() => {
    setFormData((prev) => {
      const validCountry = ratesSource[prev.country] ? prev.country : (countries[0] || "Japan");
      const validPortList = ratesSource[validCountry] || [];
      const selectedPort = validPortList.find((item) => item.name === prev.port) || validPortList[0];
      const nextPortPrice = selectedPort?.price ?? prev.portPrice ?? 0;

      if (
        prev.country === validCountry &&
        prev.port === selectedPort?.name &&
        Number(prev.portPrice || 0) === Number(nextPortPrice)
      ) {
        return prev;
      }

      return {
        ...prev,
        country: validCountry,
        port: selectedPort?.name || "",
        portPrice: nextPortPrice,
      };
    });
  }, [ratesSource]);
  const [submitting, setSubmitting] = useState(false);
  const [popupBlocked, setPopupBlocked] = useState(false);
  const [lastWhatsappUrl, setLastWhatsappUrl] = useState(null);

  const safeBaseFobPrice = Number.isFinite(Number(baseFobPrice)) ? Number(baseFobPrice) : 10000;
  const currentPorts = useMemo(() => ratesSource[formData.country] || [], [formData.country, ratesSource]);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData((prev) => {
      if (name === "country") {
        const nextCountry = value;
        const nextPortList = ratesSource[nextCountry] || [];
        const nextPort = nextPortList[0]?.name || "";
        const nextPortPrice = nextPortList[0]?.price || 0;
        return { ...prev, country: nextCountry, port: nextPort, portPrice: nextPortPrice };
      }
      if (name === "port") {
        const selectedPort = (ratesSource[prev.country] || []).find((item) => item.name === value);
        return { ...prev, port: value, portPrice: selectedPort ? selectedPort.price : prev.portPrice };
      }
      return { ...prev, [name]: type === "checkbox" ? checked : value };
    });
  };

  const markTouched = (name) => setTouched((prev) => ({ ...prev, [name]: true }));

  const getCifPriceJPY = () => {
    const inspectionFee = formData.inspection ? 250 : 0;
    const insuranceFee = formData.insurance ? 200 : 0;
    const portFee = Number(formData.portPrice || 0);
    return safeBaseFobPrice + portFee + inspectionFee + insuranceFee;
  };

  const formatCurrency = (valueInJPY, currencyCode = currency) => {
    const c = (settings.currencies && settings.currencies[currencyCode]) || CURRENCIES[currencyCode] || CURRENCIES[DEFAULT_CURRENCY];
    const converted = Number(valueInJPY) * c.rate;
    return `${c.symbol} ${converted.toLocaleString(undefined, {
      minimumFractionDigits: c.decimals,
      maximumFractionDigits: c.decimals,
    })}`;
  };

  const contactErrors = {
    fullName: formData.fullName.trim() ? null : "Enter your full name",
    email: isValidEmail(formData.email) ? null : "Enter a valid email address",
    phone: isValidPhone(formData.phone) ? null : "Enter a valid phone number",
  };
  const contactStepValid = !contactErrors.fullName && !contactErrors.email && !contactErrors.phone;

  const goNext = () => {
    if (stepIndex === 1) {
      setTouched((prev) => ({ ...prev, fullName: true, email: true, phone: true }));
      if (!contactStepValid) return;
    }
    setStepIndex((i) => Math.min(i + 1, STEPS.length - 1));
  };
  const goBack = () => setStepIndex((i) => Math.max(i - 1, 0));

  const sendToWhatsapp = () => {
    if (submitting) return;

    const cifJPY = getCifPriceJPY();
    const showingConverted = currency !== "JPY";

    const text = [
      "Hello,",
      "I would like an order inquiry.",
      `Country: ${formData.country}`,
      `Port: ${formData.port}`,
      `FOB Base Price: ${formatCurrency(safeBaseFobPrice, "JPY")}`,
      `Port Price: ${formatCurrency(formData.portPrice, "JPY")}`,
      `Inspection: ${formData.inspection ? "Yes" : "No"}`,
      `Insurance: ${formData.insurance ? "Yes" : "No"}`,
      `Total CIF Price: ${formatCurrency(cifJPY, "JPY")}${
        showingConverted ? ` (viewed as ~${formatCurrency(cifJPY)} on the buyer's screen — estimate only)` : ""
      }`,
      `Full Name: ${formData.fullName}`,
      `Email: ${formData.email}`,
      `Phone: ${formData.phone}`,
      `Phone2: ${formData.phone2}`,
    ].join("\n");

    const whatsappNumber = "819063609950";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;

    setSubmitting(true);
    setPopupBlocked(false);

    const opened = window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    if (!opened || opened.closed) {
      setPopupBlocked(true);
      setLastWhatsappUrl(whatsappUrl);
      setSubmitting(false);
      return;
    }

    setLastWhatsappUrl(whatsappUrl);
    setTimeout(() => setSubmitting(false), SUBMIT_LOCK_MS);
    setDone(true);
  };

  const validateTerms = () => {
    if (!formData.agreeTerms) {
      markTouched("agreeTerms");
      const checkbox = document.getElementById("agreeTerms");
      if (checkbox) {
        checkbox.setCustomValidity("Please accept the Terms & Conditions before submitting.");
        checkbox.reportValidity();
      }
      return false;
    }

    const checkbox = document.getElementById("agreeTerms");
    if (checkbox) checkbox.setCustomValidity("");
    return true;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (stepIndex < STEPS.length - 1) {
      goNext();
      return;
    }

    if (!validateTerms()) {
      return;
    }

    sendToWhatsapp();
  };

  const resetForm = () => {
    setDone(false);
    setStepIndex(0);
    setTouched({});
    setPopupBlocked(false);
    setFormData((prev) => ({ ...prev, fullName: "", email: "", phone: "", phone2: "", agreeTerms: false }));
  };

  if (done) {
    return (
      <div ref={containerRef} style={{ ...styles.root, ...styles.doneWrap }}>
        <div style={styles.doneIconWrap}>
          <CheckIcon size={26} />
        </div>
        <h4 style={{ marginBottom: 8 }}>Your request is on its way</h4>
        <p style={{ color: "#64748b", fontSize: 13.5, marginBottom: 20 }}>
          We opened WhatsApp with your details pre-filled — just hit send over there to reach us.
          Most sellers reply within a few hours.
        </p>
        {popupBlocked && lastWhatsappUrl && (
          <a href={lastWhatsappUrl} target="_blank" rel="noopener noreferrer" style={{ ...styles.fallbackLink, marginBottom: 16 }}>
            WhatsApp didn&apos;t open automatically — tap here to continue
          </a>
        )}
        <button type="button" className="btn btn-thm btn-block btn-lg" onClick={resetForm}>
          Start a new inquiry
        </button>
      </div>
    );
  }

  return (
    <form ref={containerRef} className="contact_form" style={styles.root} onSubmit={handleFormSubmit}>
      {!hideTitle && (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h4 style={{ margin: 0, fontSize: 14, fontWeight: 600 }}>Free Quote / Inquiry</h4>
          {/* <span style={{ fontSize: 12, color: "#dc2626" }}>*Required fields</span> */}
        </div>
      )}

      {/* currency selector — visible on every step, defaults to JPY */}
      <div style={styles.currencyRow}>
        <label htmlFor="displayCurrency" style={{ ...styles.label, marginBottom: 0 }}>
          Show prices in
        </label>
        <select
          id="displayCurrency"
          className="form-control form-control-sm"
          style={styles.currencySelect}
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          {Object.entries(settings.currencies || CURRENCIES).map(([code, c]) => (
            <option key={code} value={code}>{c.label}</option>
          ))}
        </select>
      </div>
      {currency !== "JPY" && (
        <p style={styles.currencyNote}>
          Estimated conversion for reference only — your invoice will be issued in Japanese Yen (¥).
        </p>
      )}

      <div style={styles.progressWrap}>
        {STEPS.map((step, i) => {
          const state = i < stepIndex ? "done" : i === stepIndex ? "active" : "upcoming";
          return (
            <div key={step.key} style={{ display: "flex", alignItems: "center", flex: i === STEPS.length - 1 ? "0 0 auto" : 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={styles.progressCircle(state)}>{state === "done" ? <CheckIcon size={13} /> : i + 1}</div>
                <span style={styles.progressLabel(state)}>{step.label}</span>
              </div>
              {i < STEPS.length - 1 && <div style={styles.progressLine(i < stepIndex)} />}
            </div>
          );
        })}
      </div>

      {stepIndex === 0 && (
        <>
          <div style={styles.fieldRow(twoCol ? 2 : 1)}>
            <Field label="Select your country">
              <select className="form-control form-control-sm" name="country" value={formData.country} onChange={handleChange} required>
                {countries.map((country) => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </Field>
            <Field label="Select the Port">
              <select className="form-control form-control-sm" name="port" value={formData.port} onChange={handleChange} required>
                {currentPorts.map((port) => (
                  <option key={port.name} value={port.name}>{port.name}</option>
                ))}
              </select>
            </Field>
          </div>

          <div style={styles.checkRow}>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="inspection" name="inspection" checked={formData.inspection} onChange={handleChange} />
              <label className="form-check-label fz13" htmlFor="inspection">Inspection</label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="insurance" name="insurance" checked={formData.insurance} onChange={handleChange} />
              <label className="form-check-label fz13" htmlFor="insurance">Insurance</label>
            </div>
          </div>

          <p style={{ fontSize: 12.5, color: "#94a3b8", marginBottom: 16 }}>
            Running total: <strong style={{ color: "#0f172a" }}>{formatCurrency(getCifPriceJPY())}</strong>
          </p>

          <div style={styles.navRow}>
            <button type="button" className="btn btn-thm btn-block btn-lg" onClick={goNext}>
              Continue
            </button>
          </div>
        </>
      )}

      {stepIndex === 1 && (
        <>
          <div style={styles.fieldRow(twoCol ? 2 : 1)}>
            <Field
              label="Full Name*"
              error={touched.fullName ? contactErrors.fullName : null}
              valid={touched.fullName && !contactErrors.fullName ? "Looks good" : null}
            >
              <input
                className="form-control form-control-sm"
                type="text"
                name="fullName"
                autoComplete="name"
                placeholder="Your Name"
                value={formData.fullName}
                onChange={handleChange}
                onBlur={() => markTouched("fullName")}
                required
              />
            </Field>
            <Field
              label="Email Address*"
              error={touched.email ? contactErrors.email : null}
              valid={touched.email && !contactErrors.email ? "We'll only use this to send your quote" : null}
            >
              <input
                className="form-control form-control-sm email"
                type="email"
                name="email"
                autoComplete="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                onBlur={() => markTouched("email")}
                required
              />
            </Field>
          </div>

          <div style={styles.fieldRow(twoCol ? 2 : 1)}>
            <Field
              label="Phone*"
              error={touched.phone ? contactErrors.phone : null}
              valid={touched.phone && !contactErrors.phone ? "We never share your number" : null}
            >
              <input
                className="form-control form-control-sm"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                name="phone"
                placeholder="Your Tel"
                value={formData.phone}
                onChange={handleChange}
                onBlur={() => markTouched("phone")}
                required
              />
            </Field>
            <Field label="Phone2">
              <input
                className="form-control form-control-sm"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                name="phone2"
                placeholder="Your Tel2"
                value={formData.phone2}
                onChange={handleChange}
              />
            </Field>
          </div>

          <div style={styles.navRow}>
            <button type="button" className="btn btn-outline-secondary btn-lg" onClick={goBack} style={{ flex: "0 0 auto" }}>
              Back
            </button>
            <button type="button" className="btn btn-thm btn-lg" style={{ flex: 1 }} onClick={goNext}>
              Continue
            </button>
          </div>
        </>
      )}

      {stepIndex === 2 && (
        <>
          <div style={styles.reviewCard}>
            <div style={styles.reviewRow}><span>Country</span><strong style={styles.reviewValue}>{formData.country}</strong></div>
            <div style={styles.reviewRow}><span>Port</span><strong style={styles.reviewValue}>{formData.port}</strong></div>
            <div style={styles.reviewRow}><span>Inspection</span><strong style={styles.reviewValue}>{formData.inspection ? "Yes" : "No"}</strong></div>
            <div style={styles.reviewRow}><span>Insurance</span><strong style={styles.reviewValue}>{formData.insurance ? "Yes" : "No"}</strong></div>
            <hr style={{ margin: "8px 0" }} />
            <div style={styles.reviewRow}><span>Name</span><strong style={styles.reviewValue}>{formData.fullName}</strong></div>
            <div style={styles.reviewRow}><span>Email</span><strong style={styles.reviewValue}>{formData.email}</strong></div>
            <div style={styles.reviewRow}><span>Phone</span><strong style={styles.reviewValue}>{formData.phone}</strong></div>
          </div>

          <div className="quote_total_price">
            <p className="quote_total_label">Total CIF Price</p>
            <h3 className="quote_total_amount">{formatCurrency(getCifPriceJPY())}</h3>
            <p className="quote_total_subtext">
              FOB Base: {formatCurrency(safeBaseFobPrice)}, Port: {formatCurrency(formData.portPrice)}
            </p>
            {/* <p style={{ fontSize: 12, color: "#94a3b8", marginTop: 4 }}>
              {currency === "JPY"
                ? "This is the full landed cost shown above — no hidden fees added later."
                : "Estimated in your selected currency — the invoice will be issued in Japanese Yen (¥)."}
            </p> */}
          </div>

          <div style={{ marginBottom: 15 }}>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="agreeTerms"
                name="agreeTerms"
                checked={formData.agreeTerms}
                required
                aria-invalid={touched.agreeTerms && !formData.agreeTerms}
                onChange={(e) => {
                  handleChange(e);
                  if (e.target.checked) {
                    e.target.setCustomValidity("");
                  }
                }}
                onBlur={() => markTouched("agreeTerms")}
                onInvalid={(e) => {
                  e.target.setCustomValidity("Please accept the Terms & Conditions before submitting.");
                  markTouched("agreeTerms");
                }}
                onInput={(e) => e.target.setCustomValidity("")}
              />
              <label className="form-check-label fz13" htmlFor="agreeTerms">
                I agree to Reiko group.com&apos;s <a href="#">Terms of Service</a>
              </label>
            </div>
            {touched.agreeTerms && !formData.agreeTerms && (
              <span style={styles.errorText}><AlertIcon /> Please accept the terms to continue</span>
            )}
          </div>

          {typeof requestsToday === "number" && requestsToday > 0 && (
            <p style={styles.activityLine}>
              <span style={styles.dot} />
              {requestsToday} {requestsToday === 1 ? "buyer" : "buyers"} requested a quote today
            </p>
          )}

          <div style={styles.navRow}>
            <button type="button" className="btn btn-outline-secondary btn-lg" onClick={goBack} style={{ flex: "0 0 auto" }}>
              Back
            </button>
            <button
              type="submit"
              className="btn btn-thm btn-lg"
              style={{
                flex: 1,
                opacity: submitting || !formData.agreeTerms ? 0.6 : 1,
                cursor: submitting || !formData.agreeTerms ? "not-allowed" : "pointer",
              }}
              disabled={submitting || !formData.agreeTerms}
            >
              {submitting ? "Opening WhatsApp…" : "Request Quote"}
            </button>
          </div>

          {popupBlocked && lastWhatsappUrl && (
            <a href={lastWhatsappUrl} target="_blank" rel="noopener noreferrer" style={styles.fallbackLink}>
              Didn&apos;t open automatically? Tap here to continue on WhatsApp
            </a>
          )}

          <div style={styles.trustRow}>
            <span style={styles.trustItem}><ClockIcon /> Replies within a few hours</span>
            <span style={styles.trustItem}><CheckIcon /> No obligation</span>
            <span style={styles.trustItem}><LockIcon /> We never share your number</span>
          </div>
        </>
      )}

      {isMobileViewport && stepIndex < 2 && (
        <div style={styles.stickyBar}>
          <span style={{ fontSize: 12.5, opacity: 0.8 }}>Estimated total</span>
          <strong style={{ fontSize: 15 }}>{formatCurrency(getCifPriceJPY())}</strong>
        </div>
      )}
    </form>
  );
};

export default QuoteInquiry;