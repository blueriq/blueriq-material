import { Host } from '@angular/core';
import { BlueriqFormBuilder } from '@blueriq/angular/forms';
import { Field } from '@blueriq/core';
import { PresentationStylesNew } from '../../PresentationStylesNew';

export class InputFieldComponent {

  formControl = this.form.control(this.field, { updateOn: 'blur', disableWhen: PresentationStylesNew.DISABLED });
  fieldPrefix;
  iconPrefix;
  fieldSuffix;

  constructor(@Host() public field: Field, private form: BlueriqFormBuilder) {
  }
}
