"use client";

import { useState } from "react";

const QuoteInquiry = ({ hideTitle }) => {
  const [formData, setFormData] = useState({
    country: "Sri Lanka",
    port: "Colombo",
    inspection: true,
    insurance: false,
    fullName: "",
    email: "",
    phone: "",
    phone2: "",
  });

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const getTotalPrice = () => {
    const port = formData.port.toLowerCase();
    switch (port) {
      case "hambantota":
        return "US$ 4,799";
      case "galle":
        return "US$ 4,599";
      default:
        return "US$ 4,379";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const text = [
      "Hello,",
      "I would like a free quote / inquiry.",
      `Country: ${formData.country}`,
      `Port: ${formData.port}`,
      `Inspection: ${formData.inspection ? "Yes" : "No"}`,
      `Insurance: ${formData.insurance ? "Yes" : "No"}`,
      `Full Name: ${formData.fullName}`,
      `Email: ${formData.email}`,
      `Phone: ${formData.phone}`,
      `Phone2: ${formData.phone2}`,
      `Estimated Total Price: ${getTotalPrice()}`,
    ].join("\n");

    const whatsappNumber = "819063609950";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      text
    )}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <form className="contact_form" onSubmit={handleSubmit}>
      <div className="row">
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
              <option>Sri Lanka</option>
              <option>Japan</option>
              <option>USA</option>
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
              <option>Colombo</option>
              <option>Hambantota</option>
              <option>Galle</option>
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
          <div className="quote_total_price p20 mb15 bgc-white bdrs10 border">
            <p className="mb5 fz12 body-color">C&amp;F COLOMBO</p>
            <h3 className="mb0 fz16">{getTotalPrice()}</h3>
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
