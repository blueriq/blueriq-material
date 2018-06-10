import { Component, Host } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { BlueriqFormBuilder } from '@blueriq/angular/forms';
import { Field } from '@blueriq/core';
import { PresentationStyles } from '../../../presentationstyles/presentationstyles';

@Component({
  selector: 'app-currency-field',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})

@BlueriqComponent({
  type: Field,
  selector: '[dataType=currency]:not([hasDomain])'
})

export class CurrencyFieldComponent {

  formControl = this.form.control(this.field, { updateOn: 'blur' });

  constructor(@Host() public field: Field, private form: BlueriqFormBuilder) {
  }

  /** Whether the string field has a presentation style Disabled */
  isDisabled() {
    return this.field.styles.has(PresentationStyles.DISABLED);
  }

  /** Whether the string field is read only */
  isReadonly() {
    return this.field.readonly;
  }
}
