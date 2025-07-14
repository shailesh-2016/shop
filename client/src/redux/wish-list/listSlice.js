import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Add to Wishlist
export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async (product, { rejectWithValue }) => {
    try {
      const res = await axios.post("http://localhost:8000/api/wishlist", product);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to add to wishlist");
    }
  }
);

// ✅ Get All Wishlist Items
export const getWishlist = createAsyncThunk(
  "wishlist/getWishlist",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("http://localhost:8000/api/wishlist");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch wishlist");
    }
  }
);

// ✅ Delete Wishlist Item
export const removeFromWishlist = createAsyncThunk(
  "wishlist/removeFromWishlist",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:8000/api/wishlist/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to remove from wishlist");
    }
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      // 🔄 Add
      .addCase(addToWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        const exists = state.items.find(item => item._id === action.payload._id);
        if (!exists) state.items.push(action.payload);
        state.loading = false;
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 📥 Get
      .addCase(getWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(getWishlist.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(getWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ❌ Remove
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item._id !== action.payload);
      });
  },
});

export default wishlistSlice.reducer;
