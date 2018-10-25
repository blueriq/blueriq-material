import { Host, Optional } from '@angular/core';
import { BlueriqFormBuilder, getFieldMessages } from '@blueriq/angular/forms';
import { List } from '@blueriq/angular/lists';
import { Field, FieldMessages } from '@blueriq/core';
import { BqPresentationStyles } from '../../BqPresentationStyles';

export class InputFieldComponent {

  formControl = this.form.control(this.field, { updateOn: 'blur', disableWhen: BqPresentationStyles.DISABLED });
  fieldPrefix: string;
  iconPrefix: string;
  fieldSuffix: string;
  placeholder: string;

  constructor(@Host() public field: Field, private form: BlueriqFormBuilder,
              @Optional() @Host() public readonly list: List) {
    this.placeholder = (this.field.placeholder || '') + (this.field.required ? ' *' : '');
  }

  getErrors(): FieldMessages {
    return getFieldMessages(this.formControl);
  }

}
