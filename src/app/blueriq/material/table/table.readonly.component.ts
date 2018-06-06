import { Component, Host } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { Field } from '@blueriq/core';

@Component({
  template: '{{getDisplayValue()}}'
})
@BlueriqComponent({
  type: Field,
  selector: 'table [readonly]'
})
export class TableReadonlyComponent {
  constructor(@Host() public field: Field) {}

  getDisplayValue() {
    return this.field.getValue();
  }

}
