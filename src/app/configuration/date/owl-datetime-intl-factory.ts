import { OwlDateTimeIntl } from 'ng-pick-datetime';
import { OwlDatetimeIntlDefault } from './owl-datetime-intl-default';
import { OwlDatetimeIntlNL } from './owl-datetime-intl-NL';

/**
 * This factory returns a class that contains the text labels used by the owl datetime picker.
 * If something that matches the language specified in the locale is available, that is returned.
 * Otherwise the default (English) is returned.
 *
 * If you want to provide a class for a language that is not yet available, create an
 * OwlDatetimeIntl<your language> implementation and have this factory return it
 *
 * @param {string} locale the locale used to determine the language requested
 * @returns {OwlDateTimeIntl} a class with text labels in a specific language
 */
export function OwlDateTimeIntlFactory(locale: string): OwlDateTimeIntl {
  if (locale && locale.toUpperCase().startsWith('NL')) {
    return new OwlDatetimeIntlNL();
  }
  return new OwlDatetimeIntlDefault();
}
