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
  selector: '#navigationContainer'
})
export class PaginationComponent {

  constructor(@Self() public readonly pagination: Pagination) {
  }

}
