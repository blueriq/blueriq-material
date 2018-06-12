import { Host, OnInit } from '@angular/core';
import { BlueriqFormBuilder } from '@blueriq/angular/forms';
import { Field } from '@blueriq/core';
import { PresentationStyles } from '../../presentationstyles/presentationstyles';

export class InputFieldComponent implements OnInit {

  formControl = this.form.control(this.field, { updateOn: 'blur' });
  fieldPrefix;
  fieldSuffix;

  constructor(@Host() public field: Field, private form: BlueriqFormBuilder) {
  }

  ngOnInit(): void {
    if (this.isDisabled()) {
      this.formControl.disable();
    }
    this.formControl.setValue(this.field.getValue());
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
