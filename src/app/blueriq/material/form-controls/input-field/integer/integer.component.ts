import { Component, Host } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { BlueriqFormBuilder } from '@blueriq/angular/forms';
import { Field } from '@blueriq/core';
import { PresentationStyles } from '../../../presentationstyles/presentationstyles';

@Component({
  selector: 'app-integer-field',
  templateUrl: './integer.component.html'
})

@BlueriqComponent({
  type: Field,
  selector: '[dataType=integer]:not([hasDomain])'
})

export class IntegerFieldComponent {

  formControl = this.form.control(this.field, { updateOn: 'blur' });

  constructor(@Host() public field: Field, private form: BlueriqFormBuilder) {
    this.setIsDisabled();
  }

  setIsDisabled() {
    if (this.isDisabled()) {
      this.formControl.disable();
    }
  }

  /** Whether the string field has a presentation style Disabled */
  isDisabled(): boolean {
    return this.field.styles.has(PresentationStyles.DISABLED);
  }

  /** Whether the string field is read only */
  isReadonly() {
    return this.field.readonly;
  }

}
