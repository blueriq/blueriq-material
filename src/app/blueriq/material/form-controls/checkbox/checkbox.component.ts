import { Component, Host } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { Field } from '@blueriq/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html'
})

@BlueriqComponent({
  type: Field,
  selector: '[dataType=boolean]'
})

export class CheckboxComponent {

  constructor(@Host() public field: Field) {
  }
  /** Whether the checkbox has a presentation style Disabled */
  isDisabled() {
    return this.field.styles.has('Disabled');
  }

  /** Whether the checkbox is read only */
  isReadonly() {
    return this.field.readonly;
  }
}
