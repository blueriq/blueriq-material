import { Injectable } from '@angular/core';
import { ValueTransformer } from '@blueriq/angular/forms';
import moment from 'moment/min/moment-with-locales';

@Injectable()
export class MomentTransformer implements ValueTransformer<Date, moment.Moment> {

  /** Translates a Javascript Date object to a Moment instance (if not null) */
  toControl(value: Date | null): moment.Moment | null {
    return value ? moment(value) : null;
  }

  /** Translates a Moment instance to a Javascript Date object (if not null) */
  toField(value: moment.Moment | null): Date | null {
    return value ? value.toDate() : null;
  }
}
