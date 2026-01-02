import type { RenderHookResult, RenderOptions } from "@testing-library/react";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { render, renderHook } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";

// Import raw reducers (not persisted versions)
import authReducer from "@/store/auth/auth.slice";
import cartReducer from "@/store/cart/cart.slice";
import wishlistReducer from "@/store/wishlish/wishlist.slice";
import categoriesReducer from "@/store/categories/categories.slice";
import productsReducer from "@/store/products/products.slice";
import ordersReducer from "@/store/orders/orders.slice";
import toastsReducer from "@/store/toasts/toasts.slice";

// Types
export type TestRootState = ReturnType<
  typeof combineReducers // placeholder for type; we'll build the reducer in function
>;

// Create a test-only root reducer (no redux-persist)
export const createTestRootReducer = () =>
  combineReducers({
    auth: authReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    categories: categoriesReducer,
    products: productsReducer,
    orders: ordersReducer,
    toasts: toastsReducer,
  });

// Test store creator
export function setupTestStore(preloadedState?: Partial<TestRootState>) {
  return configureStore({
    reducer: createTestRootReducer(),
    preloadedState,
    // avoid non-serializable warnings in tests
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
  });
}

type AppStoreForTests = ReturnType<typeof setupTestStore>;

// Extend RenderOptions to allow additional fields
interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  initialEntries?: string[];
  preloadedState?: Partial<TestRootState>;
  store?: AppStoreForTests;
}

// Component renderer with providers
export function renderComponentWithProviders(
  ui: React.ReactElement,
  {
    initialEntries = ["/"],
    preloadedState,
    store = setupTestStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: { children?: React.ReactNode }) {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
      </Provider>
    );
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

// Hook renderer with providers
export function renderHookWithProviders<T>(
  hook: () => T,
  {
    preloadedState,
    store = setupTestStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
): { store: AppStoreForTests } & RenderHookResult<T, unknown> {
  function Wrapper({ children }: { children?: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
  }

  return {
    store,
    ...renderHook<T, unknown>(hook, {
      wrapper: Wrapper,
      ...renderOptions,
    }),
  };
}
