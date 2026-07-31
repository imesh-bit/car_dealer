"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const AddListingFormAutoPart = () => {
  const router = useRouter();

  const categoryBodyTypeMap = {
    automobile: "Cars",
    "auto-part": "Auto Parts",
    species: "General",
  };

  const categoryOptions = [
    { value: "automobile", label: "Automobile" },
    { value: "auto-part", label: "Auto Part" },
    { value: "species", label: "General" },
  ];

  const autoPartCategoryOptions = [
    { value: "Engine", label: "Engine" },
    { value: "Cooling", label: "Cooling" },
    { value: "Electrical", label: "Electrical" },
    { value: "Brakes", label: "Brakes" },
    { value: "Suspension", label: "Suspension" },
  ];

  const [formData, setFormData] = useState({
    category: "auto-part",
    bodyType: categoryBodyTypeMap["auto-part"],
    title: "",
    partCategory: "Engine",
    brand: "",
    price: "",
    description: "",
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [featured, setFeatured] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({
      ...p,
      [name]: value,
      ...(name === "category" ? { bodyType: categoryBodyTypeMap[value] || p.bodyType } : {}),
    }));
    setErrors((p) => ({ ...p, [name]: undefined }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || []);
    setImageFiles(files);
  };

  const validate = () => {
    const v = {};
    if (!formData.title?.trim()) v.title = "Listing title is required.";
    if (!formData.partCategory?.trim()) v.partCategory = "Part category is required.";
    if (!formData.brand?.trim()) v.brand = "Brand is required.";
    if (!formData.price || Number(formData.price) <= 0) v.price = "Price must be greater than 0.";
    if (!formData.description?.trim()) v.description = "Description is required.";
    return v;
  };

  const clearForm = () => {
    setFormData({ category: "auto-part", title: "", partCategory: "Engine", brand: "", price: "", description: "" });
    setImageFiles([]);
    setFeatured(false);
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus("");
    const v = validate();
    if (Object.keys(v).length) {
      setErrors(v);
      setStatus("Please fix the highlighted fields.");
      setSubmitting(false);
      return;
    }

    try {
      const useMultipart = imageFiles.length > 0;
      let response;
      if (useMultipart) {
        const fd = new FormData();
        fd.append("category", formData.category || "auto-part");
        fd.append("bodyType", categoryBodyTypeMap[formData.category] || formData.bodyType || "Auto Parts");
        fd.append("title", formData.title || "New Listing");
        fd.append("partCategory", formData.partCategory || "");
        fd.append("brand", formData.brand || "");
        fd.append("price", String(Number(formData.price) || 0));
        fd.append("description", formData.description || "");
        fd.append("featured", featured ? "1" : "0");
        imageFiles.forEach((f) => fd.append("images", f));
        response = await fetch("/api/listings", { method: "POST", body: fd });
      } else {
        const payload = {
          ...formData,
          featured,
          bodyType: categoryBodyTypeMap[formData.category] || formData.bodyType,
        };
        response = await fetch("/api/listings", { method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      }

      const result = await response.json().catch(() => null);
      if (!response.ok) throw new Error(result?.message || "Save failed");
      setStatus("Saved — redirecting...");
      // For autoparts go to listing detail
      router.push(`/listing-single-v1/${result.id}`);
      clearForm();
    } catch (err) {
      console.error(err);
      setStatus(err.message || "Unable to save listing.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="contact_form">
      {status && <div className="alert alert-danger">{status}</div>}
      <div className="row">
        <div className="col-sm-6 col-md-4">
          <label className="form-label">Listing Title <span className="text-danger">*</span></label>
          <input name="title" value={formData.title} onChange={handleChange} className={`form-control ${errors.title ? 'is-invalid' : ''}`} />
          {errors.title && <div className="text-danger mt15">{errors.title}</div>}
        </div>
        <div className="col-sm-6 col-md-4">
          <label className="form-label">Part Category <span className="text-danger">*</span></label>
          <select name="partCategory" value={formData.partCategory} onChange={handleChange} className={`form-select ${errors.partCategory ? 'is-invalid' : ''}`}>
            {autoPartCategoryOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          {errors.partCategory && <div className="text-danger mt15">{errors.partCategory}</div>}
        </div>
        <div className="col-sm-6 col-md-4">
          <label className="form-label">Brand <span className="text-danger">*</span></label>
          <input name="brand" value={formData.brand} onChange={handleChange} className={`form-control ${errors.brand ? 'is-invalid' : ''}`} />
          {errors.brand && <div className="text-danger mt15">{errors.brand}</div>}
        </div>

        <div className="col-sm-6 col-md-4">
          <label className="form-label">Price (¥)<span className="text-danger">*</span></label>
          <input name="price" type="number" value={formData.price} onChange={handleChange} className={`form-control ${errors.price ? 'is-invalid' : ''}`} />
          {errors.price && <div className="text-danger mt15">{errors.price}</div>}
        </div>

        <div className="col-lg-12">
          <label className="form-label">Description <span className="text-danger">*</span></label>
          <textarea name="description" rows={4} value={formData.description} onChange={handleChange} className={`form-control ${errors.description ? 'is-invalid' : ''}`} />
          {errors.description && <div className="text-danger mt15">{errors.description}</div>}
        </div>

        <div className="col-lg-12">
          <label className="form-label">Upload Images</label>
          <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="form-control" />
        </div>

        <div className="col-lg-12 mt15">
          <label className="form-check-label">
            <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} className="form-check-input ms-2" />
            <span className="ms-2">Mark as featured listing</span>
          </label>
        </div>

        <div className="col-lg-12 mt20">
          <button type="submit" className="btn btn-thm" disabled={submitting}>{submitting ? 'Saving...' : 'Save Listing'}</button>
        </div>
      </div>
    </form>
  );
};

export default AddListingFormAutoPart;
