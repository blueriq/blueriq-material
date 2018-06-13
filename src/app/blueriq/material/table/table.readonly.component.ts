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
    if (this.field.hasDomain) {
      return this.field.domain.getDisplayValue(this.field.getValue());
    }
    return this.field.getValue();
  }

}
