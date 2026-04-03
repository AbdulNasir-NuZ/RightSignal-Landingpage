import { defineConfig } from "@playwright/test";

const baseURL = process.env.PLAYWRIGHT_BASE_URL || "https://right-signal-landingpage.vercel.app";

export default defineConfig({
  testDir: "./tests",
  timeout: 60_000,
  retries: 1,
  use: {
    baseURL,
    headless: true,
    actionTimeout: 15_000,
  },
});
