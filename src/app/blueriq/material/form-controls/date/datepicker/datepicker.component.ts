import { Component, Host } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { BlueriqFormBuilder } from '@blueriq/angular/forms';
import { Field } from '@blueriq/core';
import { PresentationStyles } from '../../../presentationstyles/presentationstyles';
import { MomentTransformer } from '../moment-transformer';
import { dateFormatProvider } from './datepicker.material';

@Component({
  selector: 'bq-datepicker',
  templateUrl: './datepicker.component.html',
  providers: [dateFormatProvider]
})
@BlueriqComponent({
  type: Field,
  selector: '.material[dataType=date]'
})
export class DatepickerComponent {

  formControl = this.form.control(this.field, {
    updateOn: 'blur',
    transformer: MomentTransformer,
    disableWhen: PresentationStyles.DISABLED
  });

  constructor(@Host() public field: Field,
              private form: BlueriqFormBuilder) {
  }
}
