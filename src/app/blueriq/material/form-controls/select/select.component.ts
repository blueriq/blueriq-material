import { Component, Host } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { DomainValue, Field } from '@blueriq/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
})

@BlueriqComponent({
  type: Field,
  selector: '[hasDomain=true]'
})
export class SelectComponent {
  selected: any;

  constructor(@Host() public field: Field) {
   this.selected = field.getValue();
  }

  /** Whether the select has a presentation style Disabled */
  isDisabled() {
    return this.field.styles.has('Disabled');
  }

  /** Whether the value is changed, the field will be updated bij selected */
  onValueChanged() {
    this.field.setValue(this.selected);
  }

  /** Whether the select is read only */
  isReadonly() {
    return this.field.readonly;
  }

  /** Returns all the available option from the field domain list */
  getOptions(): DomainValue[] {
    return this.field.domain.options;
  }
}
