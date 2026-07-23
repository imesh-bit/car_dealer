"use client";

import { useMemo, useState } from "react";
import rates from "@/data/orderInquiryRates.json";

const OrderInquiryGeneral = ({ hideTitle, car, baseFobPrice = 10000 }) => {
  const countries = Object.keys(rates);
  const defaultCountry = countries[0];
  const [formData, setFormData] = useState({
    country: defaultCountry,
    port: rates[defaultCountry][0].name,
    portPrice: rates[defaultCountry][0].price,
    inspection: true,
    insurance: false,
    orderQuantity: "",
    specialInstructions: "",
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

  const handlePortPriceChange = (e) => {
    const value = Number(e.target.value || 0);
    setFormData((prev) => ({
      ...prev,
      portPrice: value,
      port: prev.port,
    }));
  };

  const actualFobPrice = car?.price || baseFobPrice;

  const getCifPrice = () => {
    const inspectionFee = formData.inspection ? 250 : 0;
    const insuranceFee = formData.insurance ? 200 : 0;
    const portFee = Number(formData.portPrice || 0);
    return actualFobPrice + portFee + inspectionFee + insuranceFee;
  };

  const formatCurrency = (value) => `¥ ${Number(value).toLocaleString()}`;

  const handleSubmit = (e) => {
    e.preventDefault();

    const text = [
      "Hello,",
      "I would like a general order inquiry.",
      `Listing: ${car?.title ?? "General Listing"}`,
      `Product Category: ${car?.productCategory ?? "N/A"}`,
      `Packaging Type: ${car?.packagingType ?? "N/A"}`,
      `Order Scale: ${car?.orderScale ?? "N/A"}`,
      `Minimum Order Quantity: ${car?.minimumOrderQuantity ?? "N/A"}`,
      `Country: ${formData.country}`,
      `Port: ${formData.port}`,
      `FOB Base Price: ${formatCurrency(actualFobPrice)}`,
      `Port Price: ${formatCurrency(formData.portPrice)}`,
      `Inspection: ${formData.inspection ? "Yes" : "No"}`,
      `Insurance: ${formData.insurance ? "Yes" : "No"}`,
      `Total CIF Price: ${formatCurrency(getCifPrice())}`,
      `Order Quantity: ${formData.orderQuantity}`,
      `Special Instructions: ${formData.specialInstructions}`,
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
      <div className="row">
        {!hideTitle && (
          <div className="col-12 mb20">
            <div className="d-flex justify-content-between align-items-center">
              <h4 className="mb0 fz14 fw-semibold">Order Inquiry</h4>
              <span className="fz12 text-danger">*Required fields</span>
            </div>
          </div>
        )}

        <div className="col-12 mb20">
          <div className="bgc-grey p20 bdrs10 border">
            <p className="mb10 fz12 fw-semibold">Listing Details</p>
            <div className="row gx-2 gy-2">
              <div className="col-6 fz12">
                <strong>Product Category:</strong> {car?.productCategory ?? "-"}
              </div>
              <div className="col-6 fz12">
                <strong>Packaging:</strong> {car?.packagingType ?? "-"}
              </div>
              <div className="col-6 fz12">
                <strong>Order Scale:</strong> {car?.orderScale ?? "-"}
              </div>
              <div className="col-6 fz12">
                <strong>MOQ:</strong> {car?.minimumOrderQuantity ?? "-"}
              </div>
            </div>
          </div>
        </div>

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

        <div className="col-md-6">
          <div className="form-group mb15">
            <label className="form-label fz13 fw-semibold">Port Price</label>
            <input
              className="form-control form-control-sm"
              type="number"
              min="0"
              name="portPrice"
              value={formData.portPrice}
              onChange={handlePortPriceChange}
              required
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-group mb15">
            <label className="form-label fz13 fw-semibold">Order Quantity</label>
            <input
              className="form-control form-control-sm"
              type="text"
              name="orderQuantity"
              placeholder="e.g. 100 units"
              value={formData.orderQuantity}
              onChange={handleChange}
            />
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

        <div className="col-12">
          <div className="form-group mb15">
            <label className="form-label fz13 fw-semibold">Special Instructions</label>
            <textarea
              className="form-control form-control-sm"
              name="specialInstructions"
              rows={3}
              value={formData.specialInstructions}
              onChange={handleChange}
              placeholder="e.g. preferred shipment date, packaging requests"
            />
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
            <p className="mb5 fz12 body-color">Total CIF Price</p>
            <h3 className="mb0 fz18 fw-semibold text-thm">
              {formatCurrency(getCifPrice())}
            </h3>
            <p className="mb0 fz12 color-grey mt5">
              FOB Base: {formatCurrency(actualFobPrice)}, Port: {formatCurrency(formData.portPrice)}
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

export default OrderInquiryGeneral;
