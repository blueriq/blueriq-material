import { Component, Host, Optional } from '@angular/core';
import { BlueriqComponent, bySelector } from '@blueriq/angular';
import { List } from '@blueriq/angular/lists';
import { Field } from '@blueriq/core';

@Component({
  selector: 'bq-readonly',
  templateUrl: './readonly.component.html',
  styleUrls: ['./readonly.component.scss']
})
@BlueriqComponent({
  type: Field,
  selector: bySelector('[readonly]:not([dataType=boolean])', { priorityOffset: 1000 })
})
export class ReadonlyComponent {

  constructor(@Host() public readonly field: Field,
              @Optional() @Host() public readonly list: List) {
  }

  getValue(): string {
    return this.field.multiValued ? this.field.listValue.toString() : this.field.getValue();
  }
}
