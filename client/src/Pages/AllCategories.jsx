import React from "react";
import img5 from "../assets/image/img-5.jpg";


const categories = [
  "Rings",
  "Earring",
  "Necklaces",
  "Bracelets",
  "Bangles",
  "Pendants",
  "Chains",
  "Anklets",
];

const CategoryGrid = () => {
  return (
    <div className="container py-5">
      <h3 className="fw-bold">Browse Categories</h3>
      <p className="text-muted">Home / Category</p>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4 mt-3">
        {categories.map((cat, index) => (
          <div className="col" key={index}>
            <div
              className="position-relative rounded overflow-hidden"
              style={{ height: "220px", cursor: "pointer" }}
            >
              <img
                src={img5}
                alt={cat}
                className="w-100 h-100"
                style={{ objectFit: "cover" }}
              />
              <div
                className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center"
                style={{
                  background: "rgba(0,0,0,0.4)",
                  color: "white",
                  textAlign: "center",
                }}
              >
                <h5 className="fw-bold mb-1">{cat}</h5>
                <p className="mb-0 small">42 Product</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;
