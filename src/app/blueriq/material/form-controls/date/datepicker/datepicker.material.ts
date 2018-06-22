import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDateFormats } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { BlueriqSession } from '@blueriq/angular';

export function localeFactory(session: BlueriqSession): string {
  return session.language.languageCode;
}

export function dateFormatFactory(session: BlueriqSession): MatDateFormats {
  const datePattern = (session.language.patterns.date || 'DD-MM-YYYY')
  // year, month and date are all uppercase
  .toUpperCase();
  return {
    parse: {
      dateInput: datePattern
    },
    display: {
      dateInput: datePattern,
      monthYearLabel: 'MMMM YYYY',
      dateA11yLabel: datePattern,
      monthYearA11yLabel: 'MMMM YYYY'
    }
  };
}

export const dateFormatProvider = [
  {
    provide: MAT_DATE_LOCALE,
    useFactory: localeFactory,
    deps: [BlueriqSession]
  },
  {
    provide: DateAdapter,
    useClass: MomentDateAdapter
  },
  {
    provide: MAT_DATE_FORMATS,
    useFactory: dateFormatFactory,
    deps: [BlueriqSession]
  }
];
