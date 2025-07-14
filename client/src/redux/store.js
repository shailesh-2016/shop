import { combineReducers, configureStore } from "@reduxjs/toolkit";
import sessionStorage from "redux-persist/lib/storage/session";
import persistReducer from "redux-persist/lib/persistReducer";
import persistStore from "redux-persist/lib/persistStore";
import authReducer from "./auth-slice/index";
import cartReducer from "./cart-slice/cartSlice";
import wishlistReducer from "../redux/wish-list/listSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
});
const persistConfig = {
  key: "root",
  storage: sessionStorage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
export default store;
