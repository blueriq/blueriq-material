import { BlueriqSession } from '@blueriq/angular';
import { parseBqLocale } from '@shared/date/bq-date-parser';
import {
  DateTimeAdapter,
  OWL_DATE_TIME_FORMATS,
  OWL_DATE_TIME_LOCALE,
  OwlDateTimeFormats,
  OwlDateTimeIntl,
} from 'ng-pick-datetime';
import { MomentDateTimeAdapter } from 'ng-pick-datetime-moment';
import { OwlDateTimeIntlFactory } from '../../../../configuration/date/owl-datetime-intl-factory';

export function localeFactory(session: BlueriqSession): string {
  return parseBqLocale(session.localization);
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
