import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Trash } from "lucide-react";
import { Button, Container, Row, Col, Table, Spinner, Card } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { checkAuth } from "../redux/auth-slice";
import { fetchCart, deleteCartItem } from "../redux/cart-slice/cartSlice";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems, loading } = useSelector((state) => state.cart);
  const { user, isAuthenticated, isLoading } = useSelector((state) => state.auth);

  // ✅ Run checkAuth only on first mount
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  // ✅ Wait for checkAuth to finish before deciding redirect
  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated || !user) {
        navigate("/login");
      }
    }
  }, [isLoading, isAuthenticated, user, navigate]);

  // ✅ Fetch cart only after user is confirmed
  useEffect(() => {
    if (!isLoading && isAuthenticated && user?.id) {
      dispatch(fetchCart(user.id));
    }
  }, [dispatch, isLoading, isAuthenticated, user]);

  const handleDelete = (cartItemId) => {
    if (window.confirm("Are you sure you want to remove this item?")) {
      dispatch(deleteCartItem(cartItemId))
        .unwrap()
        .then(() => toast.success("✅ Item removed from cart"))
        .catch(() => toast.error("❌ Failed to remove item"));
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error("🛒 Cart is empty!");
      return;
    }
    navigate("/checkout");
  };

  const subtotal = cartItems.reduce((acc, item) => {
    const product = item?.productId;
    const price = product?.discount_price || product?.price || 0;
    const quantity = item?.quantity || 0;
    return acc + price * quantity;
  }, 0);

  const shipping = subtotal > 1000 ? 0 : 50;
  const tax = subtotal * 0.18;
  const total = subtotal + shipping + tax;

  // ✅ Show loader until we know if user is authenticated
  if (isLoading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" />
        <p className="mt-2">Checking authentication...</p>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Toaster position="top-right" reverseOrder={false} />
      <h3 className="fw-bold mb-4 text-center">🛒 Your Shopping Cart</h3>
      <Row>
        <Col md={8}>
          {loading ? (
            <div className="text-center py-4">
              <Spinner animation="border" />
              <p className="mt-2">Loading your cart...</p>
            </div>
          ) : cartItems.length === 0 ? (
            <h5 className="text-center">🛒 Cart is empty!</h5>
          ) : (
            <Card className="shadow-sm border-0">
              <Card.Body className="p-0">
                <Table responsive hover className="align-middle m-0">
                  <thead className="table-light">
                    <tr className="text-center">
                      <th>Product</th>
                      <th>Name</th>
                      <th>Qty</th>
                      <th>Price</th>
                      <th>Total</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item._id} className="text-center">
                        <td>
                          {item.productId && (
                            <img
                              src={item.productId.product_images?.[0]}
                              alt="product"
                              width="70"
                              height="70"
                              style={{ objectFit: "cover", borderRadius: "10px" }}
                            />
                          )}
                        </td>
                        <td>{item.productId?.product_name}</td>
                        <td>{item.quantity}</td>
                        <td>₹{item.productId?.discount_price || item.productId?.price}</td>
                        <td>
                          ₹
                          {(
                            (item.productId?.discount_price || item.productId?.price) *
                            item.quantity
                          ).toFixed(2)}
                        </td>
                        <td>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleDelete(item._id)}
                          >
                            <Trash size={16} />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          )}
        </Col>

        <Col md={4} className="mt-4 mt-md-0">
          <Card className="shadow-sm border-0">
            <Card.Body>
              <h5 className="mb-3">🧾 Order Summary</h5>
              <hr />
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal</span>
                <span>₹{cartItems.length === 0 ? "0.00" : subtotal.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>
                  Shipping{" "}
                  {cartItems.length > 0 && shipping === 0 && (
                    <small className="text-success">(Free above ₹1000)</small>
                  )}
                </span>
                <span>₹{cartItems.length === 0 ? "0.00" : shipping.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Tax (18%)</span>
                <span>₹{cartItems.length === 0 ? "0.00" : tax.toFixed(2)}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold fs-5 mb-3">
                <span>Total</span>
                <span>₹{cartItems.length === 0 ? "0.00" : total.toFixed(2)}</span>
              </div>
              <Button
                variant="primary"
                className="w-100"
                onClick={handleCheckout}
                disabled={cartItems.length === 0}
              >
                Proceed to Checkout
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CartPage;
