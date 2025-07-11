import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Trash } from "lucide-react";
import { Button, Container, Row, Col, Table, Spinner } from "react-bootstrap";
import { checkAuth } from "../redux/auth-slice";
import { fetchCart } from "../redux/cart-slice/cartSlice";

const CartPage = () => {
  const dispatch = useDispatch();

  // 🛒 Get state from redux
const { cartItems, loading } = useSelector((state) => state.cart);
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const userId = user?.id;
console.log("useriddddddd",userId)
  // ✅ Check Auth once
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  // ✅ Fetch Cart once userId mil jaye
  useEffect(() => {
    if (userId) {
      dispatch(fetchCart(userId));
    }
  }, [dispatch, userId]);

  // ✅ Calculate totals safely
  const subtotal = Array.isArray(cartItems)
    ? cartItems.reduce((acc, item) => {
        const price = item?.productId?.price || 0;
        const quantity = item?.quantity || 0;
        return acc + price * quantity;
      }, 0)
    : 0;

  const shipping = 20;
  const tax = 20;
  const total = subtotal + shipping + tax;

  return (
    <Container className="my-5">
      <h4 className="fw-bold">Cart Page</h4>
      <p className="text-muted">Home / Cart Page</p>

      <Row className="mt-4">
        <Col md={8}>
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" />
            </div>
          ) : !Array.isArray(cartItems) || cartItems.length === 0 ? (
            <h5 className="text-center">🛒 Cart is empty!</h5>
          ) : (
            <Table responsive bordered hover>
              <thead>
                <tr className="text-center">
                  <th>Product</th>
                  <th>Description</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr className="align-middle text-center" key={item?._id}>
                    <td>
                      <img
                        src={item?.productId?.product_images?.[0]}
                        alt={item?.productId?.product_name}
                        className="img-thumbnail"
                        style={{
                          width: "80px",
                          height: "80px",
                          objectFit: "cover",
                        }}
                      />
                    </td>
                    <td>{item?.productId?.product_name}</td>
                    <td>
                      <div className="d-flex justify-content-center align-items-center gap-2">
                        <Button size="sm" variant="light">
                          -
                        </Button>
                        <span>{item?.quantity || 0}</span>
                        <Button size="sm" variant="light">
                          +
                        </Button>
                      </div>
                    </td>
                    <td>₹{item?.productId?.price?.toFixed(2)}</td>
                    <td>
                      ₹
                      {(
                        (item?.productId?.price || 0) * (item?.quantity || 0)
                      ).toFixed(2)}
                    </td>
                    <td>
                      <Button variant="danger" size="sm">
                        <Trash size={16} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
          <Button variant="outline-dark">← Continue Shopping</Button>
        </Col>

        {/* Order Summary */}
        <Col md={4}>
          <div className="border rounded p-3 shadow-sm">
            <h6 className="fw-bold mb-3">Order Summary</h6>
            <div className="d-flex justify-content-between">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between">
              <span>Shipping</span>
              <span>₹{shipping.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between">
              <span>Tax</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between fw-bold">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>

            <Button
              className="w-100 mt-3"
              style={{ background: "#a855f7", border: "none" }}
            >
              Proceed to Checkout
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CartPage;
