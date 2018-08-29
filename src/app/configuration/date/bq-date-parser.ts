import { BlueriqSession } from '@blueriq/angular';

export const DEFAULT_DATE_PATTERN = 'DD-MM-YYYY';
export const DEFAULT_DATETIME_PATTERN = 'DD-MM-YYYY HH:mm:ss';

export interface bqDateTime {
  datePattern: string,
  timePattern: string,
  dateTimePattern: string;
}

/**
 * Retrieves the locale from the Blueriq session. Currently the specified languageCode is returned as is
 * @param {BlueriqSession} session the current session containing the used language configuration
 * @returns {string} locale
 */
export function parseBqLocale(session: BlueriqSession): string {
  return session.language.languageCode;
}

/**
 * Converts the date pattern in the Blueriq sesion to an ISO 8601 date format. If no date pattern can be
 * found in the session, the {@link DEFAULT_DATE_PATTERN} is returned.
 * @param {BlueriqSession} session the current session containing the date pattern
 */
export function parseBqDatePattern(session: BlueriqSession): string {
  const datePattern = session.language.patterns.date || DEFAULT_DATE_PATTERN;
  // year, month and day all need to be uppercase, in blueriq everything is lowercase
  return datePattern.toUpperCase();
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
 * @returns {bqDateTime} an object that contains date, time and datetime patterns in ISO 8601 format
 * @param {BlueriqSession} session the current session containing the datetime patterns
 */
export function parseBqDateTimePattern(session: BlueriqSession): bqDateTime {
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
    datePattern: datePattern,
    timePattern: timePattern,
    dateTimePattern: datePattern + ' ' + timePattern
  };
}
