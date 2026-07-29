"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const initialListingForm = {
  category: "automobile",
  bodyType: "Cars",
  title: "",
  condition: "Used",
  type: "Select Type",
  make: "",
  model: "",
  year: "2023",
  driveType: "",
  transmission: "Automatic",
  fuelType: "Petrol",
  auctionGrade: "A+",
  cylinders: "4",
  color: "",
  interiorColor: "",
  doors: "4 Doors",
  price: "",
  mileage: "",
  engineSize: "",
  vin: "",
  location: "",
  latitude: "",
  longitude: "",
  videoLink: "",
  imageUrl: "",
  description: "",
  features: [],
};

const categoryBodyTypeMap = {
  automobile: "Cars",
  "auto-part": "Auto Parts",
  species: "General",
};

const AddListingForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState(initialListingForm);
  const [imageFiles, setImageFiles] = useState([]);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState("success");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
    setErrors((previous) => ({
      ...previous,
      [name]: undefined,
    }));
  };

  const clearForm = () => {
    setFormData({ ...initialListingForm });
    setImageFiles([]);
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files || []);
    setImageFiles(files);
  };

  const addFeatureCategory = () => {
    setFormData((previous) => ({
      ...previous,
      features: [
        ...(previous.features || []),
        { title: "", items: [""] },
      ],
    }));
  };

  const removeFeatureCategory = (index) => {
    setFormData((previous) => ({
      ...previous,
      features: (previous.features || []).filter((_, i) => i !== index),
    }));
  };

  const handleFeatureCategoryTitleChange = (index, value) => {
    setFormData((previous) => ({
      ...previous,
      features: (previous.features || []).map((category, i) =>
        i === index ? { ...category, title: value } : category,
      ),
    }));
  };

  const handleFeatureItemChange = (categoryIndex, itemIndex, value) => {
    setFormData((previous) => ({
      ...previous,
      features: (previous.features || []).map((category, i) => {
        if (i !== categoryIndex) return category;
        return {
          ...category,
          items: category.items.map((item, j) => (j === itemIndex ? value : item)),
        };
      }),
    }));
  };

  const addFeatureItem = (categoryIndex) => {
    setFormData((previous) => ({
      ...previous,
      features: (previous.features || []).map((category, i) =>
        i !== categoryIndex
          ? category
          : { ...category, items: [...category.items, ""] },
      ),
    }));
  };

  const removeFeatureItem = (categoryIndex, itemIndex) => {
    setFormData((previous) => ({
      ...previous,
      features: (previous.features || []).map((category, i) => {
        if (i !== categoryIndex) return category;
        return {
          ...category,
          items: category.items.filter((_, j) => j !== itemIndex),
        };
      }),
    }));
  };

  const validateForm = () => {
    const validationErrors = {};

    if (!formData.title?.trim()) {
      validationErrors.title = "Listing title is required.";
    }

    if (!formData.make?.trim()) {
      validationErrors.make = "Make is required.";
    }

    if (!formData.model?.trim()) {
      validationErrors.model = "Model is required.";
    }

    if (!formData.price || Number(formData.price) <= 0) {
      validationErrors.price = "Price must be greater than 0.";
    }

    if (!formData.location?.trim()) {
      validationErrors.location = "Location is required.";
    }

    if (!formData.description?.trim()) {
      validationErrors.description = "Description is required.";
    }

    if (formData.imageUrl?.trim() && !/^https?:\/\//i.test(formData.imageUrl.trim())) {
      validationErrors.imageUrl = "Image URL must start with http:// or https://.";
    }

    return validationErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setStatus("");
    setErrors({});

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setStatusType("error");
      setStatus("Please fix the highlighted fields.");
      setErrors(validationErrors);
      setSubmitting(false);
      return;
    }

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 15000);
    const apiUrl = typeof window !== "undefined" ? `${window.location.origin}/api/listings` : "/api/listings";

    const useMultipart = imageFiles.length > 0;
    let requestOptions;

    try {
      if (useMultipart) {
        const formPayload = new FormData();
        formPayload.append("category", formData.category || "automobile");
        formPayload.append("bodyType", categoryBodyTypeMap[formData.category] || formData.bodyType || "Cars");
        formPayload.append("image", formData.imageUrl || "/images/listing/1.jpg");
        formPayload.append("title", formData.title || "New Listing");
        formPayload.append("price", String(Number(formData.price) || 0));
        formPayload.append("mileage", formData.mileage || "");
        formPayload.append("fuelType", formData.fuelType || "Petrol");
        formPayload.append("transmission", formData.transmission || "Automatic");
        formPayload.append("condition", formData.condition || "Used");
        formPayload.append("auctionGrade", formData.auctionGrade || "");
        formPayload.append("make", formData.make || "");
        formPayload.append("model", formData.model || "");
        formPayload.append("year", String(Number(formData.year) || 0));
        formPayload.append("color", formData.color || "");
        formPayload.append("driveType", formData.driveType || "");
        formPayload.append("interiorColor", formData.interiorColor || "");
        formPayload.append("engineSize", formData.engineSize || "");
        formPayload.append("doors", formData.doors || "");
        formPayload.append("cylinders", formData.cylinders || "");
        formPayload.append("vin", formData.vin || "");
        formPayload.append("location", formData.location || "");
        formPayload.append("latitude", formData.latitude || "");
        formPayload.append("longitude", formData.longitude || "");
        formPayload.append("description", formData.description || "");
        formPayload.append("videoLink", formData.videoLink || "");
        formPayload.append("imageUrl", formData.imageUrl || "");
        formPayload.append("features", JSON.stringify(formData.features || []));

        imageFiles.forEach((file) => {
          formPayload.append("images", file);
        });

        requestOptions = {
          method: "POST",
          body: formPayload,
          signal: controller.signal,
          cache: "no-store",
        };
      } else {
        const payload = {
          category: formData.category || "automobile",
          bodyType: categoryBodyTypeMap[formData.category] || formData.bodyType || "Cars",
          image: formData.imageUrl || "/images/listing/1.jpg",
          title: formData.title || "New Listing",
          price: Number(formData.price) || 0,
          mileage: formData.mileage || "",
          fuelType: formData.fuelType || "Petrol",
          transmission: formData.transmission || "Automatic",
          condition: formData.condition || "Used",
          auctionGrade: formData.auctionGrade || "",
          make: formData.make || "",
          model: formData.model || "",
          year: Number(formData.year) || 0,
          color: formData.color || "",
          driveType: formData.driveType || "",
          interiorColor: formData.interiorColor || "",
          engineSize: formData.engineSize || "",
          doors: formData.doors || "",
          cylinders: formData.cylinders || "",
          vin: formData.vin || "",
          location: formData.location || "",
          latitude: formData.latitude || "",
          longitude: formData.longitude || "",
          description: formData.description || "",
          videoLink: formData.videoLink || "",
          imageUrl: formData.imageUrl || "",
          features: formData.features || [],
        };

        requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload),
          signal: controller.signal,
          cache: "no-store",
        };
      }

      const response = await fetch(apiUrl, requestOptions);

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(result?.message || "Request failed");
      }

      setStatusType("success");
      setStatus("Listing saved successfully. Redirecting to the listing page...");
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("voiture:listings-updated"));
        window.localStorage.setItem("voiture:listings-updated", String(Date.now()));
      }
      router.push(`/listing-single-v1/${result.id}`);
      clearForm();
    } catch (error) {
      setStatusType("error");
      if (error.name === "AbortError") {
        setStatus("The request timed out. Please check that the app is running and try again.");
      } else {
        console.error(error);
        setStatus(error.message || "Unable to save listing. Please try again.");
      }
    } finally {
      window.clearTimeout(timeoutId);
      setSubmitting(false);
    }
  };

  const errorMessages = Object.values(errors).filter(Boolean);

  return (
    <form onSubmit={handleSubmit} className="contact_form">
      {errorMessages.length > 0 && (
        <div className="alert alert-danger mb30" role="alert" aria-live="polite">
          <strong>Please fix the following required fields:</strong>
          <ul className="mb0 mt15">
            {errorMessages.map((message, index) => (
              <li key={index}>{message}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="row">
        <div className="col-lg-12">
          <div className="breadcrumb_content mb30">
            <h4 className="title">Upload a New Listing</h4>
            <p>
              This page is public, so anyone who opens the same URL can add a
              listing. A simple image URL is optional, and the listing is saved
              server-side so it appears on the public listing pages.
            </p>
          </div>
        </div>

        <div className="col-lg-12">
          <div className="row">
            <div className="col-sm-6 col-md-4">
              <div className="mb20">
                <label className="form-label">Category</label>
                <select
                  name="category"
                  className="form-select"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="automobile">Automobile</option>
                  <option value="auto-part">Auto Part</option>
                  <option value="species">General</option>
                </select>
              </div>
            </div>

            <div className="col-sm-6 col-md-4">
              <div className="mb20">
                <label className="form-label">Listing Title <span className="text-danger">*</span></label>
                <input
                  id="title"
                  name="title"
                  className={`form-control form_control ${errors.title ? "is-invalid" : ""}`}
                  type="text"
                  placeholder="Title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  aria-invalid={Boolean(errors.title)}
                  aria-describedby={errors.title ? "titleError" : undefined}
                />
                {errors.title && <div id="titleError" className="text-danger mt15">{errors.title}</div>}
              </div>
            </div>

            <div className="col-sm-6 col-md-4">
              <div className="mb20">
                <label className="form-label">Condition</label>
                <select
                  name="condition"
                  className="form-select"
                  value={formData.condition}
                  onChange={handleChange}
                >
                  <option>Used</option>
                  <option>New</option>
                </select>
              </div>
            </div>

            <div className="col-sm-6 col-md-4">
              <div className="mb20">
                <label className="form-label">Auction Grade</label>
                <select
                  name="auctionGrade"
                  className="form-select"
                  value={formData.auctionGrade}
                  onChange={handleChange}
                >
                  <option value="A+">A+</option>
                  <option value="A">A</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                </select>
              </div>
            </div>

            <div className="col-sm-6 col-md-4">
              <div className="mb20">
                <label className="form-label">Make <span className="text-danger">*</span></label>
                <input
                  id="make"
                  name="make"
                  className={`form-control form_control ${errors.make ? "is-invalid" : ""}`}
                  type="text"
                  placeholder="Make"
                  value={formData.make}
                  onChange={handleChange}
                  required
                  aria-invalid={Boolean(errors.make)}
                  aria-describedby={errors.make ? "makeError" : undefined}
                />
                {errors.make && <div id="makeError" className="text-danger mt15">{errors.make}</div>}
              </div>
            </div>

            <div className="col-sm-6 col-md-4">
              <div className="mb20">
                <label className="form-label">Model <span className="text-danger">*</span></label>
                <input
                  id="model"
                  name="model"
                  className={`form-control form_control ${errors.model ? "is-invalid" : ""}`}
                  type="text"
                  placeholder="Model"
                  value={formData.model}
                  onChange={handleChange}
                  required
                  aria-invalid={Boolean(errors.model)}
                  aria-describedby={errors.model ? "modelError" : undefined}
                />
                {errors.model && <div id="modelError" className="text-danger mt15">{errors.model}</div>}
              </div>
            </div>

            <div className="col-sm-6 col-md-4">
              <div className="mb20">
                <label className="form-label">Year</label>
                <input
                  name="year"
                  className="form-control form_control"
                  type="number"
                  placeholder="Year"
                  value={formData.year}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-sm-6 col-md-4">
              <div className="mb20">
                <label className="form-label">Fuel Type</label>
                <select
                  name="fuelType"
                  className="form-select"
                  value={formData.fuelType}
                  onChange={handleChange}
                >
                  <option>Petrol</option>
                  <option>Diesel</option>
                  <option>Hybrid</option>
                  <option>Electric</option>
                </select>
              </div>
            </div>

            <div className="col-sm-6 col-md-4">
              <div className="mb20">
                <label className="form-label">Transmission</label>
                <select
                  name="transmission"
                  className="form-select"
                  value={formData.transmission}
                  onChange={handleChange}
                >
                  <option>Automatic</option>
                  <option>Manual</option>
                  <option>Semi-Automatic</option>
                </select>
              </div>
            </div>

            <div className="col-sm-6 col-md-4">
              <div className="mb20">
                <label className="form-label">Drive Type</label>
                <input
                  name="driveType"
                  className="form-control form_control"
                  type="text"
                  placeholder="AWD, FWD, RWD"
                  value={formData.driveType}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-sm-6 col-md-4">
              <div className="mb20">
                <label className="form-label">Doors</label>
                <select
                  name="doors"
                  className="form-select"
                  value={formData.doors}
                  onChange={handleChange}
                >
                  <option>2 Doors</option>
                  <option>3 Doors</option>
                  <option>4 Doors</option>
                  <option>5 Doors</option>
                </select>
              </div>
            </div>

            <div className="col-sm-6 col-md-4">
              <div className="mb20">
                <label className="form-label">Cylinders</label>
                <input
                  name="cylinders"
                  className="form-control form_control"
                  type="number"
                  placeholder="Cylinders"
                  value={formData.cylinders}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-sm-6 col-md-4">
              <div className="mb20">
                <label className="form-label">Color</label>
                <input
                  name="color"
                  className="form-control form_control"
                  type="text"
                  placeholder="Color"
                  value={formData.color}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-sm-6 col-md-4">
              <div className="mb20">
                <label className="form-label">Interior Color</label>
                <input
                  name="interiorColor"
                  className="form-control form_control"
                  type="text"
                  placeholder="Interior Color"
                  value={formData.interiorColor}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-sm-6 col-md-4">
              <div className="mb20">
                <label className="form-label">Price (USD) <span className="text-danger">*</span></label>
                <input
                  id="price"
                  name="price"
                  className={`form-control form_control ${errors.price ? "is-invalid" : ""}`}
                  type="number"
                  placeholder="Price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  aria-invalid={Boolean(errors.price)}
                  aria-describedby={errors.price ? "priceError" : undefined}
                />
                {errors.price && <div id="priceError" className="text-danger mt15">{errors.price}</div>}
              </div>
            </div>

            <div className="col-sm-6 col-md-4">
              <div className="mb20">
                <label className="form-label">Mileage</label>
                <input
                  name="mileage"
                  className="form-control form_control"
                  type="text"
                  placeholder="Mileage"
                  value={formData.mileage}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-sm-6 col-md-4">
              <div className="mb20">
                <label className="form-label">Engine Size</label>
                <input
                  name="engineSize"
                  className="form-control form_control"
                  type="text"
                  placeholder="Engine Size"
                  value={formData.engineSize}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-sm-6 col-md-4">
              <div className="mb20">
                <label className="form-label">VIN</label>
                <input
                  name="vin"
                  className="form-control form_control"
                  type="text"
                  placeholder="VIN"
                  value={formData.vin}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-sm-6 col-md-4">
              <div className="mb20">
                <label className="form-label">Location <span className="text-danger">*</span></label>
                <input
                  id="location"
                  name="location"
                  className={`form-control form_control ${errors.location ? "is-invalid" : ""}`}
                  type="text"
                  placeholder="Address"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  aria-invalid={Boolean(errors.location)}
                  aria-describedby={errors.location ? "locationError" : undefined}
                />
                {errors.location && <div id="locationError" className="text-danger mt15">{errors.location}</div>}
              </div>
            </div>

            <div className="col-sm-6 col-md-4">
              <div className="mb20">
                <label className="form-label">Latitude</label>
                <input
                  name="latitude"
                  className="form-control form_control"
                  type="text"
                  placeholder="Latitude"
                  value={formData.latitude}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-sm-6 col-md-4">
              <div className="mb20">
                <label className="form-label">Longitude</label>
                <input
                  name="longitude"
                  className="form-control form_control"
                  type="text"
                  placeholder="Longitude"
                  value={formData.longitude}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-lg-12">
              <div className="mb20">
                <label className="form-label">Description <span className="text-danger">*</span></label>
                <textarea
                  id="description"
                  name="description"
                  className={`form-control ${errors.description ? "is-invalid" : ""}`}
                  rows={5}
                  placeholder="Listing description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  aria-invalid={Boolean(errors.description)}
                  aria-describedby={errors.description ? "descriptionError" : undefined}
                />
                {errors.description && <div id="descriptionError" className="text-danger mt15">{errors.description}</div>}
              </div>
            </div>

            <div className="col-lg-12">
              <div className="mb20">
                <label className="form-label">Features</label>
                {(formData.features || []).length === 0 ? (
                  <p className="small text-muted">No feature categories added yet.</p>
                ) : (
                  formData.features.map((category, categoryIndex) => (
                    <div key={categoryIndex} className="mb20 p-3 border rounded">
                      <div className="d-flex justify-content-between align-items-center mb15">
                        <label className="form-label mb-0">Category title</label>
                        <button
                          type="button"
                          className="btn btn-sm btn-danger"
                          onClick={() => removeFeatureCategory(categoryIndex)}
                        >
                          Remove category
                        </button>
                      </div>
                      <input
                        type="text"
                        className="form-control form_control mb15"
                        placeholder="Category title"
                        value={category.title}
                        onChange={(event) =>
                          handleFeatureCategoryTitleChange(categoryIndex, event.target.value)
                        }
                      />
                      {category.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="d-flex align-items-center mb10">
                          <input
                            type="text"
                            className="form-control form_control"
                            placeholder={`Feature ${itemIndex + 1}`}
                            value={item}
                            onChange={(event) =>
                              handleFeatureItemChange(categoryIndex, itemIndex, event.target.value)
                            }
                          />
                          <button
                            type="button"
                            className="btn btn-sm btn-danger ms-2"
                            onClick={() => removeFeatureItem(categoryIndex, itemIndex)}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-thm"
                        onClick={() => addFeatureItem(categoryIndex)}
                      >
                        Add feature item
                      </button>
                    </div>
                  ))
                )}
                <button type="button" className="btn btn-sm btn-thm" onClick={addFeatureCategory}>
                  Add feature category
                </button>
              </div>
            </div>

            <div className="col-lg-12">
              <div className="mb20">
                <label className="form-label">Video Link</label>
                <input
                  name="videoLink"
                  className="form-control form_control"
                  type="text"
                  placeholder="YouTube, Instagram, or .mp4 link"
                  value={formData.videoLink}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-lg-12">
              <div className="mb20">
                <label className="form-label">Upload Cover Image (optional)</label>
                <input
                  type="file"
                  className="form-control form_control"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                {imageFiles.length > 0 && (
                  <div className="small text-muted mt10">
                    Selected file: {imageFiles.map((file) => file.name).join(", ")}
                  </div>
                )}
              </div>
            </div>

            <div className="col-lg-12">
              <div className="mb20">
                <label className="form-label">Cover Image URL (optional)</label>
                <input
                  name="imageUrl"
                  className={`form-control form_control ${errors.imageUrl ? "is-invalid" : ""}`}
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.imageUrl)}
                />
                {errors.imageUrl && <div className="text-danger mt5">{errors.imageUrl}</div>}
              </div>
            </div>

            <div className="col-lg-12">
              <button type="submit" className="btn btn-thm" disabled={submitting}>
                {submitting ? "Saving listing..." : "Save Listing"}
              </button>
              {status && (
                <div
                  className={`alert mt15 ${statusType === "success" ? "alert-success" : "alert-danger"}`}
                  role="alert"
                  aria-live="polite"
                >
                  {status}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddListingForm;
