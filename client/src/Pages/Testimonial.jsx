import React from "react";
import { Star } from "lucide-react";
import img6 from "../assets/image/img-6.jpg";
import KukuJewelsSection from "./Jewels";


const TestimonialCard = ({ rating, text, name, role }) => {
  return (
    <div className="card border-light shadow-sm p-3">
      <div className="mb-2 text-warning">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={18} fill={i < rating ? "#facc15" : "none"} />
        ))}
      </div>
      <p className="text-muted" style={{ fontSize: "0.95rem" }}>{text}</p>
      <div className="d-flex align-items-center mt-3">
        <img
          src={img6}
          alt={name}
          className="rounded-circle me-2"
          width="40"
          height="40"
        />
        <div>
          <h6 className="mb-0">{name}</h6>
          <small className="text-muted">{role}</small>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const reviews = [
    {
      rating: 4,
      text: "The craftsmanship of my gold bracelet is exceptional. The attention to detail and the quality of the gold is exactly what I was looking for. Will definitely shop again!",
      name: "Sarah Johnson",
      role: "Loyal Customer",
    },
    {
      rating: 4,
      text: "The craftsmanship of my gold bracelet is exceptional. The attention to detail and the quality of the gold is exactly what I was looking for. Will definitely shop again!",
      name: "Sarah Johnson",
      role: "Loyal Customer",
    },
    {
      rating: 4,
      text: "The craftsmanship of my gold bracelet is exceptional. The attention to detail and the quality of the gold is exactly what I was looking for. Will definitely shop again!",
      name: "Sarah Johnson",
      role: "Loyal Customer",
    },
  ];

  return (
    <div className="container my-5">
      <h4 className="fw-bold mb-1">Customer Love</h4>
      <p className="text-muted mb-4">
        Real reviews, happy customers! See what they love most.
      </p>
      <div className="row g-3">
        {reviews.map((review, i) => (
          <div className="col-md-4" key={i}>
            <TestimonialCard {...review} />
          </div>
        ))}
      </div>
      <KukuJewelsSection></KukuJewelsSection>
    </div>
    
  );
};

export default Testimonials;
