import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDateFormats } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { BlueriqSession } from '@blueriq/angular';

function dateLocaleFactory(session: BlueriqSession): string {
  return session.language.languageCode!;
}

function dateFormatFactory(session: BlueriqSession): MatDateFormats {
  let datePattern = session.language.patterns.date!
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

function dateTimeFormatFactory(session: BlueriqSession): MatDateFormats {
  let dateTimePattern = session.language.patterns.datetime!
  // transform lowercase hour (hh) to uppercase (HH)
  .replace('h', 'H');
  return {
    parse: {
      dateInput: dateTimePattern
    },
    display: {
      dateInput: dateTimePattern,
      monthYearLabel: 'MMMM YYYY',
      dateA11yLabel: dateTimePattern,
      monthYearA11yLabel: 'MMMM YYYY'
    }
  };
}

let dateLocaleProvider =
  {
    provide: MAT_DATE_LOCALE,
    useFactory: dateLocaleFactory,
    deps: [BlueriqSession]
  };

let dateAdapterProvider =
  {
    provide: DateAdapter,
    useClass: MomentDateAdapter
  }
;

export let dateFormatProvider = [
    dateLocaleProvider,
    dateAdapterProvider,
    {
      provide: MAT_DATE_FORMATS,
      useFactory: dateFormatFactory,
      deps: [BlueriqSession]
    }
  ]
;

export let dateTimeFormatProvider = [
  dateLocaleProvider,
  dateAdapterProvider,
  {
    provide: MAT_DATE_FORMATS,
    useFactory: dateTimeFormatFactory,
    deps: [BlueriqSession]
  }
];
