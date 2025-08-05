// AddBanner.jsx
import React, { useState } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CFormInput,
  CButton,
} from "@coreui/react";
import axios from "axios";

// ✅ Banner API URL from .env
const BANNER_API_URL = import.meta.env.VITE_BASE_URL_BANNER;

const AddBanner = () => {
  const [link, setLink] = useState("");
  const [bannerImage, setBannerImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!bannerImage) {
      return alert("❗ Banner Image is required");
    }

    const formData = new FormData();
    formData.append("link", link);
    formData.append("bannerImage", bannerImage);

    try {
      const res = await axios.post(BANNER_API_URL, formData);
      alert("✅ Banner added successfully!");
      setLink("");
      setBannerImage(null);
    } catch (error) {
      console.error("❌ Banner Upload Error:", error);
      alert("❌ Failed to add banner");
    }
  };

  return (
    <div className="container mt-4">
      <CCard className="p-3">
        <CCardHeader className="h4">🖼️ Add New Banner</CCardHeader>
        <CCardBody>
          <CForm onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="mb-3">
              <CFormInput
                type="text"
                label="Banner Link (optional)"
                placeholder="e.g. /sale or https://example.com"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <CFormInput
                type="file"
                label="Upload Banner Image"
                accept="image/*"
                onChange={(e) => setBannerImage(e.target.files[0])}
              />
            </div>

            <CButton type="submit" color="primary">
              Add Banner
            </CButton>
          </CForm>
        </CCardBody>
      </CCard>
    </div>
  );
};

export default AddBanner;
