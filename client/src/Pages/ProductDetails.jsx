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
  Badge,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cart-slice/cartSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReviewModal from "../components/ReviewModel";
import { FaStar, FaPlus, FaMinus } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./productDetails.css";

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
  const userId = user?.id || user?._id;

  // Calculate stock for selected size
  const selectedSizeStock =
    product?.sizeStock?.find((s) => s.size === size)?.stock ?? 0;

  useEffect(() => {
    // Product Data Fetch
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL_PRODUCTS}/${id}`
        );
        const productData = res.data.product;
        setProduct(productData);
        setMainImage(productData.product_images[0]);
        if (productData.category && productData.category._id) {
          fetchRelatedProducts(productData.category._id);
        }
      } catch (err) {
        toast.error("Failed to load product");
      }
    };
    // Review Data Fetch
    const fetchReviews = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL_PRODUCTS}/${id}/review`
        );
        setReviews(res.data.reviews);
      } catch (err) {
        toast.error("Failed to load reviews");
      }
    };
    fetchProduct();
    fetchReviews();
  }, [id]);

  // Related
  const fetchRelatedProducts = async (categoryId) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL_PRODUCTS}/category/${categoryId}`
      );
      const filtered = res.data.filter((p) => p._id !== id);
      setRelatedProducts(filtered.slice(0, 4));
    } catch (err) {
      console.error("❌ Related products fetch error", err);
    }
  };

  useEffect(() => {
    if (user?.name) setReviewForm((prev) => ({ ...prev, userName: user.name }));
  }, [user]);

  // Reset qty on size change
  useEffect(() => {
    setQty(1);
  }, [size]);

  // -------- Quantity Change Handlers ------
  const handleDecreaseQty = () => setQty(qty > 1 ? qty - 1 : 1);

  const handleIncreaseQty = () => {
    if (!size) return toast.error("Select size first");
    if (qty < selectedSizeStock) setQty(qty + 1);
    else toast.info(`Only ${selectedSizeStock} items left in stock`);
  };

  // -------- Add to Cart ----------
  const handleAddToCart = () => {
    if (!userId) {
      toast.warn("Please login to add to cart");
      return navigate("/login");
    }
    if (!size || !material) return toast.error("Select size & material");

    if (qty > selectedSizeStock) {
      toast.error(`Only ${selectedSizeStock} available for size ${size}`);
      return;
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

  // -------- BUY NOW logic (reduces stock) ----------
  const handleBuyNow = async () => {
    if (!userId) {
      toast.warn("Please login to continue");
      return navigate("/login");
    }
    if (!size || !material)
      return toast.error("Please select size & material");

    if (qty > selectedSizeStock) {
      toast.error(`Only ${selectedSizeStock} available for size ${size}`);
      return;
    }
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL_PRODUCTS}/reduce-stock`,
        {
          productId: product._id,
          selectedSize: size,
          quantity: qty,
        }
      );
      toast.success("Order placed, stock updated!");
      // You can redirect to order summary/payment etc. here
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Order failed or insufficient stock. Try again."
      );
    }
  };

  // ----- Review Handling (you can keep as in your code) -----
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const reviewData = {
      userId: user?._id || user?.id,
      name: user?.name,
      rating: Number(reviewForm.rating),
      comment: reviewForm.comment,
    };
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL_PRODUCTS}/${id}/review`,
        reviewData
      );
      toast.success("Review submitted!");
      setShowReviewModal(false);
      setReviewForm({ userName: user?.name, rating: 5, comment: "" });
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL_PRODUCTS}/${id}/review`
      );
      setReviews(res.data.reviews);
    } catch {
      toast.error("Failed to submit review");
    }
  };

  const relatedSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 3 } },
      { breakpoint: 992, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  if (!product)
    return <p className="text-center mt-5 text-muted">Product loading...</p>;

  return (
    <Container className="my-5 product-detail-page">
      <Row className="g-4">
        {/* Product Images */}
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
                className={`img-thumbnail thumbnail-image ${mainImage === img ? "active-thumbnail" : ""}`}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </Col>
        {/* Product Details */}
        <Col md={6} className="product-info-col">
          <h1 className="product-title">{product.product_name}</h1>
          <p className="product-rating">
            <FaStar className="star-icon" /> {product.rating ?? 0}{" "}
            <span className="text-muted">({reviews.length} Reviews)</span>
          </p>
          <h3 className="product-price">
            ₹{Number(product.price).toFixed(2)}
          </h3>
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

          {/* Size with Stock */}
          <Form.Group className="mb-4">
            <Form.Label className="fw-bold fs-5 mb-2">Size</Form.Label>
            <div className="d-flex flex-wrap gap-3 product-size-options">
              {product.sizeStock?.length > 0 ? (
                product.sizeStock.map(({ size: sz, stock }) => (
                  <div key={sz} className="text-center product-size-item">
                    <Button
                      variant={size === sz ? "primary" : "outline-secondary"}
                      size="lg"
                      onClick={() => {
                        if (stock > 0) setSize(sz);
                        else toast.error("Out of Stock");
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
                        >Out</Badge>
                      )}
                    </Button>
                    <div className="size-stock-info mt-1">
                      {stock === 0 ? (
                        <span className="text-danger fw-semibold">Out of Stock</span>
                      ) : stock < 10 ? (
                        <span className="text-warning fw-semibold">
                          Only {stock} left!
                        </span>
                      ) : (
                        <span className="text-success fw-semibold">In Stock</span>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <span className="text-danger">Stock info not available</span>
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
                onClick={handleDecreaseQty}
                className="qty-button"
                disabled={qty <= 1}
              >
                <FaMinus />
              </Button>
              <span className="qty-display fs-5 fw-bold">{qty}</span>
              <Button
                variant="outline-secondary"
                size="md"
                onClick={handleIncreaseQty}
                className="qty-button"
                disabled={!size || selectedSizeStock === 0}
              >
                <FaPlus />
              </Button>
            </div>
            <div>
              {size &&
                (selectedSizeStock === 0 ? (
                  <span className="text-danger fw-semibold">Out of Stock</span>
                ) : selectedSizeStock < 10 ? (
                  <span className="text-warning">Only {selectedSizeStock} left!</span>
                ) : (
                  <span className="text-success">In Stock</span>
                ))}
            </div>
          </Form.Group>

          {/* Cart Buttons */}
          <div className="d-grid gap-2 mt-4 add-to-cart-section">
            <Button
              variant="primary"
              size="lg"
              className="add-to-cart-btn"
              onClick={handleAddToCart}
              disabled={product.sizeStock?.every((s) => s.stock === 0)}
            >
              ADD TO CART
            </Button>
            <Button
              variant="outline-primary"
              size="lg"
              className="buy-now-btn"
              onClick={handleBuyNow}
              disabled={product.sizeStock?.every((s) => s.stock === 0)}
            >
              BUY NOW
            </Button>
          </div>
        </Col>
      </Row>

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
                  <p className="text-muted">No reviews yet. Be the first!</p>
                ) : (
                  reviews.map((rev, idx) => (
                    <Card key={rev._id || idx} className="mb-3 review-card shadow-sm">
                      <Card.Body>
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <Card.Title className="mb-0 fs-5">{rev.name}</Card.Title>
                          <Badge bg="info" className="review-rating-badge">
                            <FaStar className="me-1" />
                            {rev.rating}
                          </Badge>
                        </div>
                        <Card.Subtitle className="mb-2 text-muted review-date">
                          {rev.createdAt
                            ? new Date(rev.createdAt).toLocaleDateString("en-IN", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })
                            : ""}
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
              <div key={item._id} className="p-2">
                <Card
                  className="related-product-card shadow-sm h-100"
                  onClick={() => navigate(`/details/${item._id}`)}
                >
                  <Card.Img
                    variant="top"
                    src={item.product_images[0]}
                    className="related-product-img"
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="fs-6 fw-semibold mb-1 truncate-text">
                      {item.product_name}
                    </Card.Title>
                    <Card.Text className="price-color fw-bold mb-2">
                      ₹{Number(item.price).toFixed(2)}
                    </Card.Text>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="mt-auto"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/details/${item._id}`);
                      }}
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
