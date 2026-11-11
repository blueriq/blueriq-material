import { provideZoneChangeDetection } from '@angular/core';
import { TestContext } from '@blueriq/core/testing';
import { MomentDateFormatting } from '@shared/date/date-formatting-library';

TestContext.DEFAULT.dateLibrary = new MomentDateFormatting();

export default [provideZoneChangeDetection()];
