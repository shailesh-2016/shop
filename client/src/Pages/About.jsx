import React from "react";

import img2 from "../assets/image/img-2.jpg";

import { Star, Gem, Leaf } from "lucide-react";

const excellence = [
  {
    id: 1,
    title: "Quality Materials",
    icon: <Star size={28} color="#9d4be0" />,
    desc: "We use only the finest 18K and 22K gold, ethically sourced gemstones, and diamonds in all our creations.",
  },
  {
    id: 2,
    title: "Master Craftsmanship",
    icon: <Gem size={28} color="#b983ff" />,
    desc: "Our skilled artisans combine traditional techniques with modern innovation to create jewelry of exceptional quality.",
  },
  {
    id: 3,
    title: "Ethical Practices",
    icon: <Leaf size={28} color="#b983ff" />,
    desc: "We are committed to responsible sourcing and sustainable practices throughout our supply chain.",
  },
];

const AboutUs = () => {
  return (
    <div className="container py-5">
      <h3 className="fw-bold">About Us</h3>
      <p className="text-muted">Home / About</p>

      <div className="row align-items-center my-5">
        <div className="col-md-6">
          <img
            src={img2}
            alt="about"
            className="img-fluid rounded shadow"
          />
        </div>
        <div className="col-md-6 mt-4 mt-md-0">
          <h4 className="fw-bold mb-3">Our Story</h4>
          <p>
            Founded in 2010, KUKU JEWELS began as a small family–owned business
            with a passion for crafting exquisite gold jewelry. What started as
            a modest workshop has now grown into a renowned brand synonymous
            with quality, craftsmanship, and timeless elegance.
          </p>
          <p>
            Our founder, Amelia Kuku, believed that jewelry should not only be
            beautiful but also tell a story. This philosophy continues to guide
            our design process, ensuring that each piece we create carries
            meaning and emotion.
          </p>
        </div>
      </div>

      <div className="text-center my-5">
        <h4 className="fw-bold">Our Commitment to Excellence</h4>

        <div className="row row-cols-1 row-cols-md-3 g-4 mt-4">
          {excellence.map((item) => (
            <div className="col" key={item.id}>
              <div className="border rounded p-4 h-100 bg-white">
                <div className="text-center mb-2">
                  <div
                    className="mx-auto rounded-circle bg-light d-flex align-items-center justify-content-center"
                    style={{ width: "50px", height: "50px" }}
                  >
                    <span className="fw-bold fs-5 text-purple">{item.id}</span>
                  </div>
                </div>
                <h6 className="fw-bold text-center">{item.title}</h6>
                <p className="small text-muted text-center">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-5">
        <h4 className="fw-bold">Our Vision</h4>
        <p className="text-muted w-75 mx-auto mt-3">
          At KUKU JEWELS, we envision a world where jewelry is not just an
          accessory but a meaningful expression of one’s personality and
          values. We strive to create pieces that become cherished heirlooms,
          passed down through generations, carrying with them stories and
          memories.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
