import React, { useEffect, useState } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CSpinner,
} from "@coreui/react";
import axios from "axios";

const ViewBanners = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBanners = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/banner");
      setBanners(res.data.banners || []);
      setLoading(false);
    } catch (error) {
      console.error("❌ Error fetching banners:", error);
      setLoading(false);
    }
  };

  // 🔴 Delete Banner Function
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this banner?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8000/api/banner/${id}`);
      setBanners((prev) => prev.filter((banner) => banner._id !== id));
      alert("✅ Banner deleted successfully");
    } catch (error) {
      console.error("❌ Delete error:", error);
      alert("Failed to delete banner");
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  return (
    <div className="container mt-4">
      <CCard>
        <CCardHeader className="h4">🎯 All Banners</CCardHeader>
        <CCardBody>
          {loading ? (
            <CSpinner color="primary" />
          ) : banners.length === 0 ? (
            <p>No banners found</p>
          ) : (
            <CTable striped bordered hover responsive>
              <CTableHead color="dark">
                <CTableRow>
                  <CTableHeaderCell>#</CTableHeaderCell>
                  <CTableHeaderCell>Title</CTableHeaderCell>
                  <CTableHeaderCell>Image</CTableHeaderCell>
                  <CTableHeaderCell>Link</CTableHeaderCell>
                  <CTableHeaderCell>Created</CTableHeaderCell>
                  <CTableHeaderCell>Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {banners.map((banner, index) => (
                  <CTableRow key={banner._id}>
                    <CTableDataCell>{index + 1}</CTableDataCell>
                    <CTableDataCell>{banner.title}</CTableDataCell>
                    <CTableDataCell>
                      <img
                        src={banner.image}
                        alt="Banner"
                        width="120"
                        height="60"
                        style={{ objectFit: "cover", borderRadius: "4px" }}
                      />
                    </CTableDataCell>
                    <CTableDataCell>{banner.link || "--"}</CTableDataCell>
                    <CTableDataCell>
                      {new Date(banner.createdAt).toLocaleDateString()}
                    </CTableDataCell>
                    <CTableDataCell>
                      <CButton color="info" size="sm" className="me-2">
                        Edit
                      </CButton>
                      <CButton
                        color="danger"
                        size="sm"
                        onClick={() => handleDelete(banner._id)}
                      >
                        Delete
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          )}
        </CCardBody>
      </CCard>
    </div>
  );
};

export default ViewBanners;
