import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:3000',
    retries: {
      // Configure retry attempts for `cypress run`
      // Default is 0
      runMode: 2,
    }
  },
});
