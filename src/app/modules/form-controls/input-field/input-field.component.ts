import { Host } from '@angular/core';
import { OnUpdate } from '@blueriq/angular';
import { BlueriqFormBuilder, getFieldMessages } from '@blueriq/angular/forms';
import { Field, FieldMessages } from '@blueriq/core';
import { BqPresentationStyles } from '../../BqPresentationStyles';

export class InputFieldComponent implements OnUpdate {

  formControl = this.form.control(this.field, { updateOn: 'blur', disableWhen: BqPresentationStyles.DISABLED });
  fieldPrefix: string;
  iconPrefix: string;
  fieldSuffix: string;
  placeholder: string;

  constructor(@Host() public field: Field, private form: BlueriqFormBuilder) {
    this.determinePlaceholder();
  }

  bqOnUpdate(): void {
    this.determinePlaceholder();
  }

  getFieldMessages(): FieldMessages {
    return getFieldMessages(this.formControl);
  }

  protected determinePlaceholder() {
    this.placeholder = (this.field.placeholder || '');
  }

}
