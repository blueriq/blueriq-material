import { BlueriqSession } from '@blueriq/angular';
import { OWL_DATE_TIME_FORMATS, OWL_DATE_TIME_LOCALE, OwlDateTimeFormats, OwlDateTimeIntl } from 'ng-pick-datetime';
import { DefaultDateTimeIntl, DutchIntl, TestInl } from './localization';

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

export function DateTimeIntlFactory(session: BlueriqSession): any {
  const locale = localeFactory(session);
  if (locale.endsWith('NL')) {
    return DutchIntl;
  }
  return DefaultDateTimeIntl;
}

export function intlFactory(locale: string): any {
  if (locale !== undefined) {
    return {
      provide: OwlDateTimeIntl,
      useClass: DefaultDateTimeIntl
    };
  }
  return {
    provide: OwlDateTimeIntl,
    useClass: DutchIntl
  };
}

export const dateTimeFormatProvider = [
  {
    provide: OWL_DATE_TIME_LOCALE,
    useFactory: localeFactory,
    deps: [BlueriqSession]
  },
  {
    provide: OWL_DATE_TIME_FORMATS,
    useFactory: dateTimeFormatFactory,
    deps: [BlueriqSession]
  },
  // {
  //   provide: OwlDateTimeIntl,
  //   useClass: DutchIntl
  // }
  // intlFactory()
  {
    provide: OwlDateTimeIntl,
    useClass: TestInl,
    deps: [OWL_DATE_TIME_LOCALE]
  }
];
