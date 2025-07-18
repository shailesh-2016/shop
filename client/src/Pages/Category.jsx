import React, { useEffect, useState } from "react";
import axios from "axios";
import Arrival from "./Group-card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "../Pages/category.css";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
      const res = await axios.get(import.meta.env.VITE_BASE_URL_CATEGORY);
      setCategories(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`);
  };

  return (
    <>
      <div className="container my-5 category-section">
        <div className="text-center mb-5 section-header">
          <h1 className="fw-bold display-5 mb-3">Explore Our <span className="text-primary-custom">Exquisite Categories</span></h1> {/* Changed to text-primary-custom */}
          <p className="lead text-muted mx-auto">
            Discover a wide range of stunning jewelry, meticulously organized for your convenience. Find your perfect piece with ease!
          </p>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary-custom" role="status"> {/* Changed to text-primary-custom */}
              <span className="visually-hidden">Loading categories...</span>
            </div>
            <p className="mt-3 text-muted">Fetching our beautiful collections...</p>
          </div>
        ) : (
          <Swiper
            spaceBetween={25}
            slidesPerView={6}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            modules={[Autoplay, Pagination, Navigation]}
            className="category-swiper"
            breakpoints={{
              320: {
                slidesPerView: 2,
                spaceBetween: 15,
              },
              576: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
              992: {
                slidesPerView: 5,
                spaceBetween: 25,
              },
              1200: {
                slidesPerView: 6,
                spaceBetween: 25,
              },
            }}
          >
            {categories.map((item) => (
              <SwiperSlide key={item._id}>
                <div
                  className="category-card text-center p-3 rounded-4 bg-white shadow-sm h-100 d-flex flex-column align-items-center justify-content-center hover-effect"
                  onClick={() => handleCategoryClick(item._id)}
                >
                  <img
                    src={item.cat_image}
                    alt={item.cat_name}
                    className="img-fluid rounded-3 category-img mb-3"
                    style={{
                      width: "100%",
                      height: "140px",
                      objectFit: "cover",
                    }}
                  />
                  <p className="mb-0 fw-semibold category-name">{item.cat_name}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      <Arrival />
    </>
  );
};

export default Category;