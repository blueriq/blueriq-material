import { BlueriqSession } from '@blueriq/angular';
import * as moment from 'moment';

export const DEFAULT_DATE_PATTERN = 'DD-MM-YYYY';
export const DEFAULT_DATETIME_PATTERN = 'DD-MM-YYYY HH:mm:ss';
export const BACKEND_DATETIME_PATTERN = 'YYYY-MM-DDTHH:mm:ss';
export const DEFAULT_DATE_FROM_NOW_FORMAT = 'LL';
export const DEFAULT_DATETIME_FROM_NOW_FORMAT = 'LLL';

export interface BqDateTime {
  datePattern: string;
  timePattern: string;
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
 * @returns {BqDateTime} an object that contains date, time and datetime patterns in ISO 8601 format
 * @param {BlueriqSession} session the current session containing the datetime patterns
 */
export function parseBqDateTimePattern(session: BlueriqSession): BqDateTime {
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

/**
 * Converts a JS Date object to a moment object, based on the locale and datetime format existing
 * in the Blueriq session
 * @param date the JS Date object
 * @param session the Blueriq session
 * @returns a moment object
 */
export function convertBqDateToMoment(date: Date, session: BlueriqSession): moment.Moment {
  moment.locale(parseBqLocale(session));
  const bqDateTime = parseBqDateTimePattern(session);
  return moment(date, bqDateTime.dateTimePattern);
}

/**
 * Provides a human readable form of the given date relative to now. If the given date is more
 * than a week ago, the full date is outputted. If less than a week ago, the date is described
 * as <period> ago, where period is seconds, minutes, hours or days.
 * @param date the date to convert to human readable form
 * @param session the blueriq Session containing information how to parse JS Date objects
 * @param showTime optional parameter to display the time when the date is more than a week ago (default true)
 * @returns a string describing how long the given date is from now, or a full date when
 * this is more than a week ago
 */
export function dateFromNowHumanReadable(date: Date, session: BlueriqSession, showTime = true): string {
  const mdate = convertBqDateToMoment(date, session);
  if (moment().diff(mdate, 'days') >= 7) {
    return mdate.format(showTime ? DEFAULT_DATETIME_FROM_NOW_FORMAT : DEFAULT_DATE_FROM_NOW_FORMAT);
  }
  return mdate.fromNow(false);
}

/**
 * Converts a JS Date object to a short time (hours:minutes) string
 * @param date the JS Date object
 * @param session the Blueriq session containing information on how to parse the date
 * @returns string with the time (24H notation)
 */
export function dateToShortTime(date: Date, session: BlueriqSession): string {
  const mdate = convertBqDateToMoment(date, session);
  return mdate.format('HH:mm');
}

export function momentToBackendFormat(momentDate: moment.Moment) {
  return momentDate.format(BACKEND_DATETIME_PATTERN);
}

/**
 * Retrieves the first day of the week based on the locale in the Blueriq session
 * @returns {number} the first day of the week (0 = Sunday, 1 = Monday ... 6 = Saturday)
 */
export function computeFirstDayOfWeek(session: BlueriqSession): number {
  return moment.localeData(parseBqLocale(session)).firstDayOfWeek();
}
