import { Component, Self } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { Pagination } from '@blueriq/angular/lists';
import { Container } from '@blueriq/core';

@Component({
  templateUrl: './table.pagination.component.html',
  styleUrls: ['./table.pagination.component.scss'],
  providers: [Pagination]
})
@BlueriqComponent({
  type: Container,
  selector: 'tablenavigation, listplus_footer, list_footer'
  // Instancelist   - tablenavigation
  // Aggregatelist  - list_footer
  // Caselist       - listplus_footer
  // Worklist       - listplus_footer
})
export class TablePaginationComponent {

  constructor(@Self() public readonly pagination: Pagination) {
  }

}
