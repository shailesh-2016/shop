import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CategoryGrid = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/category", {
        withCredentials: true,
      });
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategoryClick = (id) => {
    navigate(`/categorypr/${id}`);
  };

  if (loading) {
    return <div className="text-center py-5">Loading categories...</div>;
  }

  return (
    <div className="container py-5">
      <h3 className="fw-bold">Browse Categories</h3>
      <p className="text-muted">Home / Category</p>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4 mt-3">
        {categories.map((cat) => (
          <div className="col" key={cat._id}>
            <div
              className="position-relative rounded overflow-hidden"
              style={{ height: "220px", cursor: "pointer" }}
              onClick={() => handleCategoryClick(cat._id)}
            >
              <img
                src={cat.cat_image} // ✅ ensures correct URL
                alt={cat.cat_name}
                className="w-100 h-100"
                style={{ objectFit: "cover" }}
              />
              <div
                className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center"
                style={{
                  background: "rgba(0, 0, 0, 0.4)",
                  color: "white",
                  textAlign: "center",
                }}
              >
                <h5 className="fw-bold mb-1">{cat.cat_name}</h5>
                <p className="mb-0 small">42 Products</p> {/* 👉 You can replace this with actual product count later */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;
