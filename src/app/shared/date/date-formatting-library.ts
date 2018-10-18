import { DateFormattingLibrary } from '@blueriq/core';
import * as moment from 'moment';

export class MomentDateFormatting implements DateFormattingLibrary {

  format(date: Date, dateFormat: string, languageCode: string): string {
    return moment(date).format(dateFormat);
  }

  parse(value: string, dateFormat: string, languageCode: string): Date | null {
    const date = moment(value, dateFormat);

    return date.isValid() ? date.toDate() : null;
  }

}
