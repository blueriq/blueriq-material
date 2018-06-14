import { Component, Host, OnInit } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { BlueriqFormBuilder } from '@blueriq/angular/forms';
import { Field } from '@blueriq/core';
import { PresentationStyles } from '../../presentationstyles/presentationstyles';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html'
})
@BlueriqComponent({
  type: Field,
  selector: '[dataType=boolean]'
})
export class CheckboxComponent implements OnInit {

  formControl = this.form.control(this.field, { syncOn: 'update' });

  constructor(@Host() public field: Field, private form: BlueriqFormBuilder) {
  }

  ngOnInit(): void {
    if (this.isDisabled() || this.isReadonly()) {
      this.formControl.disable();
    }
    this.formControl.setValue(this.field.getValue());
  }

  /** Whether the checkbox has a presentation style {@link PresentationStyles.DISABLED} */
  isDisabled() {
    return this.field.styles.has(PresentationStyles.DISABLED);
  }

  /** Whether the checkbox is read only */
  isReadonly() {
    return this.field.readonly;
  }

}
