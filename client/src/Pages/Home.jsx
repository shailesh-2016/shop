

import React from "react";
import banner1 from "../assets/image/top-img.jpg";
import banner2 from "../assets/image/slide2.jpg";
import banner3 from "../assets/image/slide3.jpg";
import banner4 from "../assets/image/img-1.jpg";
import Category from "./Category";
import './Home.css'; 

const Home = () => {
  return (
    <>
      {/* 🌟 Hero Carousel */}
<div id="heroCarousel" className="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="2000">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={banner1} className="d-block w-100 banner-img" alt="Banner 1" />
          </div>
          <div className="carousel-item">
            <img src={banner2} className="d-block w-100 banner-img" alt="Banner 2" />
          </div>
          <div className="carousel-item">
            <img src={banner3} className="d-block w-100 banner-img" alt="Banner 3" />
          </div>
          <div className="carousel-item">
            <img src={banner4} className="d-block w-100 banner-img" alt="Banner 4" />
          </div>
        </div>

        {/* Controls */}
        <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>

      {/* 🛒 Category Section */}
      <Category />
    </>
  );
};

export default Home;

