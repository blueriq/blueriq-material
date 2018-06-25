import { Component, Host, Optional } from '@angular/core';
import { BlueriqComponent, bySelector } from '@blueriq/angular';
import { Table } from '@blueriq/angular/lists';
import { Field } from '@blueriq/core';

@Component({
  selector: 'bq-readonly',
  templateUrl: './readonly.component.html'
})
@BlueriqComponent({
  type: Field,
  selector: bySelector('[readonly]', { priorityOffset: 1000 })
})
export class ReadonlyComponent {

  constructor(@Host() public readonly field: Field, @Optional() @Host() public readonly table: Table) {
  }
}
