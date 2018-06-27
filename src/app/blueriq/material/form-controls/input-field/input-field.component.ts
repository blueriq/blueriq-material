import { Host } from '@angular/core';
import { BlueriqFormBuilder } from '@blueriq/angular/forms';
import { Field } from '@blueriq/core';
import { PresentationStyles } from '../../presentationstyles/presentationstyles';

export class InputFieldComponent {

  formControl = this.form.control(this.field, { updateOn: 'blur', disableWhen: PresentationStyles.DISABLED });
  fieldPrefix;
  fieldSuffix;

  constructor(@Host() public field: Field, private form: BlueriqFormBuilder) {
  }
}
