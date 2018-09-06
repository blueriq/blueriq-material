import { Component, Input } from '@angular/core';
import { Table } from '@blueriq/angular/lists';

@Component({
  selector: 'bq-table',
  templateUrl: './table.component.html',
  providers: [Table]
})
// @BlueriqComponent({
//   type: Container,
//   selector: 'table'
// })
export class TableComponent {

  @Input()
  public readonly table: Table;
  // constructor(@Self() public readonly table: Table) {
  // }
}
