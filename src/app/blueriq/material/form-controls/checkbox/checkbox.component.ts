import { Component, Host } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
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

export class CheckboxComponent {

  constructor(@Host() public field: Field) {
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
