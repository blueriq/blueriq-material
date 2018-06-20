import { BlueriqSession } from '@blueriq/angular';
import {
  DateTimeAdapter,
  OWL_DATE_TIME_FORMATS,
  OWL_DATE_TIME_LOCALE,
  OwlDateTimeFormats,
  OwlDateTimeIntl
} from 'ng-pick-datetime';
import { MomentDateTimeAdapter } from 'ng-pick-datetime-moment';
import { OwlDateTimeIntlFactory } from '../../../generic/owl/owl-datetime-intl-factory';

export function localeFactory(session: BlueriqSession): string {
  return session.language.languageCode;
}

export function dateTimeFormatFactory(session: BlueriqSession): OwlDateTimeFormats {
  const dateTimePattern = session.language.patterns.datetime || 'DD-MM-YYYY HH:mm:ss';
  const parts = dateTimePattern.split(' ');
  const datePattern = parts[0].toUpperCase();
  const timePattern = parts[1].replace('hh', 'HH');
  return {
    parseInput: datePattern + ' ' + timePattern,
    fullPickerInput: datePattern + ' ' + timePattern,
    datePickerInput: datePattern,
    timePickerInput: timePattern,
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: datePattern + ' ' + timePattern,
    monthYearA11yLabel: 'MMMM YYYY'
  };
}

export const dateTimeFormatProvider = [
  {
    provide: OWL_DATE_TIME_LOCALE,
    useFactory: localeFactory,
    deps: [BlueriqSession]
  },
  {
    provide: DateTimeAdapter,
    useClass: MomentDateTimeAdapter
  },
  {
    provide: OWL_DATE_TIME_FORMATS,
    useFactory: dateTimeFormatFactory,
    deps: [BlueriqSession]
  },
  {
    provide: OwlDateTimeIntl,
    useFactory: OwlDateTimeIntlFactory,
    deps: [OWL_DATE_TIME_LOCALE]
  }
];
