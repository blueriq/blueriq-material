import { getLocaleId } from '@angular/common';
import { BlueriqSession } from '@blueriq/angular';
import {
  DateTimeAdapter,
  MomentDateTimeAdapter,
  OwlDateTimeFormats,
  OwlDateTimeIntl,
  OWL_DATE_TIME_FORMATS,
  OWL_DATE_TIME_LOCALE,
} from '@danielmoncada/angular-datetime-picker';
import { parseBqLocale } from '@shared/date/bq-date-parser';
import { OwlDateTimeIntlFactory } from '../../../../configuration/date/owl-datetime-intl-factory';

export function localeFactory(session: BlueriqSession): string {
  const locale = parseBqLocale(session.localization);
  // BQ-12086: missing Angular locale causes an exception when rendering the datepicker.
  // A fix is pending in https://github.com/danielmoncada/date-time-picker/pull/115. This can, and should be removed
  // once that has been incorporated into a release of `@danielmoncada/angular-datetime-picker`.
  try {
    getLocaleId(locale);
  } catch {
    return 'en-US';
  }
  return locale;
}

export function dateTimeFormatFactory(session: BlueriqSession): OwlDateTimeFormats {
  const dateFormats = session.localization.dateFormats;
  return {
    parseInput: dateFormats.dateTime.inputFormat,
    fullPickerInput: dateFormats.dateTime.inputFormat,
    datePickerInput: dateFormats.date.inputFormat,
    timePickerInput: dateFormats.time.inputFormat,
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: dateFormats.dateTime.inputFormat,
    monthYearA11yLabel: 'MMMM YYYY',
  };
}

export const dateTimeFormatProvider = [
  {
    provide: OWL_DATE_TIME_LOCALE,
    useFactory: localeFactory,
    deps: [BlueriqSession],
  },
  {
    provide: DateTimeAdapter,
    useClass: MomentDateTimeAdapter,
  },
  {
    provide: OWL_DATE_TIME_FORMATS,
    useFactory: dateTimeFormatFactory,
    deps: [BlueriqSession],
  },
  {
    provide: OwlDateTimeIntl,
    useFactory: OwlDateTimeIntlFactory,
    deps: [OWL_DATE_TIME_LOCALE],
  },
];
