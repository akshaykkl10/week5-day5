// vitest.config.js

import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    tsconfigPaths: true
  },

  test: {
    environment: "jsdom",
    include: ["tests/**/*.test.ts"],
    exclude: ["dist/**"],
    coverage: {
      provider: "v8"
    }
  }
});