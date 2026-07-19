"use client";

import { useState } from "react";

const Form = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const whatsappNumber = "819063609950";
    const text = [
      "Hello RAICO GROUP,",
      `First Name: ${formData.firstName}`,
      `Last Name: ${formData.lastName}`,
      `Email: ${formData.email}`,
      `Phone: ${formData.phone}`,
      "",
      `Message: ${formData.message}`,
    ].join("\n");

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      text
    )}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <form className="contact_form" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label className="form-label">First Name*</label>
            <input
              className="form-control"
              type="text"
              name="firstName"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        {/* End .col */}

        <div className="col-md-6">
          <div className="form-group">
            <label className="form-label">Last Name*</label>
            <input
              className="form-control"
              type="text"
              name="lastName"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        {/* End .col */}

        <div className="col-md-6">
          <div className="form-group">
            <label className="form-label">Email*</label>
            <input
              className="form-control email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        {/* End .col */}

        <div className="col-md-6">
          <div className="form-group">
            <label className="form-label">Phone*</label>
            <input
              className="form-control"
              type="text"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        {/* End .col */}

        <div className="col-sm-12">
          <div className="form-group">
            <label className="form-label">Message*</label>
            <textarea
              name="message"
              className="form-control"
              rows={6}
              placeholder="Write your message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          {/* End form-group */}
          <div className="form-group mb0">
            <button type="submit" className="btn btn-thm">
              Send on WhatsApp
            </button>
          </div>
        </div>
        {/* End .col */}
      </div>
      {/* End .row */}
    </form>
  );
};

export default Form;
