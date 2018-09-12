import { Component, Input } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { Table } from '@blueriq/angular/lists';
import { Container } from '@blueriq/core';
import { BqContentStyles } from '../BqContentStyles';


@Component({
  selector: 'bq-table',
  templateUrl: './table.component.html',
  providers: [Table]
})
@BlueriqComponent({
  type: Container,
  selector: BqContentStyles.TABLE
})
export class TableComponent {

  @Input()
  public readonly table: Table;
  // constructor(@Self() public readonly table: Table) {
  // }
}
