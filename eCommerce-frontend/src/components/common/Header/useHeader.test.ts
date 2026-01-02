import { setupTestStore, renderHookWithProviders } from "@/utils/test.utils";
import { addToCart, cartItemChangeQuantity } from "@/store/cart/cart.slice";
import { toggleLike } from "@/store/wishlish/wishlist.slice";
import { describe, it, beforeEach, expect, vi } from "vitest";
import { act } from "@testing-library/react";

import useHeader from "./useHeader";

describe("useHeader (integration with real reducers)", () => {
  let store: ReturnType<typeof setupTestStore>;

  beforeEach(() => {
    // fresh store every test to avoid cross-test pollution
    store = setupTestStore();
  });

  it("initial values are zero", () => {
    const { result } = renderHookWithProviders(() => useHeader(), { store });
    expect(result.current.cartTotalQuantity).toBe(0);
    expect(result.current.wishlistTotalQuantity).toBe(0);
  });

  it("reflects cart actions", () => {
    // dispatch actions before rendering hook
    act(() => {
      store.dispatch(addToCart("1"));
      store.dispatch(addToCart("1"));
      store.dispatch(addToCart("2"));
      // {"1": 2, "2": 1} => quantity : 2 + 1 = 3
    });

    const { result } = renderHookWithProviders(() => useHeader(), { store });
    expect(result.current.cartTotalQuantity).toBe(3);
  });

  it("reflects wishlist toggle actions (use realistic payload)", () => {
    // simulate a successful toggleLike (fulfilled) with realistic payload
    act(() => {
      store.dispatch({
        type: toggleLike.fulfilled.type,
        payload: { type: "like", productId: 42 },
      });
      // wishlistItems => [42]
    });

    const { result } = renderHookWithProviders(() => useHeader(), { store });
    expect(result.current.wishlistTotalQuantity).toBe(1);

    // simulate removing same product
    act(() => {
      store.dispatch({
        type: toggleLike.fulfilled.type,
        payload: { type: "deslike", productId: 42 },
      });
      // wishlistItems => []
    });

    expect(result.current.wishlistTotalQuantity).toBe(0);
  });

  it("works when changing quantities via cartItemChangeQuantity", () => {
    act(() => {
      store.dispatch(addToCart("1"));
      store.dispatch(addToCart("2"));
      // {"1": 1, "2": 1} => quantity : 1 + 1 = 2
    });

    const { result } = renderHookWithProviders(() => useHeader(), { store });
    expect(result.current.cartTotalQuantity).toBe(2);

    act(() => {
      store.dispatch(cartItemChangeQuantity({ id: "1", quantity: 3 }));
      // {"1": 3, "2": 1} => quantity : 3 + 1 = 4
    });

    expect(result.current.cartTotalQuantity).toBe(4);
  });

  it("when auth.accessToken is present the hook attempts to dispatch the async thunk", () => {
    // Create a fresh store first
    const store = setupTestStore({
      auth: { accessToken: "FAKE_TOKEN", user: { id: 1 } },
    });

    // Spy BEFORE render so we catch the dispatch performed in useEffect
    const dispatchSpy = vi.spyOn(store, "dispatch");

    // Act: render with the store that is already spied
    renderHookWithProviders(useHeader, { store });

    // Assert: wait for an effect of the dispatch (thunk dispatch happens synchronously)
    // You can assert dispatch was called with a function (the thunk)
    expect(dispatchSpy).toHaveBeenCalled();
    expect(dispatchSpy).toHaveBeenCalledWith(expect.any(Function));

    // Restore
    dispatchSpy.mockRestore();
  });
});
