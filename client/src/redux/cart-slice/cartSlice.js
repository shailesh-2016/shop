import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 🔄 Add to Cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (cartItem, { rejectWithValue }) => {
    try {
      const res = await axios.post("http://localhost:8000/api/cart", cartItem);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// 🔄 Fetch Cart
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`http://localhost:8000/api/cart/${userId}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// 🔄 Delete Cart Item
export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async (cartItemId, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`http://localhost:8000/api/cart/${cartItemId}`);
      return res.data.cartItemId;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems.push(action.payload.cartItem);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Add to cart failed";
      })

      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload.cartItems || [];
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Fetch cart failed";
      })

      .addCase(deleteCartItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = state.cartItems.filter(
          (item) => item._id !== action.payload
        );
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Delete failed";
      });
  },
});

export default cartSlice.reducer;
