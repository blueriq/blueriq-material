import { Component, Self } from '@angular/core';
import { BlueriqChild, BlueriqComponent } from '@blueriq/angular';
import { Table } from '@blueriq/angular/lists';
import { Container } from '@blueriq/core';

@Component({
  selector: 'bq-list',
  templateUrl: './list.component.html',
  providers: [Table]
})
@BlueriqComponent({
  type: Container,
  selector: ':has(* > table)'
})
export class ListComponent {

  @BlueriqChild(Container, 'table')
  tableContainer: Container;

  constructor(@Self() public readonly table: Table) {
  }
}
