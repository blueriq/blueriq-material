import { Component, Host, OnInit } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { BlueriqFormBuilder, ValueTransformer } from '@blueriq/angular/forms';
import { Field } from '@blueriq/core';
import * as momentNs from 'moment';
import { dateFormatProvider } from '../../datetime/datetime';

const moment = momentNs;

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  providers: [dateFormatProvider]
})
@BlueriqComponent({
  type: Field,
  selector: '[dataType=date]'
})
export class DatepickerComponent implements OnInit {

  formControl = this.form.control(this.field, { updateOn: 'blur', transformer: MomentTransformer });

  constructor(@Host() public field: Field,
              private form: BlueriqFormBuilder) {
  }

  ngOnInit(): void {
    if (this.isDisabled()) {
      this.formControl.disable();
    }
    // this.formControl.setValue(this.field.getValue());
  }

  /** Whether the select has a presentation style Disabled */
  isDisabled() {
    return this.field.styles.has('Disabled');
  }

  /** Whether the string field is read only */
  isReadonly() {
    return this.field.readonly;
  }

}

export class MomentTransformer implements ValueTransformer<Date, momentNs.Moment> {

  toControl(value: Date | null): momentNs.Moment | null {
    return value ? moment(value) : null;
  }

  toField(value: momentNs.Moment | null): Date | null {
    return value ? value.toDate() : null;
  }
}
