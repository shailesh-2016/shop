import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Trash } from "lucide-react";
import {
  Button, Container, Row, Col, Table, Spinner
} from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { checkAuth } from "../redux/auth-slice";
import { fetchCart, deleteCartItem } from "../redux/cart-slice/cartSlice";

const CartPage = () => {
  const dispatch = useDispatch();
  const { cartItems, loading } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const userId = user?.id;

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    if (userId) {
      dispatch(fetchCart(userId));
    }
  }, [dispatch, userId]);

  const handleDelete = (cartItemId) => {
    if (window.confirm("Are you sure you want to remove this item?")) {
      dispatch(deleteCartItem(cartItemId))
        .then((res) => {
          if (res.meta.requestStatus === "fulfilled") {
            toast.success("Item removed from cart");
          } else {
            toast.error("Failed to remove item");
          }
        })
        .catch(() => {
          toast.error("Something went wrong");
        });
    }
  };

  const subtotal = cartItems.reduce((acc, item) => {
    const price = item?.productId?.price || 0;
    const quantity = item?.quantity || 0;
    return acc + price * quantity;
  }, 0);

  const shipping = 20;
  const tax = 20;
  const total = subtotal + shipping + tax;

  return (
    <Container className="my-5">
      <h4 className="fw-bold">Cart Page</h4>

      <Row className="mt-4">
        <Col md={8}>
          {loading ? (
            <Spinner animation="border" />
          ) : cartItems.length === 0 ? (
            <h5 className="text-center">🛒 Cart is empty!</h5>
          ) : (
            <Table responsive bordered hover>
              <thead>
                <tr className="text-center">
                  <th>Product</th>
                  <th>Description</th>
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
                      <img
                        src={item.productId?.product_images?.[0]}
                        alt="product"
                        width="80"
                        height="80"
                      />
                    </td>
                    <td>{item.productId?.product_name}</td>
                    <td>{item.quantity}</td>
                    <td>₹{item.productId?.price}</td>
                    <td>₹{item.productId?.price * item.quantity}</td>
                    <td>
                      <Button
                        variant="danger"
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
          )}
        </Col>

        <Col md={4}>
          <div className="border rounded p-3">
            <h6>Order Summary</h6>
            <hr />
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
            <Button className="w-100 mt-3" variant="primary">
              Proceed to Checkout
            </Button>
          </div>
        </Col>
      </Row>

      <ToastContainer position="top-right" autoClose={3000} />
    </Container>
  );
};

export default CartPage;
