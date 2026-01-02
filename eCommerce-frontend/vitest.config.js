import { defineConfig } from "vite";

import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [react(), svgr(), tsconfigPaths()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./setupTests.js",
    coverage: {
      // Enable coverage collection
      enabled: true,
      // Collect coverage from all files matching include/exclude patterns
      all: true,
      // Specify the files to include
      include: ["src/components/**/*.{ts,tsx}"],
      // Optionally, exclude specific files/folders
      exclude: [
        "**/node_modules/**",
        "src/components/**/*.{types,test.spec}.{ts,tsx}",
      ],
      // Choose your desired reporters
      reporter: ["text", "html"],
      // If thresholds aren't meet, vitest will fail
      thresholds: {
        statements: -10, // more than 10 statements uncovered (untested)
        branches: 80,
        functions: 80,
        lines: 80,
      },
      // ERROR: Coverage for branches (50%) does not meet global threshold (80%)
    },
  },
});
