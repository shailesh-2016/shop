import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL_CART;

export const addToCart = createAsyncThunk("cart/addToCart", async (cartItem, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${BASE_URL}`, cartItem, { withCredentials: true });
    return res.data.cartItem;
  } catch (err) {
    return rejectWithValue(err.response?.data || { message: "Server error" });
  }
});

export const fetchCart = createAsyncThunk("cart/fetchCart", async (userId, { rejectWithValue }) => {
  try {
    const res = await axios.get(`${BASE_URL}/${userId}`, { withCredentials: true });
    return res.data.cartItems;
  } catch (err) {
    return rejectWithValue(err.response?.data || { message: "Server error" });
  }
});

export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async (cartItemId, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`${BASE_URL}/${cartItemId}`, { withCredentials: true });
      return res.data.cartItemId;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Server error" });
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
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        const idx = state.cartItems.findIndex((item) => item._id === action.payload._id);
        if (idx !== -1) state.cartItems[idx] = action.payload;
        else state.cartItems.push(action.payload);
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload || [];
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = state.cartItems.filter((item) => item._id !== action.payload);
      });
  },
});

export default cartSlice.reducer;
