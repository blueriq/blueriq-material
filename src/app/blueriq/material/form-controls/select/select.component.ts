import { Component, Host } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { DomainValue, Field } from '@blueriq/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html'
})
@BlueriqComponent({
  type: Field,
  selector: '[hasDomain=true]'
})
export class SelectComponent {

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

  getOptions(): DomainValue[] {
    return this.field.domain.options;
  }
}
