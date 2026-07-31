"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const AddListingFormGeneral = () => {
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

  const generalCategoryOptions = [
    { value: "Processed Food Items", label: "Processed Food Items" },
    { value: "Dry Goods & Spices", label: "Dry Goods & Spices" },
    { value: "Household & Daily Essentials", label: "Household & Daily Essentials" },
    { value: "Industrial Raw Materials", label: "Industrial Raw Materials" },
  ];

  const [formData, setFormData] = useState({
    category: "species",
    bodyType: categoryBodyTypeMap["species"],
    title: "",
    productCategory: "Processed Food Items",
    packagingType: "",
    orderScale: "",
    minimumOrderQuantity: "",
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

  const handleImageUpload = (e) => setImageFiles(Array.from(e.target.files || []));

  const validate = () => {
    const v = {};
    if (!formData.title?.trim()) v.title = "Listing title is required.";
    if (!formData.productCategory?.trim()) v.productCategory = "Product category is required.";
    if (!formData.packagingType?.trim()) v.packagingType = "Packaging type is required.";
    if (!formData.minimumOrderQuantity?.trim()) v.minimumOrderQuantity = "Minimum order quantity is required.";
    if (!formData.price || Number(formData.price) <= 0) v.price = "Price must be greater than 0.";
    if (!formData.description?.trim()) v.description = "Description is required.";
    return v;
  };

  const clearForm = () => {
    setFormData({ category: "species", title: "", productCategory: "Processed Food Items", packagingType: "", orderScale: "", minimumOrderQuantity: "", price: "", description: "" });
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
      let response;
      const useMultipart = imageFiles.length > 0;
      if (useMultipart) {
        const fd = new FormData();
        fd.append("category", formData.category || "species");
        fd.append("bodyType", categoryBodyTypeMap[formData.category] || formData.bodyType || "General");
        fd.append("title", formData.title || "New Listing");
        fd.append("productCategory", formData.productCategory || "");
        fd.append("packagingType", formData.packagingType || "");
        fd.append("orderScale", formData.orderScale || "");
        fd.append("minimumOrderQuantity", formData.minimumOrderQuantity || "");
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
      setStatus("Saved — redirecting to species listing...");
      // Redirect to homepage filtered by species (and featured if set)
      const query = featured ? "?category=species&featured=1" : "?category=species";
      router.push(`/${query}`);
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
          <label className="form-label">Product Category <span className="text-danger">*</span></label>
          <select name="productCategory" value={formData.productCategory} onChange={handleChange} className={`form-select ${errors.productCategory ? 'is-invalid' : ''}`}>
            {generalCategoryOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          {errors.productCategory && <div className="text-danger mt15">{errors.productCategory}</div>}
        </div>

        <div className="col-sm-6 col-md-4">
          <label className="form-label">Packaging Type <span className="text-danger">*</span></label>
          <input name="packagingType" value={formData.packagingType} onChange={handleChange} className={`form-control ${errors.packagingType ? 'is-invalid' : ''}`} />
          {errors.packagingType && <div className="text-danger mt15">{errors.packagingType}</div>}
        </div>

        <div className="col-sm-6 col-md-4">
          <label className="form-label">Order Scale</label>
          <input name="orderScale" value={formData.orderScale} onChange={handleChange} className="form-control" />
        </div>

        <div className="col-sm-6 col-md-4">
          <label className="form-label">Minimum Order Quantity <span className="text-danger">*</span></label>
          <input name="minimumOrderQuantity" value={formData.minimumOrderQuantity} onChange={handleChange} className={`form-control ${errors.minimumOrderQuantity ? 'is-invalid' : ''}`} />
          {errors.minimumOrderQuantity && <div className="text-danger mt15">{errors.minimumOrderQuantity}</div>}
        </div>

        <div className="col-sm-6 col-md-4">
          <label className="form-label"> Price (¥) <span className="text-danger">*</span></label>
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

export default AddListingFormGeneral;
