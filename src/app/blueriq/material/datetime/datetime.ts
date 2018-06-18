import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDateFormats } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { BlueriqSession } from '@blueriq/angular';
import { ValueTransformer } from '@blueriq/angular/forms';
import * as moment from 'moment';
import { DateTimeAdapter, OWL_DATE_TIME_FORMATS, OWL_DATE_TIME_LOCALE, OwlDateTimeFormats } from 'ng-pick-datetime';
import { MomentDateTimeAdapter } from 'ng-pick-datetime-moment';

export class MomentTransformer implements ValueTransformer<Date, moment.Moment> {

  toControl(value: Date | null): moment.Moment | null {
    return value ? moment(value) : null;
  }

  toField(value: moment.Moment | null): Date | null {
    return value ? value.toDate() : null;
  }
}

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
  ]
;

export function dateTimeFormatFactory(session: BlueriqSession): OwlDateTimeFormats {
  const dateTimePattern = session.language.patterns.datetime || 'DD-MM-YYYY HH:mm:ss';
  const parts = dateTimePattern.split(' ');
  const datePattern = parts[0].toUpperCase();
  const timePattern = parts[1].replace('hh', 'HH');
  return {
    parseInput: datePattern + ' ' + timePattern,
    fullPickerInput: datePattern + ' ' + timePattern,
    datePickerInput: datePattern,
    timePickerInput: timePattern,
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: datePattern + ' ' + timePattern,
    monthYearA11yLabel: 'MMMM YYYY'
  };
}

export const dateTimeFormatProvider = [
  {
    provide: OWL_DATE_TIME_LOCALE,
    useFactory: localeFactory,
    deps: [BlueriqSession]
  },
  {
    provide: DateTimeAdapter,
    useClass: MomentDateTimeAdapter
  },
  {
    provide: OWL_DATE_TIME_FORMATS,
    useFactory: dateTimeFormatFactory,
    deps: [BlueriqSession]
  }
];
