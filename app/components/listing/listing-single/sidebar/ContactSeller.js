"use client";

import { useState } from "react";

const ContactSeller = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message:
      "I am interested in a price quote on this vehicle. Please contact me at your earliest convenience with your best price for this vehicle.",
  });

  const phoneNumber = "819063609950";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const text = [
      "Hello,",
      `Name: ${formData.name}`,
      `Phone: ${formData.phone}`,
      `Email: ${formData.email}`,
      "",
      `Message: ${formData.message}`,
    ].join("\n");

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      text
    )}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-lg-12">
          <div className="mb-3">
            <input
              className="form-control form_control"
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        {/* End .col-12 */}

        <div className="col-lg-12">
          <div className="mb-3">
            <input
              className="form-control form_control"
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        {/* End .col-12 */}

        <div className="col-lg-12">
          <div className="mb-3">
            <input
              className="form-control form_control"
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        {/* End .col-12 */}

        <div className="col-md-12">
          <div className="mb-3">
            <textarea
              className="form-control"
              rows={6}
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        {/* End .col-12 */}

        <div className="col-md-12">
          <button type="submit" className="btn btn-block btn-thm mt10 mb20">
            Send Message
          </button>
          <button
            type="button"
            className="btn btn-block btn-whatsapp mb0"
            onClick={handleSubmit}
          >
            <span className="flaticon-whatsapp mr10 text-white" />
            WhatsApp
          </button>
        </div>
        {/* End .col-12 */}
      </div>
      {/* End .row */}
    </form>
  );
};

export default ContactSeller;
