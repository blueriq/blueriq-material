import { Component, Input } from '@angular/core';
import { Table } from '@blueriq/angular/lists';

@Component({
  selector: 'bq-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {

  @Input()
  public readonly table: Table;
}
