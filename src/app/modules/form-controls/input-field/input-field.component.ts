import { Host } from '@angular/core';
import { BlueriqFormBuilder, getFieldMessages } from '@blueriq/angular/forms';
import { Field, FieldMessages } from '@blueriq/core';
import { BqPresentationStyles } from '../../BqPresentationStyles';

export class InputFieldComponent {

  formControl = this.form.control(this.field, { updateOn: 'blur', disableWhen: BqPresentationStyles.DISABLED });
  fieldPrefix: string;
  iconPrefix: string;
  fieldSuffix: string;
  placeholder: string;

  constructor(@Host() public field: Field, private form: BlueriqFormBuilder) {
    this.placeholder = (this.field.placeholder || '') + (this.field.required ? ' *' : '');
  }

  getFieldMessages(): FieldMessages {
    return getFieldMessages(this.formControl);
  }

}
