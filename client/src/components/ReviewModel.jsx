// src/components/ReviewModal.jsx
import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Star } from "lucide-react";

const ReviewModal = ({ show, handleClose, reviewForm, setReviewForm, handleReviewSubmit }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body className="text-center p-4">
        <div className="d-flex justify-content-center mb-3">
          {[1, 2, 3, 4, 5].map((val) => (
            <Star
              key={val}
              size={32}
              color={val <= reviewForm.rating ? "#9b51e0" : "#ccc"}
              fill={val <= reviewForm.rating ? "#9b51e0" : "none"}
              style={{ cursor: "pointer" }}
              onClick={() => setReviewForm({ ...reviewForm, rating: val })}
            />
          ))}
        </div>

        <Form onSubmit={handleReviewSubmit}>
          <Form.Group className="mb-3 text-start">
            <Form.Label className="fw-semibold">Feedback*</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Write Your feedback"
              value={reviewForm.comment}
              onChange={(e) =>
                setReviewForm({ ...reviewForm, comment: e.target.value })
              }
              required
            />
          </Form.Group>

          <Button
            type="submit"
            className="w-100"
            style={{ backgroundColor: "#9b51e0", border: "none" }}
          >
            Save
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ReviewModal;
