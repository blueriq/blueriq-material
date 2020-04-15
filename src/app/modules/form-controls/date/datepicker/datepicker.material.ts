import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MatDateFormats, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { BlueriqSession } from '@blueriq/angular';
import { parseBqLocale } from '@shared/date/bq-date-parser';

export function localeFactory(session: BlueriqSession): string {
  return parseBqLocale(session.localization);
}

export function dateFormatFactory(session: BlueriqSession): MatDateFormats {
  const dateFormats = session.localization.dateFormats;
  const datePattern = dateFormats.date.inputFormat;
  return {
    parse: {
      dateInput: datePattern,
    },
    display: {
      dateInput: datePattern,
      monthYearLabel: 'MMMM YYYY',
      dateA11yLabel: datePattern,
      monthYearA11yLabel: 'MMMM YYYY',
    },
  };
}

export const dateFormatProvider = [
  {
    provide: MAT_DATE_LOCALE,
    useFactory: localeFactory,
    deps: [BlueriqSession],
  },
  {
    provide: DateAdapter,
    useClass: MomentDateAdapter,
  },
  {
    provide: MAT_DATE_FORMATS,
    useFactory: dateFormatFactory,
    deps: [BlueriqSession],
  },
];
