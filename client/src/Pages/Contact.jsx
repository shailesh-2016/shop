import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";

const ContactUs = () => {
  return (
    <div className="container py-5">
      <h3 className="fw-bold">Contact Us</h3>
      <p className="text-muted">Home / Contact Us</p>
      <p>Get in touch with our team for inquiries about our products and services.</p>

      <div className="row mt-5">
        <div className="col-md-6">
          <form className="d-flex flex-column gap-3">
            <input
              type="text"
              placeholder="Your Name"
              className="form-control"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="form-control"
            />
            <textarea
              placeholder="Your Message"
              className="form-control"
              rows={5}
            ></textarea>
            <button className="btn btn-primary w-100" type="submit">
              Send Message
            </button>
          </form>
        </div>

        <div className="col-md-6 mt-4 mt-md-0">
          <h5 className="fw-bold mb-3">Get in touch</h5>

          <div className="d-flex gap-3 mb-3">
            <span className="bg-light p-3 rounded-circle">
              <Phone size={20} />
            </span>
            <span className="bg-light p-3 rounded-circle">
              <Mail size={20} />
            </span>
            <span className="bg-light p-3 rounded-circle">
              <MapPin size={20} />
            </span>
          </div>

          <div className="ratio ratio-4x3 border rounded shadow-sm">
            <iframe
              src="https://maps.google.com/maps?q=Ahmedabad&t=&z=13&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              title="map"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
