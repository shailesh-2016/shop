import React from "react";
import top from "../assets/image/top-img.jpg";
import Category from "./Category";

const Home = () => {
  return (
    <>
      <div className="home-img">
        <div className="container-fluid p-0">
          <img src={top} alt="Top" className="img-fluid w-100 home-banner" />
        </div>
      </div>

      <Category />
    </>
  );
};

export default Home;
