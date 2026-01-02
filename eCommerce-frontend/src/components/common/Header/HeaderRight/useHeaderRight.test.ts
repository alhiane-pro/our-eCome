import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";

import useHeaderRight from "./useHeaderRight";

describe("useHeaderRight Hook", () => {
  beforeEach(() => {
    // Replace real timers with fake timers so we can control setTimeout
    vi.useFakeTimers();
  });

  afterEach(() => {
    // Restore real timers after each test
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  test("does not animate when quantity is 0", () => {
    const { result } = renderHook(() => useHeaderRight(0));
    expect(result.current.isAnimate).toBeFalsy();
  });

  test("sets isAnimate true when quantity > 0 and then false after debounce", () => {
    // render with quantity > 0 -> effect should trigger animation immediately
    const { result } = renderHook(() => useHeaderRight(5));

    // Immediately after triggerAnimation, state should be true
    expect(result.current.isAnimate).toBeTruthy();

    // Fast-forward by 300ms to run the debounce handler that sets state to false
    act(() => {
      vi.advanceTimersByTime(300);
    });

    // After timeout, isAnimate should be false (this covers the setIsAnimate(false) line)
    expect(result.current.isAnimate).toBeFalsy();
  });

  test("clears the timeout on unmount (cleanup called)", () => {
    // Spy on window.clearTimeout to ensure cleanup calls it
    const clearSpy = vi.spyOn(globalThis, "clearTimeout");

    const { unmount } = renderHook(() => useHeaderRight(3));

    // Now unmount to trigger cleanup.
    // The cleanup returned by the useEffectEvent callback
    // should call clearTimeout(debounce).
    unmount();

    expect(clearSpy).toHaveBeenCalled();
    clearSpy.mockRestore();
  });
});
