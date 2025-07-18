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
  Badge, // Added Badge for professional size stock
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cart-slice/cartSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReviewModal from "../components/ReviewModel";
import { FaStar, FaPlus, FaMinus } from "react-icons/fa"; // Icons ke liye
import Slider from "react-slick"; // Image carousel ke liye
import "slick-carousel/slick/slick.css"; // Slider CSS
import "slick-carousel/slick/slick-theme.css"; // Slider theme CSS
import "./productDetails.css"; // Apni custom CSS file import karein

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [material, setMaterial] = useState("");
  const [size, setSize] = useState("");
  const [reviews, setReviews] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [mainImage, setMainImage] = useState(""); 

  const [reviewForm, setReviewForm] = useState({
    userName: "",
    rating: 5,
    comment: "",
  });

  const user = useSelector((state) => state.auth.user);
  const userId = user?.id;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/products/${id}`);
        const productData = res.data.product;
        setProduct(productData);
        setMainImage(productData.product_images[0]); // Set initial main image

        if (productData.category && productData.category._id) {
          fetchRelatedProducts(productData.category._id);
        }
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

  // ✅ Related Products
  const fetchRelatedProducts = async (categoryId) => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/products/category/${categoryId}`
      );
      const filtered = res.data.filter((p) => p._id !== id);
      setRelatedProducts(filtered.slice(0, 4));
    } catch (err) {
      console.error("❌ Related products fetch error", err);
    }
  };

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

    // Check overall out of stock
    if (product?.sizeStock?.every((s) => s.stock === 0)) {
      return toast.error("Product is out of stock");
    }

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

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const reviewData = {
      userId: user?._id,
      name: user?.name,
      rating: Number(reviewForm.rating),
      comment: reviewForm.comment,
    };

    try {
      await axios.post(
        `http://localhost:8000/api/products/${id}/review`,
        reviewData
      );
      toast.success("Review submitted!");
      setShowReviewModal(false);
      setReviewForm({ userName: user.name, rating: 5, comment: "" });
      // Refresh reviews after submission
      const res = await axios.get(`http://localhost:8000/api/products/${id}/review`);
      setReviews(res.data.reviews);
    } catch (err) {
      toast.error("Failed to submit review");
    }
  };

  // Slider settings for related products
  const relatedSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  if (!product) return <p className="text-center mt-5 text-muted">Product loading...</p>;

  return (
    <Container className="my-5 product-detail-page">
      <Row className="g-4">
        {/* Product Images - Left Column */}
        <Col md={6}>
          <div className="main-image-container mb-3">
            <img
              src={mainImage}
              alt={product.product_name}
              className="img-fluid border rounded product-main-image"
            />
          </div>
          <div className="thumbnail-gallery d-flex gap-2 flex-wrap justify-content-center justify-content-md-start">
            {product.product_images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`thumbnail-${index}`}
                className={`img-thumbnail thumbnail-image ${mainImage === img ? 'active-thumbnail' : ''}`}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </Col>

        {/* Product Details - Right Column */}
        <Col md={6} className="product-info-col">
          <h1 className="product-title">{product.product_name}</h1>
          <p className="product-rating">
            <FaStar className="star-icon" /> {product.rating}{" "}
            <span className="text-muted">({reviews.length} Reviews)</span>
          </p>
          <h3 className="product-price">₹{product.price.toFixed(2)}</h3>
          <p className="product-description lead">{product.product_description}</p>

          {product.sizeStock?.every((s) => s.stock === 0) && (
            <p className="text-danger fw-bold fs-5 blink-text">OUT OF STOCK</p>
          )}

          {/* Material Selection */}
          <Form.Group className="mb-4">
            <Form.Label className="fw-bold fs-5 mb-2">Material</Form.Label>
            <div className="d-flex flex-wrap gap-2 material-options">
              {["18K Gold", "22K Gold", "Rose Gold"].map((mat) => (
                <Button
                  key={mat}
                  variant={material === mat ? "dark" : "outline-secondary"}
                  size="sm"
                  onClick={() => setMaterial(mat)}
                  className="material-button"
                >
                  {mat}
                </Button>
              ))}
            </div>
          </Form.Group>

          {/* Size with Stock & Status (Integrated Professional UI from previous answer) */}
          <Form.Group className="mb-4">
            <Form.Label className="fw-bold fs-5 mb-2">Size</Form.Label>
            <div className="d-flex flex-wrap gap-3 product-size-options">
              {product.sizeStock && product.sizeStock.length > 0 ? (
                product.sizeStock.map(({ size: sz, stock }) => (
                  <div key={sz} className="text-center product-size-item">
                    <Button
                      variant={size === sz ? "primary" : "outline-secondary"}
                      size="lg"
                      onClick={() => {
                        if (stock > 0) setSize(sz);
                      }}
                      disabled={stock === 0}
                      className={`position-relative size-button ${stock === 0 ? "out-of-stock" : ""}`}
                    >
                      {sz}
                      {stock === 0 && (
                        <Badge
                          pill
                          bg="danger"
                          className="position-absolute top-0 start-100 translate-middle"
                          aria-label={`${sz} out of stock`}
                        >
                          Out
                        </Badge>
                      )}
                    </Button>
                    <div className="size-stock-info mt-1">
                      {stock === 0 ? (
                        <span className="text-danger fw-semibold">Out of Stock</span>
                      ) : stock < 10 ? (
                        <span className="text-warning fw-semibold">Only {stock} left!</span>
                      ) : (
                        <span className="text-success fw-semibold">In Stock</span>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-danger fw-semibold">Stock info not available</p>
              )}
            </div>
          </Form.Group>

          {/* Quantity */}
          <Form.Group className="mb-4">
            <Form.Label className="fw-bold fs-5 mb-2">Quantity</Form.Label>
            <div className="d-flex align-items-center gap-3 quantity-selector">
              <Button
                variant="outline-secondary"
                size="md"
                onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
                className="qty-button"
              >
                <FaMinus />
              </Button>
              <span className="qty-display fs-5 fw-bold">{qty}</span>
              <Button
                variant="outline-secondary"
                size="md"
                onClick={() => setQty(qty + 1)}
                className="qty-button"
              >
                <FaPlus />
              </Button>
            </div>
          </Form.Group>

          {/* Cart Buttons */}
          <div className="d-grid gap-2 mt-4 add-to-cart-section"> {/* d-grid for full width buttons */}
            <Button
              variant="primary"
              size="lg"
              className="add-to-cart-btn"
              onClick={handleAddToCart}
              disabled={product.sizeStock?.every((s) => s.stock === 0)} // Disable if completely out of stock
            >
              ADD TO CART
            </Button>
            <Button variant="outline-primary" size="lg" className="buy-now-btn">
              BUY NOW
            </Button>
          </div>
        </Col>
      </Row>

      {/* --- */}
      {/* Tabs for Description and Reviews */}
      <Tabs defaultActiveKey="description" className="mt-5 product-detail-tabs">
        <Tab eventKey="description" title="Description">
          <div className="tab-content-area p-4 border border-top-0 rounded-bottom">
            <h5 className="mb-3">Product Description</h5>
            <p className="text-muted">{product.product_description}</p>
          </div>
        </Tab>

        <Tab eventKey="reviews" title={`Reviews (${reviews.length})`}>
          <div className="tab-content-area p-4 border border-top-0 rounded-bottom">
            <Row>
              <Col md={6}>
                <h5 className="mb-3">Share Your Thoughts</h5>
                <Button
                  variant="success"
                  size="lg"
                  className="write-review-btn mb-4"
                  onClick={() => {
                    if (!userId) {
                      toast.warn("Please login to write a review");
                      navigate("/login");
                    } else {
                      setShowReviewModal(true);
                    }
                  }}
                >
                  <FaStar className="me-2" /> Write a Review
                </Button>
              </Col>

              <Col md={6}>
                <h5 className="mb-3">Customer Reviews</h5>
                {reviews.length === 0 ? (
                  <p className="text-muted">No reviews yet. Be the first to share your experience!</p>
                ) : (
                  reviews.map((rev) => (
                    <Card key={rev._id} className="mb-3 review-card shadow-sm">
                      <Card.Body>
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <Card.Title className="mb-0 fs-5">{rev.name}</Card.Title>
                          <Badge bg="info" className="review-rating-badge">
                            <FaStar className="me-1" />
                            {rev.rating}
                          </Badge>
                        </div>
                        <Card.Subtitle className="mb-2 text-muted review-date">
                          {new Date(rev.createdAt).toLocaleDateString("en-IN", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </Card.Subtitle>
                        <Card.Text className="review-comment">
                          "{rev.comment}"
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  ))
                )}
              </Col>
            </Row>
          </div>
        </Tab>
      </Tabs>

      {/* --- */}
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-5 related-products-section">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="section-title">You May Also Like</h4>
            <Button
              variant="link"
              className="text-decoration-none view-all-btn"
              onClick={() => navigate("/category")} 
            >
              View All <span className="arrow-icon">→</span>
            </Button>
          </div>
          <Slider {...relatedSliderSettings} className="related-products-slider">
            {relatedProducts.map((item) => (
              <div key={item._id} className="p-2"> {/* Added padding for slider items */}
                <Card className="related-product-card shadow-sm h-100" onClick={() => navigate(`/details/${item._id}`)}>
                  <Card.Img
                    variant="top"
                    src={item.product_images[0]}
                    className="related-product-img"
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="fs-6 fw-semibold mb-1 truncate-text">{item.product_name}</Card.Title>
                    <Card.Text className="price-color fw-bold mb-2">
                      ₹{item.price.toFixed(2)}
                    </Card.Text>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="mt-auto" // Pushes button to bottom
                      onClick={(e) => { e.stopPropagation(); navigate(`/details/${item._id}`); }}
                    >
                      View Product
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </Slider>
        </div>
      )}

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