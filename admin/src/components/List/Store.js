import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './categorySlice';
import productReducer from './productSlice';

export const Store = configureStore({
  reducer: {
    category: categoryReducer,
    product: productReducer,
  },
});
