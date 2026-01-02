import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import CategoriesReducer from "./categories/categories.slice";
import WishlistReducer from "./wishlish/wishlist.slice";
import ProductsReducer from "./products/products.slice";
import OrdersReducer from "./orders/orders.slice";
import RegisterReducer from "./auth/auth.slice";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import CartReducer from "./cart/cart.slice";
import ToastsReducer from "./toasts/toasts.slice";

/* const rootPersistConfig = {
  key: "root",
  storage,
  blacklist: ["cart"],
}; */

const cartPersistConfig = {
  key: "cart",
  storage,
  whitelist: ["cartItems"],
};

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["accessToken", "user"],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, RegisterReducer),
  categories: CategoriesReducer,
  products: ProductsReducer,
  cart: persistReducer(cartPersistConfig, CartReducer),
  wishlist: WishlistReducer,
  orders: OrdersReducer,
  toasts: ToastsReducer,
});

// const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      // serializableCheck: false,
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });
  },
});

const persistor = persistStore(store);

export { store, persistor };

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {categories: CategoriesReducer, products: productsReducer}
export type AppDispatch = typeof store.dispatch;
