import { BlueriqSession } from '@blueriq/angular';
import { LanguageConfiguration } from '@blueriq/core';
import * as moment from 'moment';
import {
  computeFirstDayOfWeek,
  dateFromNowHumanReadable,
  dateToShortTime,
  DEFAULT_DATE_FROM_NOW_FORMAT,
  DEFAULT_DATETIME_FROM_NOW_FORMAT,
  parseBqDatePattern,
  parseBqDateTimePattern,
  parseBqLocale
} from './bq-date-parser';

describe('bq-date-parser', () => {
  let mockSession: any;
  const dutchLanguage: LanguageConfiguration = {
    languageCode: 'nl-NL',
    patterns: {
      date: 'dd-mm-yyyy',
      datetime:
        'dd-mm-yyyy hh:mm:ss'
    }
  };
  const britishLanguage: LanguageConfiguration = {
    languageCode: 'en-GB',
    patterns: {
      date: 'yyyy-mm-dd',
      datetime:
        'yyyy-mm-dd hh:mm:ss'
    }
  };

  beforeAll(() => {
      mockSession = spyOnProperty(BlueriqSession.prototype, 'language', 'get');
    }
  );

  it('should return Dutch locale', () => {
    mockSession.and.returnValue(dutchLanguage);
    const locale = parseBqLocale(BlueriqSession.prototype);
    expect(locale).toEqual('nl-NL');
  });

  it('should return Dutch datetime formatting', () => {
    mockSession.and.returnValue(dutchLanguage);
    const bqDate = parseBqDatePattern(BlueriqSession.prototype);
    expect(bqDate).toEqual('DD-MM-YYYY');
    const bqDateTime = parseBqDateTimePattern(BlueriqSession.prototype);
    expect(bqDateTime.dateTimePattern).toEqual('DD-MM-YYYY HH:mm:ss');
  });

  it('should return British datetime formatting', () => {
    mockSession.and.returnValue(britishLanguage);
    const bqDate = parseBqDatePattern(BlueriqSession.prototype);
    expect(bqDate).toEqual('YYYY-MM-DD');
    const bqDateTime = parseBqDateTimePattern(BlueriqSession.prototype);
    expect(bqDateTime.datePattern).toEqual('YYYY-MM-DD');
    expect(bqDateTime.timePattern).toEqual('HH:mm:ss');
    expect(bqDateTime.dateTimePattern).toEqual('YYYY-MM-DD HH:mm:ss');
  });

  it('should return default datetime formatting', () => {
    mockSession.and.returnValue({
      languageCode: '',
      patterns: {}
    });
    const bqDate = parseBqDatePattern(BlueriqSession.prototype);
    expect(bqDate).toEqual('DD-MM-YYYY');
    const bqDateTime = parseBqDateTimePattern(BlueriqSession.prototype);
    expect(bqDateTime.datePattern).toEqual('DD-MM-YYYY');
    expect(bqDateTime.timePattern).toEqual('HH:mm:ss');
    expect(bqDateTime.dateTimePattern).toEqual('DD-MM-YYYY HH:mm:ss');
  });

  it('should return custom datetime formatting', () => {
    mockSession.and.returnValue({
      languageCode: '',
      patterns: {
        date: 'mm/dd/yy',
        datetime: 'mm/dd/yythh:mm:ss'
      }
    });
    const bqDate = parseBqDatePattern(BlueriqSession.prototype);
    expect(bqDate).toEqual('MM/DD/YY');
    const bqDateTime = parseBqDateTimePattern(BlueriqSession.prototype);
    expect(bqDateTime.datePattern).toEqual('MM/DD/YY');
    expect(bqDateTime.timePattern).toEqual('HH:mm:ss');
    expect(bqDateTime.dateTimePattern).toEqual('MM/DD/YY HH:mm:ss');
  });

  it('should return default datetime formatting on invalid pattern', () => {
    mockSession.and.returnValue({
      languageCode: '',
      patterns: {
        datetime: 'mm-yyyyss'
      }
    });
    const formatting = parseBqDateTimePattern(BlueriqSession.prototype);
    expect(formatting.dateTimePattern).toEqual('DD-MM-YYYY HH:mm:ss');
  });

  it('should output timestamp when the date is a week ago or longer', () => {
    mockSession.and.returnValue(dutchLanguage);
    const aWeekAgo = new Date();
    aWeekAgo.setDate(new Date().getDate() - 7);
    const readable = dateFromNowHumanReadable(aWeekAgo, BlueriqSession.prototype);
    expect(readable).toEqual(moment(aWeekAgo).format(DEFAULT_DATETIME_FROM_NOW_FORMAT));
  });

  it('should output datestamp when the date is a week ago or longer', () => {
    mockSession.and.returnValue(dutchLanguage);
    const aWeekAgo = new Date();
    aWeekAgo.setDate(new Date().getDate() - 7);
    const readable = dateFromNowHumanReadable(aWeekAgo, BlueriqSession.prototype, false);
    expect(readable).toEqual(moment(aWeekAgo).format(DEFAULT_DATE_FROM_NOW_FORMAT));
  });

  it('should output human readable length of time when date is shorter than a week ago ', () => {
    mockSession.and.returnValue(dutchLanguage);
    const aDayAgo = new Date();
    aDayAgo.setDate(new Date().getDate() - 1);
    const readable = dateFromNowHumanReadable(aDayAgo, BlueriqSession.prototype);
    expect(readable).toEqual(moment(aDayAgo).fromNow(false));
  });

  it('should output short time', () => {
    mockSession.and.returnValue(dutchLanguage);
    const date = new Date();
    const readable = dateToShortTime(date, BlueriqSession.prototype);
    expect(readable).toEqual(moment(date).format('HH:mm'));
  });

  it('first day of week with US locale is Sunday', () => {
    mockSession.and.returnValue({
      languageCode: 'en-US'
    });
    expect(computeFirstDayOfWeek(BlueriqSession.prototype)).toEqual(0);
  });

  it('first day of week with Dutch locale is Monday', () => {
    mockSession.and.returnValue(dutchLanguage);
    expect(computeFirstDayOfWeek(BlueriqSession.prototype)).toEqual(1);
  });
});
