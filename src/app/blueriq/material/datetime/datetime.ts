import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDateFormats } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { BlueriqSession } from '@blueriq/angular';
import { ValueTransformer } from '@blueriq/angular/forms';
import * as moment from 'moment';

export class MomentTransformer implements ValueTransformer<Date, moment.Moment> {

  toControl(value: Date | null): moment.Moment | null {
    return value ? moment(value) : null;
  }

  toField(value: moment.Moment | null): Date | null {
    return value ? value.toDate() : null;
  }
}

export function dateLocaleFactory(session: BlueriqSession): string {
  return session.language.languageCode;
}

export function dateFormatFactory(session: BlueriqSession): MatDateFormats {
  const datePattern = (session.language.patterns.date || 'dd-mm-yyyy')
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

export function dateTimeFormatFactory(session: BlueriqSession): MatDateFormats {
  const dateTimePattern = session.language.patterns.datetime!
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

export const dateLocaleProvider = {
  provide: MAT_DATE_LOCALE,
  useFactory: dateLocaleFactory,
  deps: [BlueriqSession]
};

export const dateAdapterProvider = {
    provide: DateAdapter,
    useClass: MomentDateAdapter
  }
;

export const dateFormatProvider = [
    dateLocaleProvider,
    dateAdapterProvider,
    {
      provide: MAT_DATE_FORMATS,
      useFactory: dateFormatFactory,
      deps: [BlueriqSession]
    }
  ]
;

export const dateTimeFormatProvider = [
  dateLocaleProvider,
  dateAdapterProvider,
  {
    provide: MAT_DATE_FORMATS,
    useFactory: dateTimeFormatFactory,
    deps: [BlueriqSession]
  }
];
