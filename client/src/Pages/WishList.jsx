// src/Pages/Wishlist.jsx
import React, { useEffect } from "react";
import { Container, Table, Button, Image } from "react-bootstrap";
import { Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getWishlist,
  removeFromWishlist,
} from "../redux/wish-list/listSlice";
import { addToCart } from "../redux/cart-slice/cartSlice";
import toast, { Toaster } from "react-hot-toast"; // ✅ Changed

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const loading = useSelector((state) => state.wishlist.loading);

  useEffect(() => {
    dispatch(getWishlist());
  }, [dispatch]);

  const handleRemove = async (id) => {
    try {
      await dispatch(removeFromWishlist(id)).unwrap();
      toast.success("✅ Removed from wishlist.");
    } catch (err) {
      toast.error("❌ Failed to remove.");
    }
  };

  const handleAddToCart = async (item) => {
    try {
      await dispatch(addToCart({ ...item, quantity: 1 })).unwrap();
      await dispatch(removeFromWishlist(item._id));
      toast.success("🛒 Added to cart!");
    } catch (err) {
      toast.error("❌ Failed to add to cart.");
    }
  };

  return (
    <Container className="my-5">
      <Toaster position="top-right" reverseOrder={false} /> {/* ✅ Added */}
      <h4 className="fw-bold">Wishlist</h4>
      <p className="text-muted">Home / Wishlist</p>

      {loading ? (
        <p className="text-center mt-4">Loading wishlist...</p>
      ) : wishlistItems.length === 0 ? (
        <p className="text-center mt-4">Your wishlist is empty.</p>
      ) : (
        <Table responsive className="align-middle">
          <thead>
            <tr>
              <th>Product</th>
              <th>Description</th>
              <th></th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {wishlistItems.map((item) => (
              <tr key={item._id}>
                <td>
                  <Link to={`/details/${item._id}`}>
                    <Image
                      src={item.product_images?.[0]}
                      rounded
                      height="80"
                      width="80"
                      style={{ objectFit: "cover" }}
                    />
                  </Link>
                </td>
                <td>
                  <Link
                    to={`/details/${item._id}`}
                    className="text-decoration-none text-dark"
                  >
                    {item.product_name}
                  </Link>
                </td>
                <td>
                  <Button
                    style={{ backgroundColor: "#9b51e0", border: "none" }}
                    className="px-4 py-1"
                    onClick={() => handleAddToCart(item)} // ✅ Fixed
                  >
                    Add To Cart
                  </Button>
                </td>
                <td>₹{Number(item.price).toFixed(2)}</td>
                <td>
                  <Trash2
                    role="button"
                    color="black"
                    onClick={() => handleRemove(item._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Link to="/products">
        <Button variant="light" className="mt-3">
          &larr; Continue Shopping
        </Button>
      </Link>
    </Container>
  );
};

export default Wishlist;
