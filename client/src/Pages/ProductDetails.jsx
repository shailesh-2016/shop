import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Tab,
  Tabs,
  Card,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cart-slice/cartSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReviewModal from "../components/ReviewModel";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [material, setMaterial] = useState("");
  const [size, setSize] = useState("");
  const [reviews, setReviews] = useState([]);
  const [showReviewModal, setShowReviewModal] = useState(false);

  const [reviewForm, setReviewForm] = useState({
    userName: "",
    rating: 5,
    comment: "",
  });

  const user = useSelector((state) => state.auth.user);
  const userId = user?.id;

  // Load product and reviews
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/products/${id}`);
        setProduct(res.data.product);
      } catch (err) {
        toast.error("Failed to load product");
      }
    };

    const fetchReviews = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/products/${id}/review`);
        setReviews(res.data.reviews);
      } catch (err) {
        toast.error("Failed to load reviews");
      }
    };

    fetchProduct();
    fetchReviews();
  }, [id]);

  useEffect(() => {
    if (user?.name) {
      setReviewForm((prev) => ({ ...prev, userName: user.name }));
    }
  }, [user]);

  const handleAddToCart = () => {
    if (!userId) {
      toast.warn("Please login to add to cart");
      return navigate("/login");
    }
    if (!size || !material) return toast.error("Select size & material");

    const cartItem = {
      userId,
      productId: id,
      quantity: qty,
      material,
      size,
    };

    dispatch(addToCart(cartItem))
      .unwrap()
      .then(() => {
        toast.success("Added to cart ✅");
        navigate("/cart");
      })
      .catch(() => toast.error("Failed to add to cart"));
  };

const handleReviewSubmit = async () => {
  const reviewData = {
    userId: user?._id,
    name: user?.name,
    rating: parseInt(rating),  // ✅ Make sure it's a Number
    comment,
  };

  try {
    const res = await axios.post(
      `http://localhost:8000/api/products/${id}/review`,
      reviewData
    );
    console.log(res.data);
  } catch (err) {
    console.error("❌ Review error", err.response?.data || err.message);
  }
};


  if (!product) return <p className="text-center mt-5">Loading...</p>;

  return (
    <Container className="my-5">
      <Row>
        <Col md={6}>
          <img
            src={product.product_images[0]}
            alt="Main"
            className="img-fluid border rounded mb-3"
            style={{ maxHeight: "300px", objectFit: "cover" }}
          />
          <div className="d-flex gap-2 flex-wrap">
            {product.product_images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`thumb-${index}`}
                className="img-thumbnail"
                style={{ height: "60px", width: "60px", objectFit: "cover" }}
              />
            ))}
          </div>
        </Col>

        <Col md={6}>
          <h4>{product.product_name}</h4>
          <p>⭐ {product.rating} ({product.reviews} Reviews)</p>
          <h5 className="text-primary fw-bold">₹{product.price.toFixed(2)}</h5>
          <p>{product.product_description}</p>

          {/* Material */}
          <Form.Group className="mb-3">
            <Form.Label>Material</Form.Label>
            {["18K Gold", "22K Gold", "Rose Gold"].map((mat) => (
              <Form.Check
                inline
                key={mat}
                label={mat}
                name="material"
                type="radio"
                onChange={() => setMaterial(mat)}
                checked={material === mat}
              />
            ))}
          </Form.Group>

          {/* Size */}
          <Form.Group className="mb-3">
            <Form.Label>Size</Form.Label>
            <div className="d-flex gap-2 flex-wrap">
              {["XS", "S", "M", "L", "XL"].map((sz) => (
                <Button
                  key={sz}
                  variant={size === sz ? "dark" : "outline-secondary"}
                  size="sm"
                  onClick={() => setSize(sz)}
                >
                  {sz}
                </Button>
              ))}
            </div>
          </Form.Group>

          {/* Quantity */}
          <Form.Group className="mb-3">
            <Form.Label>Quantity</Form.Label>
            <div className="d-flex align-items-center gap-2">
              <Button onClick={() => setQty(qty > 1 ? qty - 1 : 1)}>-</Button>
              <span>{qty}</span>
              <Button onClick={() => setQty(qty + 1)}>+</Button>
            </div>
          </Form.Group>

          <div className="d-flex gap-3 mt-4">
            <Button className="w-50" onClick={handleAddToCart}>
              ADD TO CART
            </Button>
            <Button variant="outline-secondary" className="w-50">
              Buy Now
            </Button>
          </div>
        </Col>
      </Row>

      {/* Tabs */}
      <Tabs defaultActiveKey="description" className="mt-5">
        <Tab eventKey="description" title="Description">
          <p className="mt-3">{product.product_description}</p>
        </Tab>

        <Tab eventKey="reviews" title={`Reviews (${reviews.length})`}>
          <Row className="mt-4">
            <Col md={6}>
              <h5>Write a Review</h5>
              <Button
                variant="primary"
                onClick={() => {
                  if (!userId) {
                    toast.warn("Please login to write a review");
                    navigate("/login");
                  } else {
                    setShowReviewModal(true);
                  }
                }}
              >
                + Add Review
              </Button>
            </Col>

            <Col md={6}>
              <h5 className="mb-3">Customer Reviews</h5>
              {reviews.length === 0 ? (
                <p>No reviews yet</p>
              ) : (
                reviews.map((rev, i) => (
                  <Card key={i} className="mb-3">
                    <Card.Body>
                      <Card.Title>{rev.name}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        ⭐ {rev.rating} -{" "}
                        {new Date(rev.createdAt).toLocaleDateString()}
                      </Card.Subtitle>
                      <Card.Text>{rev.comment}</Card.Text>
                    </Card.Body>
                  </Card>
                ))
              )}
            </Col>
          </Row>
        </Tab>
      </Tabs>

      {/* Review Modal */}
      <ReviewModal
        show={showReviewModal}
        handleClose={() => setShowReviewModal(false)}
        reviewForm={reviewForm}
        setReviewForm={setReviewForm}
        handleReviewSubmit={handleReviewSubmit}
      />

      <ToastContainer position="top-right" autoClose={2500} theme="colored" />
    </Container>
  );
};

export default ProductDetail;
