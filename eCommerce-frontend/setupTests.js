import { beforeAll, afterEach, afterAll, beforeEach } from "vitest";
import { server } from "./src/mocks/server";

import "@testing-library/jest-dom/vitest";

/**
 * Our Testing Strategy
 * To make sure we don't miss anything, I'll be looking at components through this lens:
 * #1 Rendering: Does it show the correct data?
 * #2 Interactions: Do buttons, inputs, and links work as expected?
 * #3 Asynchronous Logic: How are we handling data fetching and loading states?
 * #4 Global State: Are the side effects (like updating the cart count) triggering correctly?
 * #5 Accessibility (A11y): Are we using semantic HTML that screen readers can navigate?
 */

// beforeEach(() => localStorage.clear());

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
