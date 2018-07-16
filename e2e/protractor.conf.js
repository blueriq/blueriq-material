// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const {SpecReporter} = require('jasmine-spec-reporter');

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './src/**/*.e2e-spec.ts'
  ],
  multiCapabilities: [
   {
     browserName: 'chrome',
     chromeOptions: {
       args: ['--headless', '--disable-gpu', '--window-size=1024x786']
     }
   },
   {
     browserName: 'firefox',
     marionette: true,
     'moz:firefoxOptions': {
       args: [ "--headless" ],
       binary: "D:\\tools\\protractor\\geckodriver-v0.21.0.exe"
     }
   }
  ],
  maxSessions: 1,
  seleniumServerJar: '../../../../../../../tools/protractor/selenium-server-standalone-3.13.0.jar',
  chromeDriver: '../../../../../../../tools/protractor/chromedriver_2.40.exe',
  geckoDriver: '‪../../../../../../../tools/protractor/geckodriver-v0.21.0.exe',
  directConnect: true,
  baseUrl: '***REMOVED***',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
  },
  localSeleniumStandaloneOpts: {
    jvmArgs: ["-Dwebdriver.gecko.driver=‪D:\\tools\\protractor\\geckodriver-v0.21.0.exe"]
  },
  onPrepare() {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.e2e.json')
    });
    jasmine.getEnv().addReporter(new SpecReporter({spec: {displayStacktrace: true}}));
  }
};
