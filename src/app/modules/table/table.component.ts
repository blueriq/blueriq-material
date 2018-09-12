import { Component, Self } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { Table } from '@blueriq/angular/lists';
import { Container } from '@blueriq/core';
import { BqContentStyles } from '../BqContentStyles';

@Component({
  templateUrl: './table.component.html',
  providers: [Table]
})
@BlueriqComponent({
  type: Container,
  selector: BqContentStyles.TABLE
})
export class TableComponent {

  constructor(@Self() public readonly table: Table) {
  }
}
