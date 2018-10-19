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

  constructor(@Host() public field: Field, private form: BlueriqFormBuilder,
              @Optional() @Host() public readonly list: List) {
  }

  getErrors(): FieldMessages {
    return getFieldMessages(this.formControl);
  }

}
