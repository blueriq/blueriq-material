// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    proxies: {
      '/theme/blueriq/images/': '/base/theme/blueriq/images/'
    },
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      'karma-jasmine',
      'karma-junit-reporter',
      'karma-chrome-launcher',
      'karma-jasmine-html-reporter',
      'karma-coverage-istanbul-reporter',
      '@angular-devkit/build-angular/plugins/karma'
    ],
    reporters: ['progress', 'kjhtml', 'junit', 'coverage-istanbul'],
    browsers: ['Chrome'],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    angularCli: {
      environment: 'dev'
    },
    junitReporter: {
      outputDir: '../testresults',
      outputFile: 'karmatest.xml',
      suite: 'unit',  // whichever prefix you wish to use
      useBrowserName: false
    },

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    // autoWatchBatchDelay: 3000,
    singleRun: false,

    // ---------- coverage below ----------
    // https://github.com/karma-runner/karma-coverage
    // https://github.com/mattlewis92/karma-coverage-istanbul-reporter
    coverageIstanbulReporter: {
      dir: 'coverage',
      fixWebpackSourcePaths: true,
      combineBrowserReports: true,
      verbose: false, // set true for debugging purpose
      reports: [
        'cobertura',
        'html' // for local coverage overview
      ], //echo error %errorlevel%
      skipFilesWithNoCoverage: false,
      thresholds: {
        emitWarning: false,
        global: {
          statements: 80,
          lines: 80,
          branches: 80,
          functions: 80
        },
        each: { // thresholds per file
          statements: 50,
          lines: 50,
          branches: 50,
          functions: 50
        }
      }
    } // end coverageIstanbulReporter
  });
};
