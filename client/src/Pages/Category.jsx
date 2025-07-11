import React, { useEffect, useState } from "react";
import axios from "axios";
import Arrival from "./Group-card";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import "../Pages/category.css";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(import.meta.env.VITE_BASE_URL_CATEGORY);
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
          <p className="text-muted">
            Discover our exquisite collection by category
          </p>
        </div>

        {loading ? (
          <p className="text-center">Loading categories...</p>
        ) : (
          <Swiper
            spaceBetween={20}
            slidesPerView={6}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            breakpoints={{
              320: { slidesPerView: 2 },
              576: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              992: { slidesPerView: 5 },
              1200: { slidesPerView: 6 },
            }}
          >
            {categories.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="category-card text-center p-2 rounded-3 bg-white h-100 hover-effect">
                  <img
                    src={item.cat_image}
                    alt={item.cat_name}
                    className="img-fluid rounded category-img mb-2"
                    style={{
                      width: "100%",
                      height: "120px",
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />

                  <p className="mb-0 fw-medium">{item.cat_name}</p>
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
