import { defineConfig } from 'cypress';
const getCompareSnapshotsPlugin = require('cypress-image-diff-js/dist/plugin');

export default defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1080,
  reporter: './node_modules/cypress-multi-reporters',
  reporterOptions: {
    reporterEnabled: 'mochawesome',
    mochawesomeReporterOptions: {
      reportDir: 'cypress/report/mocha',
      quite: true,
      overwrite: false,
      html: false,
      json: true,
    },
  },
  pageLoadTimeout: 180000,
  responseTimeout: 120000,
  e2e: {
    // 1337 = local frontend used for local testing
    // 9081 = docker frontend used on CI
    baseUrl: 'http://localhost:4200/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      getCompareSnapshotsPlugin(on, config);

      on('before:browser:launch', (browser, launchOptions) => {
        if (browser.name === 'chrome') {
          launchOptions.args.push('--force-device-scale-factor=1');
          launchOptions.args.push('--window-size=1920,1080');
        }

        if (browser.name === 'electron') {
          launchOptions.preferences.width = 1920;
          launchOptions.preferences.height = 1080;
        }
        return launchOptions;
      });
    },
    specPattern: 'cypress/**/*.cy.{js,jsx,ts,tsx}'
  },
  retries: {
    runMode: 3,
    openMode: 0,
  },
  // By setting the chromeWebSecurity to false, we are allowed to switch between urls which is not possible by default
  chromeWebSecurity: false,
});
