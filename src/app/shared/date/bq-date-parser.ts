import { DateFormats, Localization } from '@blueriq/core';
import { MomentDateFormatting } from '@shared/date/date-formatting-library';
import * as moment from 'moment';

export const DEFAULT_DATE_PATTERN = 'DD-MM-YYYY';
export const DEFAULT_TIME_PATTERN = 'HH:mm:ss';
export const DEFAULT_DATETIME_PATTERN = 'DD-MM-YYYY HH:mm:ss';
export const DEFAULT_DATE_FROM_NOW_FORMAT = 'LL';
export const DEFAULT_DATETIME_FROM_NOW_FORMAT = 'LLL';

export function provideDateFormats(): DateFormats {
  return new DateFormats(new MomentDateFormatting(), {
    date: DEFAULT_DATE_PATTERN,
    time: DEFAULT_TIME_PATTERN,
    dateTime: DEFAULT_DATETIME_PATTERN,
  }, 'en-US');
}

/**
 * Retrieves the locale from the Blueriq session. Currently the specified languageCode is returned as is
 * @param localization the localization information to use
 * @returns locale
 */
export function parseBqLocale(localization: Localization): string {
  return localization.languageCode;
}

/**
 * Converts a JS Date object to a moment object, using the specified localization
 * @param date the JS Date object
 * @param localization the localization information to use
 * @returns a moment object
 */
export function convertBqDateToMoment(date: Date, localization: Localization): moment.Moment {
  moment.locale(parseBqLocale(localization));
  return moment(date, localization.dateFormats.dateTime.inputFormat);
}

/**
 * Provides a human readable form of the given date relative to now. If the given date is more
 * than a week ago, the full date is outputted. If less than a week ago, the date is described
 * as <period> ago, where period is seconds, minutes, hours or days.
 * @param date the date to convert to human readable form
 * @param localization the localization information to use
 * @param showTime optional parameter to display the time when the date is more than a week ago (default true)
 * @returns a string describing how long the given date is from now, or a full date when
 * this is more than a week ago
 */
export function dateFromNowHumanReadable(date: Date, localization: Localization, showTime = true): string {
  const mdate = convertBqDateToMoment(date, localization);
  if (moment().diff(mdate, 'days') >= 7) {
    return mdate.format(showTime ? DEFAULT_DATETIME_FROM_NOW_FORMAT : DEFAULT_DATE_FROM_NOW_FORMAT);
  }
  return mdate.fromNow(false);
}

/**
 * Converts a JS Date object to a short time (hours:minutes) string
 * @param date the JS Date object
 * @param localization the localization information to use
 * @returns string with the time (24H notation)
 */
export function dateToShortTime(date: Date, localization: Localization): string {
  const mdate = convertBqDateToMoment(date, localization);
  return mdate.format('HH:mm');
}

/**
 * Retrieves the first day of the week based on the locale in the Blueriq session
 * @returns the first day of the week (0 = Sunday, 1 = Monday ... 6 = Saturday)
 */
export function computeFirstDayOfWeek(localization: Localization): number {
  return moment.localeData(parseBqLocale(localization)).firstDayOfWeek();
}
