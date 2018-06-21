import { BlueriqSession } from '@blueriq/angular';
import { LanguageConfiguration } from '@blueriq/core';
import { dateTimeFormatFactory, localeFactory } from './datetime.owl';

describe('Owl datetime util', () => {
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
    const locale = localeFactory(BlueriqSession.prototype);
    expect(locale).toEqual('nl-NL');
  });

  it('should return Dutch datetime formatting', () => {
    mockSession.and.returnValue(dutchLanguage);
    const formatting = dateTimeFormatFactory(BlueriqSession.prototype);
    expect(formatting.parseInput).toEqual('DD-MM-YYYY HH:mm:ss');
  });

  it('should return British datetime formatting', () => {
    mockSession.and.returnValue(britishLanguage);
    const formatting = dateTimeFormatFactory(BlueriqSession.prototype);
    expect(formatting.parseInput).toEqual('YYYY-MM-DD HH:mm:ss');
  });

  it('should return default datetime formatting', () => {
    mockSession.and.returnValue({
      languageCode: '',
      patterns: {}
    });
    const formatting = dateTimeFormatFactory(BlueriqSession.prototype);
    expect(formatting.parseInput).toEqual('DD-MM-YYYY HH:mm:ss');
  });

  it('should return custom datetime formatting', () => {
    mockSession.and.returnValue({
      languageCode: '',
      patterns: {
        datetime: 'mm/dd/yythh:mm:ss'
      }
    });
    const formatting = dateTimeFormatFactory(BlueriqSession.prototype);
    expect(formatting.parseInput).toEqual('MM/DD/YY HH:mm:ss');
  });

  it('should return default datetime formatting on invalid pattern', () => {
    mockSession.and.returnValue({
      languageCode: '',
      patterns: {
        datetime: 'mm-yyyyss'
      }
    });
    const formatting = dateTimeFormatFactory(BlueriqSession.prototype);
    expect(formatting.parseInput).toEqual('DD-MM-YYYY HH:mm:ss');
  });
});
