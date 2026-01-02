import { renderComponentWithProviders } from "@/utils";
import { describe, expect, test } from "vitest";
import { screen } from "@testing-library/react";

import HeaderRight from "./HeaderRight";

type TTestCase = {
  title: "Cart" | "Wishlist";
  to: "/cart" | "/wishlist";
  iconTitle: string;
};

describe("HeaderRight Component", () => {
  const testCases: TTestCase[] = [
    { title: "Cart", to: "/cart", iconTitle: "Header Cart" },
    { title: "Wishlist", to: "/wishlist", iconTitle: "Header Wishlist" },
  ];

  test.each(testCases)(
    "renders $title correctly with zero items",
    ({ title, to, iconTitle }) => {
      renderComponentWithProviders(
        <HeaderRight
          to={to}
          svgIcon={<div title={iconTitle} />}
          totalQuantity={0}
          title={title}
        />
      );

      expect(
        screen.getByRole("link", { name: new RegExp(title, "i") })
      ).toBeInTheDocument();

      expect(screen.queryByTestId("totalQuantity")).not.toBeInTheDocument();
    }
  );

  test("displays quantity and animation class when items > 0", () => {
    renderComponentWithProviders(
      <HeaderRight
        to="/cart"
        svgIcon={<div title="icon" />}
        totalQuantity={5}
        title="Cart"
      />
    );

    const badge = screen.getByTestId("totalQuantity");
    expect(badge).toHaveTextContent("5");

    // Check if the animation class is applied (Clean code check)
    // Note: Since we use CSS Modules, we check if the class string contains "pumpAnimate"
    expect(badge.className).toContain("pumpAnimate");
  });
});
