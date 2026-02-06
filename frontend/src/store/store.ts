import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import cartReducer from "./cartSlice"; // Import the cart reducer

// Import API slices to ensure they are registered with the main API service
import "./services/productsApi";
import "./services/categoriesApi";
import "./services/ordersApi";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    cart: cartReducer, // Add the cart reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
