import { Component, Host } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { BlueriqFormBuilder } from '@blueriq/angular/forms';
import { Field } from '@blueriq/core';
import { PresentationStyles } from '../../../presentationstyles/presentationstyles';

@Component({
  selector: 'app-integer-field',
  templateUrl: './integer.component.html',
  styleUrls: ['./integer.component.scss']
})

@BlueriqComponent({
  type: Field,
  selector: '[dataType=integer]'
})

export class IntegerFieldComponent {

  formControl = this.form.control(this.field, {updateOn: 'blur'});

  constructor(@Host() public field: Field, private form: BlueriqFormBuilder) {
    this.setIsDisabled();
  }

  getType() {
    return this.field.dataType;
  }

  setIsDisabled() {
    if (this.isDisabled()) {
      this.formControl.disable();
    }
  }

  isDisabled(): boolean {
    return this.field.styles.has(PresentationStyles.DISABLED);
  }

}
