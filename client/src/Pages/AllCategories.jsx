import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./allCat.css";


const CategoryGrid = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
      const res = await axios.get(import.meta.env.VITE_BASE_URL_CATEGORY, {
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
    <h3 className="fw-bold mb-1">🗂️ Browse Categories</h3>
    <p className="text-muted mb-4">Home / Categories</p>

    {categories.length === 0 ? (
      <div className="text-center text-muted py-5">No categories available.</div>
    ) : (
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
        {categories.map((cat) => (
          <div className="col" key={cat._id}>
            <div
              className="category-card position-relative rounded overflow-hidden shadow-sm"
              onClick={() => handleCategoryClick(cat._id)}
              style={{
                height: "220px",
                cursor: "pointer",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
            >
              <img
                src={cat.cat_image}
                alt={cat.cat_name}
                className="w-100 h-100 category-image"
                style={{ objectFit: "cover", transition: "transform 0.3s ease" }}
              />
              <div
                className="category-overlay position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center"
              >
                <h5 className="fw-bold mb-1 text-white text-shadow">{cat.cat_name}</h5>
                <p className="mb-0 small text-white text-shadow">42 Products</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

};

export default CategoryGrid;
