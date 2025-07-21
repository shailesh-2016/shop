import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

const OrderSuccessPage = () => {
  const { user } = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const BASE_URL = import.meta.env.VITE_BASE_URL_ORDER;

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/${user.id}`);
      if (res.data.success) {
        setOrders(res.data.orders);
      } else {
        toast.error("❌ Failed to fetch orders");
      }
    } catch (error) {
      console.error("Order Fetch Error:", error);
      toast.error("⚠️ Error fetching orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchOrders();
    }
  }, [user]);

  return (
    <Container className="my-5">
      <h4 className="mb-3">🎉 My Orders</h4>
      <p>Here are your recent orders:</p>

      {loading ? (
        <Spinner animation="border" />
      ) : orders.length === 0 ? (
        <p>No recent orders found.</p>
      ) : (
        orders.map((order) => (
          <Card className="mb-4 shadow-sm" key={order._id}>
            <Card.Body>
              <h5 className="mb-3">🧾 Order ID: {order._id}</h5>
              <p>
                <strong>Total Amount:</strong> ₹{order.totalAmount}
              </p>
              <p>
                <strong>Shipping To:</strong> {order.shippingInfo.address},{" "}
                {order.shippingInfo.city}, {order.shippingInfo.state} -{" "}
                {order.shippingInfo.zipCode}
              </p>
              <hr />
              {order.products.map((item, index) => (
                <Row key={index} className="mb-4">
                  <Col md={2}>
                    <img
                      src={item.productId?.product_images?.[0]}
                      alt="product"
                      className="img-fluid rounded"
                    />
                  </Col>
                  <Col>
                    <h6>{item.productId?.product_name}</h6>
                    <p>Qty: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                    <p>Material: {item.material}</p>
                    <p>Price: ₹{item.price}</p>
                    <p>
                      <strong>Status:</strong>{" "}
                      <span
                        className={`badge ${
                          item.status === "delivered"
                            ? "bg-success"
                            : item.status === "shipped"
                            ? "bg-primary"
                            : item.status === "cancelled"
                            ? "bg-danger"
                            : "bg-warning text-dark"
                        }`}
                      >
                        {item.status}
                      </span>
                    </p>
                  </Col>
                </Row>
              ))}
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  );
};

export default OrderSuccessPage;
