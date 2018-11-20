// This file is required by karma.conf.js and loads recursively all the .spec and framework files

// tslint:disable:ordered-imports Specific order is important
import 'hammerjs';
import 'zone.js/dist/zone-testing';
import { getTestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { TestContext } from '@blueriq/core/testing';
import { MomentDateFormatting } from '@shared/date/date-formatting-library';
// tslint:enable:ordered-imports

declare const require: any;

TestContext.DEFAULT.dateLibrary = new MomentDateFormatting();

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
);
// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);
