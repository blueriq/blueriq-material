import { Component, Input } from '@angular/core';
import { Pagination } from '@blueriq/angular/lists';

@Component({
  selector: 'bq-table-pagination',
  templateUrl: './table.pagination.component.html',
  styleUrls: ['./table.pagination.component.scss'],
})
export class TablePaginationComponent {

  @Input()
  public readonly pagination: Pagination;

}
