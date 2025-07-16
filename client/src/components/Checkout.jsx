// src/pages/CheckoutPage.jsx
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { loadRazorpayScript } from "../utils/loadRazorpay";
import axios from "axios";
import {
  Button,
  Form,
  Row,
  Col,
  Container,
  Card,
} from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CheckoutPage = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const [shipping, setShipping] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zip: "",
  });

  const handleChange = (e) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.productId.price * item.quantity,
    0
  );
  const shippingCharge = subtotal > 1000 ? 0 : 50;
  const tax = subtotal * 0.18;
  const totalAmount = Math.round(subtotal + shippingCharge + tax);

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) return toast.error("🛒 Cart is empty");

    const products = cartItems.map((item) => ({
      productId: item.productId._id,
      quantity: item.quantity,
      price: item.productId.price,
      size: item.size,
      material: item.material,
    }));

    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) return toast.error("❌ Razorpay SDK failed to load");

    try {
      // ✅ Step 1: Create order on backend
     const { data } = await axios.post(
  "http://localhost:8000/api/payment/checkout", // ✅ corrected route
  { amount: totalAmount },
  { withCredentials: true }
);


      // ✅ Step 2: Configure Razorpay
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY, 
        amount: totalAmount * 100,
        currency: "INR",
        name: "Arbuda Mobile",
        description: "Order Payment",
        order_id: data.order.id,
        handler: async (response) => {
          try {
            await axios.post(
              "http://localhost:8000/api/order/create",
              {
                userId: user?.id,
                products,
                shippingInfo: shipping,
                totalAmount,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              },
              { withCredentials: true }
            );

            toast.success("✅ Payment Successful & Order Placed!");
          } catch (err) {
            toast.error("❌ Order Save Failed");
            console.error(err);
          }
        },
        prefill: {
          name: `${shipping.firstName} ${shipping.lastName}`,
          email: shipping.email,
          contact: shipping.phone,
        },
        theme: { color: "#0d6efd" },
      };

    const loaded = await loadRazorpayScript();
if (!loaded) {
  toast.error("Razorpay script failed");
  return;
}
// ✅ Tabhi yahan Razorpay create karo
const razorpay = new window.Razorpay(options);
razorpay.open();

    } catch (error) {
      console.error(error);
      toast.error("❌ Razorpay Order Creation Failed");
    }
  };

  return (
    <Container className="my-5">
      <h4 className="mb-4">Shipping & Payment</h4>
      <Row>
        {/* Left Side Form */}
        <Col md={7}>
          <Card className="p-4 shadow-sm">
            <Form>
              <h5>Contact Info</h5>
              <Row>
                <Col>
                  <Form.Control
                    placeholder="First Name"
                    name="firstName"
                    value={shipping.firstName}
                    onChange={handleChange}
                    className="mb-3"
                  />
                </Col>
                <Col>
                  <Form.Control
                    placeholder="Last Name"
                    name="lastName"
                    value={shipping.lastName}
                    onChange={handleChange}
                    className="mb-3"
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Control
                    placeholder="Email"
                    name="email"
                    value={shipping.email}
                    onChange={handleChange}
                    className="mb-3"
                  />
                </Col>
                <Col>
                  <Form.Control
                    placeholder="Phone"
                    name="phone"
                    value={shipping.phone}
                    onChange={handleChange}
                    className="mb-3"
                  />
                </Col>
              </Row>

              <h5>Shipping Address</h5>
              <Form.Control
                placeholder="Address"
                name="address"
                value={shipping.address}
                onChange={handleChange}
                className="mb-3"
              />
              <Form.Control
                placeholder="Apartment, suite, etc."
                name="apartment"
                value={shipping.apartment}
                onChange={handleChange}
                className="mb-3"
              />
              <Row>
                <Col>
                  <Form.Control
                    placeholder="City"
                    name="city"
                    value={shipping.city}
                    onChange={handleChange}
                    className="mb-3"
                  />
                </Col>
                <Col>
                  <Form.Control
                    placeholder="State"
                    name="state"
                    value={shipping.state}
                    onChange={handleChange}
                    className="mb-3"
                  />
                </Col>
                <Col>
                  <Form.Control
                    placeholder="ZIP Code"
                    name="zip"
                    value={shipping.zip}
                    onChange={handleChange}
                    className="mb-3"
                  />
                </Col>
              </Row>

              <Button
                variant="success"
                className="w-100 mt-3"
                onClick={handlePlaceOrder}
              >
                Pay with Razorpay
              </Button>
            </Form>
          </Card>
        </Col>

        {/* Right Side Order Summary */}
        <Col md={5}>
          <Card className="p-4 shadow-sm">
            <h6>Order Summary</h6>
            <hr />
            <div className="d-flex justify-content-between">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between">
              <span>Shipping</span>
              <span>₹{shippingCharge.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between">
              <span>Tax (18%)</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between fw-bold">
              <span>Total</span>
              <span>₹{totalAmount.toFixed(2)}</span>
            </div>
          </Card>
        </Col>
      </Row>

      <ToastContainer position="top-right" autoClose={2500} theme="colored" />
    </Container>
  );
};

export default CheckoutPage;
