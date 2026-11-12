import { Component, inject } from '@angular/core';
import { BlueriqComponent, BlueriqCommonModule } from '@blueriq/angular';
import { List } from '@blueriq/angular/lists';
import { Container } from '@blueriq/core';
import { BqPresentationStyles } from '../BqPresentationStyles';
import { BqKeyDirective } from '../../shared/directive/bq-key/bq-key.directive';
import { BqContainerDirective } from '../../shared/directive/container/bq-container.directive';
import { HeadingComponent } from '../heading/heading.component';
import { TableSearchComponent } from './search/table.search.component';
import { FilterComponent } from './filter/filter.component';
import { TableComponent } from './table.component';
import { TablePaginationComponent } from './pagination/table.pagination.component';
import { TableLimitComponent } from './limit/table.limit.component';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'bq-list',
    templateUrl: './list.component.html',
    providers: [List],
    imports: [
      BqKeyDirective,
      BlueriqCommonModule,
      BqContainerDirective,
      HeadingComponent,
      TableSearchComponent,
      FilterComponent,
      TableComponent,
      TablePaginationComponent,
      TableLimitComponent,
      AsyncPipe,
    ]
})
@BlueriqComponent({
  type: Container,
  selector: `:has(* > table)`,
})
export class ListComponent {
  container = inject(Container);
  readonly list = inject(List);


  shouldShowSearchBox(): boolean {
    return !this.container.styles.has(BqPresentationStyles.DO_NOT_SHOW_SEARCH);
  }
}
