import { Component, HostBinding, inject } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { BlueriqFormBuilder, getFieldMessages } from '@blueriq/angular/forms';
import { Field, FieldMessages } from '@blueriq/core';
import { BqPresentationStyles } from '../../../BqPresentationStyles';
import { MomentTransformer } from '../moment-transformer';
import { dateFormatProvider } from './datepicker.material';
import { MatFormField, MatLabel, MatPrefix, MatHint, MatError } from '@angular/material/form-field';
import { BqKeyDirective } from '../../../../shared/directive/bq-key/bq-key.directive';
import { MatInput } from '@angular/material/input';
import { MatDatepickerInput, MatDatepickerToggle, MatDatepicker } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'bq-datepicker',
    templateUrl: './datepicker.component.html',
    styleUrls: ['./datepicker.component.scss'],
    providers: [dateFormatProvider],
    imports: [
      MatFormField,
      BqKeyDirective,
      MatLabel,
      MatInput,
      MatDatepickerInput,
      FormsModule,
      ReactiveFormsModule,
      MatDatepickerToggle,
      MatPrefix,
      MatDatepicker,
      MatHint,
      MatError,
    ]
})
@BlueriqComponent({
  type: Field,
  selector: '.DatepickerMaterial[dataType=date]',
})
export class DatepickerComponent {
  field = inject(Field);
  private readonly form = inject(BlueriqFormBuilder);


  @HostBinding('class.fx-flex-row')

  formControl = this.form.control(this.field, {
    updateOn: 'blur',
    transformer: MomentTransformer,
    disableWhen: BqPresentationStyles.DISABLED,
  });

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
