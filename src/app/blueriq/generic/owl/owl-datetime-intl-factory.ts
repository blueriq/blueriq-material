import { OwlDateTimeIntl } from 'ng-pick-datetime';
import { OwlDatetimeIntlDefault } from './owl-datetime-intl-default';
import { OwlDatetimeIntlNL } from './owl-datetime-intl-NL';

export function OwlDateTimeIntlFactory(locale: string): OwlDateTimeIntl {
  if (locale.toUpperCase().startsWith('NL')) {
    return new OwlDatetimeIntlNL();
  }
  return new OwlDatetimeIntlDefault();
}
