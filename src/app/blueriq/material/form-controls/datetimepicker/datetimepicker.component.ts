import { Component, Host, OnInit } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { BlueriqFormBuilder } from '@blueriq/angular/forms';
import { Field } from '@blueriq/core';
import { MomentTransformer } from '../../../generic/moment/moment-transfer';
import { dateTimeFormatProvider } from './datetime.owl';

@Component({
  selector: 'bq-datetimepicker',
  templateUrl: './datetimepicker.component.html',
  styleUrls: ['./datetimepicker.component.scss'],
  providers: [dateTimeFormatProvider]
})
@BlueriqComponent({
  type: Field,
  selector: '[dataType=date],[dataType=datetime]'
})
export class DateTimepickerComponent implements OnInit {

  formControl = this.form.control(this.field, { updateOn: 'blur', transformer: MomentTransformer });

  constructor(@Host() public field: Field,
              private form: BlueriqFormBuilder) {
  }

  ngOnInit(): void {
    if (this.isDisabled()) {
      this.formControl.disable();
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

  /** Whether the select has a presentation style Disabled */
  isDisabled() {
    return this.field.styles.has('Disabled');
  }

  /** Whether the string field is read only */
  isReadonly() {
    return this.field.readonly;
  }

  /** Show only the datepicker when the field datatype is `date` */
  getPickerType(): string {
    if (this.field.dataType === 'date') {
      return 'calendar';
    }
    return 'both';
  }

}
