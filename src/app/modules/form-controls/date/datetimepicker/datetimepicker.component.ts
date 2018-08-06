import { Component, Host } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { BlueriqFormBuilder, getFieldMessages } from '@blueriq/angular/forms';
import { Field, FieldMessages } from '@blueriq/core';
import { Moment } from 'moment';
import { DateTimeAdapter } from 'ng-pick-datetime';
import { BqPresentationStyles } from '../../../BqPresentationStyles';
import { MomentTransformer } from '../moment-transformer';
import { dateTimeFormatProvider } from './datetimepicker.owl';

@Component({
  selector: 'bq-datetimepicker',
  templateUrl: './datetimepicker.component.html',
  providers: [dateTimeFormatProvider]
})
@BlueriqComponent({
  type: Field,
  selector: '[dataType=date],[dataType=datetime]'
})
export class DateTimepickerComponent {

  formControl = this.form.control(this.field, {
    updateOn: 'blur',
    transformer: MomentTransformer,
    disableWhen: BqPresentationStyles.DISABLED
  });

  constructor(@Host() public field: Field,
              private form: BlueriqFormBuilder,
              private adapter: DateTimeAdapter<Moment>) {
  }

  /**
   * Retrieves the first day of the week based on the locale set for this component. The
   * default is 1 (Monday).
   * @returns {number} the first day of the week (0 = Sunday, 1 = Monday ... 6 = Saturday)
   */
  getFirstDayOfWeek(): number {
    try {
      return this.adapter.now().creationData().locale.firstDayOfWeek();
    } catch (error) {
      return 1;
    }
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

}
