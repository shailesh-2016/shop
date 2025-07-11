import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import productReducer from './productSlice';

export const Store = configureStore({
  reducer: {
    users: userReducer,
    product: productReducer,
  },
});