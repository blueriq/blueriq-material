// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const {SpecReporter} = require('jasmine-spec-reporter');
var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './src/**/*.e2e-spec.ts'
  ],
  multiCapabilities: [
    {
      browserName: 'chrome',
      chromeOptions: {
        args: ['--headless', '--disable-gpu', '--window-size=1366x786'],
        binary: process.env.CHROME_BIN
      }
    },
    {
      browserName: 'firefox',
      marionette: true,
      'moz:firefoxOptions': {
        args: ['--headless'],
        binary: process.env.FIREFOX_BIN
      }
    }
  ],
  maxSessions: 1,
  chromeDriver: process.env.CHROME_DRIVER,
  geckoDriver: process.env.GECKO_DRIVER,
  directConnect: true,
  baseUrl: 'http://somehost.somedomain:1234/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
  },
  onPrepare() {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.e2e.json')
    });
    jasmine.getEnv().addReporter(new SpecReporter({spec: {displayStacktrace: true}}));

    return browser.getCapabilities().then(function (value) {
      var reportName = value.get('browserName');
      jasmine.getEnv().addReporter(new Jasmine2HtmlReporter({
        savePath: './testresults',
        cleanDestination: false,
        screenshotsFolder: 'images',
        takeScreenshots: true,
        takeScreenshotsOnlyOnFailures: true,
        fileName: reportName + ".html"
      }));
    });
  }
};
