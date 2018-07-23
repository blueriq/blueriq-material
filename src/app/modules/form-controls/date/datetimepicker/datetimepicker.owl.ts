import { BlueriqSession } from '@blueriq/angular';
import {
  DateTimeAdapter,
  OWL_DATE_TIME_FORMATS,
  OWL_DATE_TIME_LOCALE,
  OwlDateTimeFormats,
  OwlDateTimeIntl
} from 'ng-pick-datetime';
import { MomentDateTimeAdapter } from 'ng-pick-datetime-moment';
import { OwlDateTimeIntlFactory } from '../../../../configuration/date/owl-datetime-intl-factory';

/**
 * Retrieves the locale from the Blueriq session
 * @param {BlueriqSession} session the current session containing the used language configuration
 * @returns {string} locale
 */
export function localeFactory(session: BlueriqSession): string {
  return session.language.languageCode;
}

/**
 * Returns a datetime formatting object based on the datetime formats that exist in the Blueriq
 * session. Note that the datetime format in the Blueriq session is all lowercase, which needs
 * to be translated to the standard (ISO 8601) format.
 *
 * The following datetime formats are supported:
 *
 * <date> <time>
 * <date>t<time>
 *
 * <date> is a combination of year (yy or yyyy), month (mm) and day (dd), in any order,
 * separated by a separator (/ or -)
 * <time> is a combination of hour (hh), minutes (mm) and seconds (ss),
 * separated by a colon (:).
 * The date and time are either separated by a space ( ) or a time separator (t).
 *
 * Note that only 24 hour notation is supported, AM/PM is not supported
 *
 * @param {BlueriqSession} session the current session containing datetime patterns
 * @returns {OwlDateTimeFormats} an object that contains datetime formatting configuration
 */
export function dateTimeFormatFactory(session: BlueriqSession): OwlDateTimeFormats {
  const DEFAULT_DATETIME_PATTERN = 'DD-MM-YYYY HH:mm:ss';

  const dateTimePattern = session.language.patterns.datetime || DEFAULT_DATETIME_PATTERN;
  let parts = dateTimePattern.split(' ');
  if (parts.length !== 2) {
    // split on time designator (lowercase!)
    parts = dateTimePattern.split('t');
    if (parts.length !== 2) {
      // unknown pattern, use the default datetime pattern
      parts = DEFAULT_DATETIME_PATTERN.split(' ');
    }
  }
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
