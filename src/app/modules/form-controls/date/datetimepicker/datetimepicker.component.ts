import { Component, Host } from '@angular/core';
import { BlueriqComponent, BlueriqSession } from '@blueriq/angular';
import { BlueriqFormBuilder, getFieldMessages } from '@blueriq/angular/forms';
import { Field, FieldMessages } from '@blueriq/core';
import { computeFirstDayOfWeek } from '@shared/date/bq-date-parser';
import { BqPresentationStyles } from '../../../BqPresentationStyles';
import { MomentTransformer } from '../moment-transformer';
import { dateTimeFormatProvider } from './datetimepicker.owl';

@Component({
  selector: 'bq-datetimepicker',
  templateUrl: './datetimepicker.component.html',
  providers: [dateTimeFormatProvider],
})
@BlueriqComponent({
  type: Field,
  selector: '[dataType=date],[dataType=datetime]',
})
export class DateTimepickerComponent {

  formControl = this.form.control(this.field, {
    updateOn: 'blur',
    transformer: MomentTransformer,
    disableWhen: BqPresentationStyles.DISABLED,
  });

  firstDayOfWeek: number;

  constructor(@Host() public field: Field,
              private form: BlueriqFormBuilder,
              session: BlueriqSession) {
    this.firstDayOfWeek = computeFirstDayOfWeek(session.localization);
  }

  /**
   * This function is executed every time a user has input a date(time), either through the picker or
   * by typing it directly (onblur). In the latter case, the user input is transformed to a valid date
   * object (Moment instance) or null if it is invalid. By explicitly setting its value (if valid), the
   * formatting is applied to the user input. If invalid, the user input will remain, but the field will
   * be marked as invalid.
   * @param event the change event that contains the user input date and (if valid) the transformed date
   * object (a Moment instance)
   */
  formatOnChange(event: any): void {
    if (event.value) {
      event.source.value = event.value;
    }
  }

  /** Show only the datepicker when the field datatype is `date` */
  getPickerType(): string {
    if (this.field.dataType === 'date') {
      return 'calendar';
    }
    return 'both';
  }

  getMessages(): FieldMessages {
    return getFieldMessages(this.formControl);
  }

  /**
   * Returns if the date(time) input is invalid so an error message can be shown
   */
  invalidInput(): boolean {
    return (this.formControl.errors && this.formControl.errors['owlDateTimeParse']);
  }
}

