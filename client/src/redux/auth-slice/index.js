// src/redux/auth/authSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const AUTH_API = import.meta.env.VITE_BASE_URL_AUTH;

// ⏳ Initial State
const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
};

// ✅ Register User
export const registerUser = createAsyncThunk(
  "auth/register",
  async (formData, thunkAPI) => {
    try {
      const res = await axios.post(`${AUTH_API}/register`, formData);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

// ✅ Login User
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(`${AUTH_API}/login`, formData);

      const { token, user, success, message } = response.data;

      if (token) {
        localStorage.setItem("token", token); // ✅ STORE TOKEN HERE
      }

      return { token, user, success, message };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

// ✅ Check Auth
export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${AUTH_API}/check-auth`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

// ✅ Logout
export const logoutUser = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("token"); // 🗑️ Remove token
});

// ✅ Google Login
export const googleLoginUser = createAsyncThunk(
  "auth/googleLoginUser",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(`${AUTH_API}/google-login`, userData);

      const { token, user, success, message } = response.data;

      if (token) {
        localStorage.setItem("token", token); // ✅ Store token in localStorage
      }

      return { token, user, success, message };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Google login failed"
      );
    }
  }
);


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Register
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
      });

    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
      });

    // Check Auth
    builder
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.isLoading = false;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
      })
      .addCase(googleLoginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(googleLoginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.isLoading = false;
      })
      .addCase(googleLoginUser.rejected, (state) => {
        state.isLoading = false;
      });

    // Logout
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null;
      state.isAuthenticated = false;
    });
  },
});

export default authSlice.reducer;
