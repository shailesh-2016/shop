import React, { useEffect, useState } from "react";
import axios from "axios";
import Arrival from "./Group-card";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/category");
      console.log("Fetched Categories:", res.data);
      setCategories(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching categories", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <div className="container my-5">
        <div className="text-center mb-4">
          <h1 className="fw-bold">Browse Categories</h1>
          <p className="text-muted">Discover our exquisite collection by category</p>
        </div>

        {loading ? (
          <p className="text-center">Loading categories...</p>
        ) : (
          <div className="row g-4">
            {categories?.map((item, index) => (
              <div key={index} className="col-6 col-sm-4 col-md-4 col-lg-2">
                <div className="category-card text-center  p-2 rounded-3 bg-white h-100 hover-effect">
                  <img
                    src={item.cat_image}
                    alt={item.cat_name}
                    className="img-fluid rounded category-img mb-2"
                    style={{ height: "100px", objectFit: "cover" }}
                  />
                  <p className="mb-0 fw-medium">{item.cat_name}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Arrival />
    </>
  );
};

export default Category;
