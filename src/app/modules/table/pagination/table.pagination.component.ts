import { Component, Input } from '@angular/core';
import { Pagination } from '@blueriq/angular/lists';

@Component({
  selector: 'bq-table-pagination',
  templateUrl: './table.pagination.component.html',
  styleUrls: ['./table.pagination.component.scss']
  // providers: [Pagination]
})
// @BlueriqComponent({
//   type: Container,
//   selector: 'tablenavigation, listplus_footer, list_footer'
//   // Instancelist   - tablenavigation
//   // Aggregatelist  - list_footer
//   // Caselist       - listplus_footer
//   // Worklist       - listplus_footer
// })
export class TablePaginationComponent {

  @Input()
  public readonly pagination: Pagination;

  // constructor(@Self() public readonly pagination: Pagination) {
  // }

}
