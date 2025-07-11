import React from 'react'
import festive from "../assets/image/img-page.jpg";
import BestSellers from './BestSeller';


const Festive = () => {
  return (
     <div className="container my-4">
      <div
        className="position-relative rounded-4 overflow-hidden mx-auto"
        style={{ maxWidth: "1000px", height: "400px" }}
      >
        <img
          src={festive}
          alt="Festive Offer"
          className="img-fluid w-100 h-100"
          style={{ objectFit: "cover", borderRadius: "20px" }}
        />

        <div
          className="position-absolute top-50 start-0 translate-middle-y text-white ps-4"
          style={{ maxWidth: "50%" }}
        >
          <h4 className="fw-bold mb-2">Festive Season Special Offer</h4>
          <p className="mb-2" style={{ fontSize: "0.9rem" }}>
            Enjoy up to 20% off on selected gold jewelry pieces
          </p>
          <button className="btn btn-sm btn-light text-dark fw-semibold">
            SHOP THE COLLECTION
          </button>
        </div>
      </div>
      <BestSellers></BestSellers>
    </div>

    
  );
}

export default Festive
