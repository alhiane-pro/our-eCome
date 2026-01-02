import { renderComponentWithProviders } from "@/utils";
import { screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import Header from "./Header";

describe("Header Component", () => {
  test("renders logo correctly", () => {
    renderComponentWithProviders(<Header />);
    const logo = screen.getByRole("heading", { name: /our ecom/i });
    expect(logo).toBeInTheDocument();
  });
});
