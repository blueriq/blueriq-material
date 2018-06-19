import { Component, Host, OnInit } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { BlueriqFormBuilder } from '@blueriq/angular/forms';
import { Field } from '@blueriq/core';
import { MomentTransformer } from '../../../generic/moment/moment-transfer';
import { dateFormatProvider } from './datetime.material';

@Component({
  selector: 'bq-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  providers: [dateFormatProvider]
})
@BlueriqComponent({
  type: Field,
  selector: '.material[dataType=date]'
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
