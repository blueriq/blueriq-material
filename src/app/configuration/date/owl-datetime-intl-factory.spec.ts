import { OwlDatetimeIntlDefault } from './owl-datetime-intl-default';
import { OwlDateTimeIntlFactory } from './owl-datetime-intl-factory';
import { OwlDatetimeIntlNL } from './owl-datetime-intl-NL';

describe('OwlDateTimeIntlFactory', () => {
  it('no locale returns default', () => {
    const locale = '';
    const owlDateTimeIntl = OwlDateTimeIntlFactory(locale);
    expect(owlDateTimeIntl).toEqual(jasmine.any(OwlDatetimeIntlDefault));
  });

  it('Dutch locale returns Dutch labels', () => {
    const locale = 'nl-NL';
    const owlDateTimeIntl = OwlDateTimeIntlFactory(locale);
    expect(owlDateTimeIntl).toEqual(jasmine.any(OwlDatetimeIntlNL));
  });

  it('other locale with Dutch language returns dutch labels', () => {
    const locale = 'nl-BE';
    const owlDateTimeIntl = OwlDateTimeIntlFactory(locale);
    expect(owlDateTimeIntl).toEqual(jasmine.any(OwlDatetimeIntlNL));
  });

  it('French locale (no implementation available yet) returns default', () => {
    const locale = 'fr-FR';
    const owlDateTimeIntl = OwlDateTimeIntlFactory(locale);
    expect(owlDateTimeIntl).toEqual(jasmine.any(OwlDatetimeIntlDefault));
  });
});
