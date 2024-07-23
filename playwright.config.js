const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  timeout: 60000, // Increase global timeout to 60 seconds
  retries: 2, // Retry failed tests up to 2 times
  reporter: [["list"], ["allure-playwright"]],
  use: {
    browserName: "chromium",
    headless: true,
    ignoreHTTPSErrors: true,
    baseURL: "https://gorest.co.in/public/v1",
  },
});
