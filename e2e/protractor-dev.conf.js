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
     args: ['--headless', '--disable-gpu', '--window-size=1366x786']
   }
  ],
  maxSessions: 1,
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
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

    return browser.getCapabilities().then(function(value) {
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
