import { Component, Host } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { DomainValue, Field } from '@blueriq/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
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

  /** Whether the checkbox has a presentation style Disabled */
  isDisabled() {
    return this.field.styles.has('Disabled');
  }

  /** Whether the value is changed, the field will be updated bij selected*/
  onValueChanged() {
    this.field.setValue(this.selected);
  }

  /** Whether the checkbox is read only */
  isReadonly() {
    return this.field.readonly;
  }

  getOptions(): DomainValue[] {
    return this.field.domain.options;
  }
}
