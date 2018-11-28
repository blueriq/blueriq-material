import { LocalizationTemplate } from '@blueriq/core/testing';
import * as moment from 'moment';
import {
  computeFirstDayOfWeek,
  dateFromNowHumanReadable,
  dateToShortTime,
  DEFAULT_DATE_FROM_NOW_FORMAT,
  DEFAULT_DATE_PATTERN,
  DEFAULT_DATETIME_FROM_NOW_FORMAT,
  DEFAULT_DATETIME_PATTERN,
  DEFAULT_TIME_PATTERN,
  parseBqLocale,
  provideDateFormats,
} from './bq-date-parser';

describe('bq-date-parser', () => {

  const dutchLocalization = LocalizationTemplate.create().date('dd-mm-yyyy').dateTime('dd-mm-yyyy hh:mm:ss').languageCode('nl-NL').build();
  const usLocalization = LocalizationTemplate.create().date('yyyy-mm-dd').dateTime('yyyy-mm-dd hh:mm:ss').languageCode('en-US').build();

  describe('DateFormats', () => {

    const dateFormats = provideDateFormats();

    it('should be configured properly', () => {
      expect(dateFormats.date.inputFormat).toEqual(DEFAULT_DATE_PATTERN);
      expect(dateFormats.time.inputFormat).toEqual(DEFAULT_TIME_PATTERN);
      expect(dateFormats.dateTime.inputFormat).toEqual(DEFAULT_DATETIME_PATTERN);
    });

    it('should format', () => {
      const date = new Date(2018, 10 - 1, 18, 12, 34, 56);

      expect(dateFormats.date.format(date)).toEqual('18-10-2018');
      expect(dateFormats.time.format(date)).toEqual('12:34:56');
      expect(dateFormats.dateTime.format(date)).toEqual('18-10-2018 12:34:56');
    });

  });

  describe('parseBqLocale', () => {

    it('should return Dutch locale', () => {
      const locale = parseBqLocale(dutchLocalization);
      expect(locale).toEqual('nl-NL');
    });

  });

  describe('dateFromNowHumanReadable', () => {

    it('should output timestamp when the date is a week ago or longer', () => {
      const aWeekAgo = new Date();
      aWeekAgo.setDate(new Date().getDate() - 7);
      const readable = dateFromNowHumanReadable(aWeekAgo, dutchLocalization);
      expect(readable).toEqual(moment(aWeekAgo).format(DEFAULT_DATETIME_FROM_NOW_FORMAT));
    });

    it('should output datestamp when the date is a week ago or longer', () => {
      const aWeekAgo = new Date();
      aWeekAgo.setDate(new Date().getDate() - 7);
      const readable = dateFromNowHumanReadable(aWeekAgo, dutchLocalization, false);
      expect(readable).toEqual(moment(aWeekAgo).format(DEFAULT_DATE_FROM_NOW_FORMAT));
    });

    it('should output human readable length of time when date is shorter than a week ago ', () => {
      const aDayAgo = new Date();
      aDayAgo.setDate(new Date().getDate() - 1);
      const readable = dateFromNowHumanReadable(aDayAgo, dutchLocalization);
      expect(readable).toEqual(moment(aDayAgo).fromNow(false));
    });

  });

  describe('dateToShortTime', () => {

    it('should output short time', () => {
      const date = new Date();
      const readable = dateToShortTime(date, dutchLocalization);
      expect(readable).toEqual(moment(date).format('HH:mm'));
    });

  });

  describe('computeFirstDayOfWeek', () => {

    it('first day of week with US locale is Sunday', () => {
      expect(computeFirstDayOfWeek(usLocalization)).toEqual(0);
    });

    it('first day of week with Dutch locale is Monday', () => {
      expect(computeFirstDayOfWeek(dutchLocalization)).toEqual(1);
    });

  });

});
