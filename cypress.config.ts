import { defineConfig } from 'cypress';

export default defineConfig({
  reporter: 'junit',
  reporterOptions: {
    mochaFile: 'cypress/results/cypress-report.xml',
    toConsole: true,
  },
  pageLoadTimeout: 180000,
  responseTimeout: 120000,
  e2e: {
    // 1337 = local frontend used for local testing
    // 9081 = docker frontend used on CI
    baseUrl: 'http://localhost:9081/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
