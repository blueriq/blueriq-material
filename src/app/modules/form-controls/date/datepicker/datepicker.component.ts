import { Component } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { BlueriqFormBuilder, getFieldMessages } from '@blueriq/angular/forms';
import { Field, FieldMessages } from '@blueriq/core';
import { BqPresentationStyles } from '../../../BqPresentationStyles';
import { MomentTransformer } from '../moment-transformer';
import { dateFormatProvider } from './datepicker.material';

@Component({
  selector: 'bq-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  providers: [dateFormatProvider],
})
@BlueriqComponent({
  type: Field,
  selector: '.DatepickerMaterial[dataType=date]',
})
export class DatepickerComponent {

  formControl = this.form.control(this.field, {
    updateOn: 'blur',
    transformer: MomentTransformer,
    disableWhen: BqPresentationStyles.DISABLED,
  });

  constructor(public field: Field,
              private readonly form: BlueriqFormBuilder) {
  }

  getMessages(): FieldMessages {
    return getFieldMessages(this.formControl);
  }

  /**
   * Returns if the date input is invalid so an error message can be shown
   */
  invalidInput(): boolean {
    return this.formControl.errors && this.formControl.errors['matDatepickerParse'];
  }
}
