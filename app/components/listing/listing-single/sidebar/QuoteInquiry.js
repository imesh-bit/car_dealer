"use client";

import { useMemo, useState } from "react";
import rates from "@/data/orderInquiryRates.json";

const QuoteInquiry = ({ hideTitle, baseFobPrice = 10000 }) => {
  const countries = Object.keys(rates);
  const [formData, setFormData] = useState({
    country: countries[0],
    port: rates[countries[0]][0].name,
    portPrice: rates[countries[0]][0].price,
    inspection: true,
    insurance: false,
    fullName: "",
    email: "",
    phone: "",
    phone2: "",
  });

  const currentPorts = useMemo(
    () => rates[formData.country] || [],
    [formData.country]
  );

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData((prev) => {
      if (name === "country") {
        const nextCountry = value;
        const nextPort = rates[nextCountry][0].name;
        const nextPortPrice = rates[nextCountry][0].price;
        return {
          ...prev,
          country: nextCountry,
          port: nextPort,
          portPrice: nextPortPrice,
        };
      }

      if (name === "port") {
        const selectedPort = rates[prev.country].find(
          (item) => item.name === value
        );
        return {
          ...prev,
          port: value,
          portPrice: selectedPort ? selectedPort.price : prev.portPrice,
        };
      }

      return {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  };

  const getCifPrice = () => {
    const inspectionFee = formData.inspection ? 250 : 0;
    const insuranceFee = formData.insurance ? 200 : 0;
    const portFee = Number(formData.portPrice || 0);
    const cif = baseFobPrice + portFee + inspectionFee + insuranceFee;
    return cif;
  };

  const formatCurrency = (value) => `¥ ${Number(value).toLocaleString()}`;

  const handleSubmit = (e) => {
    e.preventDefault();

    const text = [
      "Hello,",
      "I would like an order inquiry.",
      `Country: ${formData.country}`,
      `Port: ${formData.port}`,
      `FOB Base Price: ${formatCurrency(baseFobPrice)}`,
      `Port Price: ${formatCurrency(formData.portPrice)}`,
      `Inspection: ${formData.inspection ? "Yes" : "No"}`,
      `Insurance: ${formData.insurance ? "Yes" : "No"}`,
      `Total CIF Price: ${formatCurrency(getCifPrice())}`,
      `Full Name: ${formData.fullName}`,
      `Email: ${formData.email}`,
      `Phone: ${formData.phone}`,
      `Phone2: ${formData.phone2}`,
    ].join("\n");

    const whatsappNumber = "819063609950";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      text
    )}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <form className="contact_form" onSubmit={handleSubmit}>
      <div className="row quote-inquiry-form">
        {!hideTitle && (
          <div className="col-12 mb20">
            <div className="d-flex justify-content-between align-items-center">
              <h4 className="mb0 fz14 fw-semibold">Free Quote / Inquiry</h4>
              <span className="fz12 text-danger">*Required fields</span>
            </div>
          </div>
        )}

        <div className="col-md-6">
          <div className="form-group mb15">
            <label className="form-label fz13 fw-semibold">Country</label>
            <select
              className="form-control form-control-sm"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            >
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-group mb15">
            <label className="form-label fz13 fw-semibold">Port</label>
            <select
              className="form-control form-control-sm"
              name="port"
              value={formData.port}
              onChange={handleChange}
              required
            >
              {currentPorts.map((port) => (
                <option key={port.name} value={port.name}>
                  {port.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="col-12">
          <div className="d-flex flex-wrap gap-3 mb15">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="inspection"
                name="inspection"
                checked={formData.inspection}
                onChange={handleChange}
              />
              <label className="form-check-label fz13" htmlFor="inspection">
                Inspection
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="insurance"
                name="insurance"
                checked={formData.insurance}
                onChange={handleChange}
              />
              <label className="form-check-label fz13" htmlFor="insurance">
                Insurance
              </label>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-group mb15">
            <label className="form-label fz13 fw-semibold">Full Name*</label>
            <input
              className="form-control form-control-sm"
              type="text"
              name="fullName"
              placeholder="Your Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-group mb15">
            <label className="form-label fz13 fw-semibold">Email Address*</label>
            <input
              className="form-control form-control-sm email"
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-group mb15">
            <label className="form-label fz13 fw-semibold">Phone*</label>
            <input
              className="form-control form-control-sm"
              type="text"
              name="phone"
              placeholder="Your Tel"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-group mb15">
            <label className="form-label fz13 fw-semibold">Phone2</label>
            <input
              className="form-control form-control-sm"
              type="text"
              name="phone2"
              placeholder="Your Tel2"
              value={formData.phone2}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="col-12">
          <div className="quote_total_price">
            <p className="quote_total_label">Total CIF Price</p>
            <h3 className="quote_total_amount">
              {formatCurrency(getCifPrice())}
            </h3>
            <p className="quote_total_subtext">
              FOB Base: {formatCurrency(baseFobPrice)}, Port: {formatCurrency(formData.portPrice)}
            </p>
          </div>
        </div>

        <div className="col-12 mb15">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="agreeTerms"
              required
            />
            <label className="form-check-label fz13" htmlFor="agreeTerms">
              I agree to Reiko group.com&apos;s <a href="#">Terms of Service</a>
            </label>
          </div>
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-thm btn-block btn-sm">
            Request Quote
          </button>
        </div>
      </div>
    </form>
  );
};

export default QuoteInquiry;
