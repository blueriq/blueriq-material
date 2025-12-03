import { Directive, HostBinding } from '@angular/core';
import { OnUpdate } from '@blueriq/angular';
import { BlueriqFormBuilder, getFieldMessages } from '@blueriq/angular/forms';
import { Field, FieldMessages } from '@blueriq/core';
import { BqPresentationStyles } from '../../BqPresentationStyles';

@Directive()
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class InputFieldComponent implements OnUpdate {

  @HostBinding('class.fx-flex-row')

  formControl = this.form.control(this.field, { updateOn: 'blur', disableWhen: BqPresentationStyles.DISABLED });
  fieldPrefix: string;
  iconPrefix: string;
  fieldSuffix: string;
  placeholder: string;
  inputType = 'text';

  constructor(public field: Field, private readonly form: BlueriqFormBuilder) {
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
