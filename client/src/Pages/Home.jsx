import React, { useEffect, useState } from "react";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Category from "./Category";

const Home = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/banner"); // ✅ update if different
        setBanners(res.data.banners || []);
      } catch (err) {
        console.error("❌ Failed to fetch banners:", err);
      }
    };

    fetchBanners();
  }, []);

  return (
    <>
      {/* 🌟 Hero Slider (Dynamic) */}
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={3000}
        transitionTime={800}
        swipeable
        emulateTouch
      >
        {banners.map((banner, idx) => (
          <div key={idx}>
            <img
              src={banner.image}
              alt={banner.title}
              style={{ height: "570px", objectFit: "cover" }}
            />
            {banner.title && (
              <p className="legend">{banner.title}</p> // ✅ Optional overlay
            )}
          </div>
        ))}
      </Carousel>

      <Category />
    </>
  );
};

export default Home;
