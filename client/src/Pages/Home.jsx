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
        const res = await axios.get("http://localhost:8000/api/banner"); // ✅ update if different
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
        <div className="banner-loading-placeholder d-flex justify-content-center align-items-center bg-light-subtle" style={{ height: "570px" }}>
          <div className="spinner-border text-primary-custom" role="status">
            <span className="visually-hidden">Loading banners...</span>
          </div>
          <p className="ms-3 text-muted">Loading stunning visuals...</p>
        </div>
      ) : banners.length === 0 ? (
        <div className="banner-error-message text-center py-5 bg-light-subtle" style={{ height: "570px", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <h4 className="text-muted mb-3">No banners found</h4>
          <p className="text-secondary">Please add banners to display them here.</p>
        </div>
      ) : (
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          interval={3500} // Slightly increased interval for more comfortable viewing
          transitionTime={1000} // Smoother transition
          swipeable
          emulateTouch
          className="main-hero-carousel" // Custom class for styling
          renderIndicator={(onClickHandler, isSelected, index, label) => {
            if (isSelected) {
              return (
                <li
                  className="custom-indicator selected"
                  aria-label={`Selected: ${label} ${index + 1}`}
                  title={`Selected: ${label} ${index + 1}`}
                />
              );
            }
            return (
              <li
                className="custom-indicator"
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
            <div key={idx} className="banner-slide">
              <img
                src={banner.image}
                alt={banner.title || `Banner image ${idx + 1}`}
                className="banner-image"
                style={{ height: "570px", objectFit: "cover", width: "100%" }}
              />
              {banner.title && (
                <div className="legend custom-legend"> {/* Add custom-legend class */}
                  <h3>{banner.title}</h3>
                  {banner.description && <p>{banner.description}</p>} {/* Assuming you might have a description field */}
                  <button className="btn btn-light-custom mt-3">Shop Now</button> {/* Custom styled button */}
                </div>
              )}
            </div>
          ))}
        </Carousel>
      )}

      <Category /> {/* Category component will appear below the carousel */}
    </>
  );
};

export default Home;