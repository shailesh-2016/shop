import React, { useEffect, useState } from "react";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Default styles
import "./home.css"; // Custom CSS for Home component
import Category from "./Category";

const Home = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        setLoading(true); // Set loading to true before fetching
const res = await axios.get(import.meta.env.VITE_BASE_URL_BANNER);
        setBanners(res.data.banners || []);
      } catch (err) {
        console.error("❌ Failed to fetch banners:", err);
        // Optionally show a user-friendly error message
      } finally {
        setLoading(false); // Set loading to false after fetch completes
      }
    };

    fetchBanners();
  }, []);

 return (
  <>
    {/* 🌟 Hero Slider (Dynamic) */}
    {loading ? (
      <div
        className="banner-loading-placeholder d-flex flex-column justify-content-center align-items-center bg-light-subtle"
        style={{ height: "570px" }}
      >
        <div className="spinner-border text-primary-custom mb-3" role="status">
          <span className="visually-hidden">Loading banners...</span>
        </div>
        <p className="text-muted fs-5">Loading stunning visuals...</p>
      </div>
    ) : banners.length === 0 ? (
      <div
        className="banner-error-message text-center py-5 bg-light-subtle"
        style={{ height: "570px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}
      >
        <h4 className="text-muted mb-3">No banners found</h4>
        <p className="text-secondary">Please add banners to display them here.</p>
      </div>
    ) : (
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={4000}
        transitionTime={800}
        swipeable
        emulateTouch
        className="main-hero-carousel"
        renderIndicator={(onClickHandler, isSelected, index, label) => {
          return (
            <li
              className={`custom-indicator ${isSelected ? "selected" : ""}`}
              onClick={onClickHandler}
              onKeyDown={onClickHandler}
              value={index}
              key={index}
              role="button"
              tabIndex={0}
              title={`${label} ${index + 1}`}
              aria-label={`${label} ${index + 1}`}
            />
          );
        }}
      >
        {banners.map((banner, idx) => (
          <div key={idx} className="banner-slide position-relative">
            <img
              src={banner.image}
              alt={banner.title || `Banner image ${idx + 1}`}
              className="banner-image w-100"
              style={{
                height: "570px",
                objectFit: "cover",
              }}
            />
            {banner.title && (
              <div className="custom-legend text-light d-flex flex-column align-items-start justify-content-center px-4">
                <h2 className="fw-bold">{banner.title}</h2>
                {banner.description && <p className="mb-3">{banner.description}</p>}
                <button className="btn btn-light-custom mt-2">Shop Now</button>
              </div>
            )}
          </div>
        ))}
      </Carousel>
    )}

    <Category />
  </>
);

};

export default Home;