import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cart-slice/cartSlice";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [material, setMaterial] = useState("");
  const [size, setSize] = useState("");

  // ✅ Get userId from Redux auth slice
  const user = useSelector((state) => state.auth.user);
  const userId = user?.id;

  // ✅ Fetch product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/products/${id}`);
        setProduct(res.data.product);
      } catch (err) {
        console.error("Failed to load product", err);
      }
    };

    fetchProduct();
  }, [id]);

  // ✅ Add to Cart
  const handleAddToCart = () => {
    if (!userId) {
      alert("Please login to add to cart");
      return navigate("/login");
    }

    if (!size || !material) {
      return alert("Please select both material and size.");
    }

    const cartItem = {
      userId,
      productId: id,
      quantity: qty,
      material,
      size,
    };

    dispatch(addToCart(cartItem));
    alert("Added to cart ✅");
    navigate("/cart");
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
          />
          <div className="d-flex gap-2">
            {product.product_images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumb ${index}`}
                className="img-thumbnail"
                style={{ height: "80px", width: "80px", objectFit: "cover" }}
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
            <div>
              {["18K Gold", "22K Gold", "Rose Gold"].map((mat) => (
                <Form.Check
                  inline
                  key={mat}
                  type="radio"
                  label={mat}
                  name="material"
                  onChange={() => setMaterial(mat)}
                />
              ))}
            </div>
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

          {/* Action */}
          <div className="d-flex gap-3 mt-4">
            <Button variant="primary" className="w-50" onClick={handleAddToCart}>
              ADD TO CART
            </Button>
            <Button variant="outline-secondary" className="w-50">
              Buy Now
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;
