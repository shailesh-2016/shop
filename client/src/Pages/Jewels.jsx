import React from "react";
import { ShieldCheck, Gem, Repeat, CreditCard } from "lucide-react";
import img1 from "../assets/image/img-1.jpg";
import img2 from "../assets/image/img-2.jpg";
import img3 from "../assets/image/img-3.jpg";
import img4 from "../assets/image/img-4.jpg";
import img5 from "../assets/image/img-5.jpg";
import img6 from "../assets/image/img-6.jpg";
import "../Pages/jevel.css";



const features = [
  {
    icon: <ShieldCheck size={32} color="#b983ff" />,
    title: "Premium Quality",
    desc: "100% certified gold jewelry",
  },
  {
    icon: <Gem size={32} color="#b983ff" />,
    title: "Unique Designs",
    desc: "Handcrafted by skilled artisans",
  },
  {
    icon: <Repeat size={32} color="#b983ff" />,
    title: "Lifetime Warranty",
    desc: "On all our jewelry pieces",
  },
  {
    icon: <CreditCard size={32} color="#b983ff" />,
    title: "Secure Payments",
    desc: "Multiple payment options",
  },
];

const images = [
 img1,img2,img3,img4,img5,img6
];

const KukuJewelsSection = () => {
  return (
    <div className="bg-light py-5">
      <div className="container text-center">
        <h3 className="fw-bold mb-2">Why Choose Kuku Jewels</h3>
        <p className="text-muted mb-5">
          Unique designs, premium quality—discover the beauty of KUKU JEWELS.
        </p>

        <div className="row g-4">
          {features.map((item, i) => (
            <div className="col-md-3 col-6" key={i}>
              <div className="border rounded p-4 bg-white h-100">
                <div className="mb-3">{item.icon}</div>
                <h6 className="fw-bold">{item.title}</h6>
                <p className="text-muted small">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container text-center mt-5">
        <h4 className="fw-bold">Follow Us on Instagram</h4>
        <p className="text-muted">@kukujewels</p>

        <div className="d-flex flex-wrap justify-content-center gap-3 mt-4">
  {images.map((src, i) => (
    <img
      key={i}
      src={src}
      alt={`jewel-${i}`}
      style={{
        width: "180px",
        height: "170px",
        objectFit: "cover",
        borderRadius: "8px",
      }}
    />
  ))}
</div>


        <button className="btn btn-outline-primary mt-4 px-4">View Instagram</button>
      </div>
    </div>
  );
};

export default KukuJewelsSection;
