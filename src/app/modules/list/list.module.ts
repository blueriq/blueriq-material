import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatBadgeModule,
  MatButtonModule,
  MatCheckboxModule,
  MatChipsModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatOptionModule,
  MatSelectModule,
  MatTableModule,
  MatTooltipModule,
} from '@angular/material';
import { BlueriqCommonModule, BlueriqComponents } from '@blueriq/angular';
import { SharedModule } from '@shared/shared.module';
import { OwlDateTimeModule } from 'ng-pick-datetime';
import { OwlMomentDateTimeModule } from 'ng-pick-datetime-moment';
import { HeadingModule } from '../heading/heading.module';
import { ListBooleanFilterComponent } from './filter/list-boolean-filter/list-boolean-filter.component';
import { ListDateFilterComponent } from './filter/list-date-filter/list-date-filter.component';
import { ListDomainFilterComponent } from './filter/list-domain-filter/list-domain-filter.component';
import { ListEmptyFilterComponent } from './filter/list-empty-filter/list-empty-filter.component';
import { ListFilterRowComponent } from './filter/list-filter-row/list-filter-row.component';
import { ListNumericFilterComponent } from './filter/list-numeric-filter/list-numeric-filter.component';
import { ListStringFilterComponent } from './filter/list-string-filter/list-string-filter.component';
import { TableFilterComponent } from './filter/table.filter.component';
import { TableFormControlModule } from './form-controls/table-form-control.module';
import { TableHeaderColumnComponent } from './header/header.component';
import { TableLimitComponent } from './limit/table.limit.component';
import { ListComponent } from './list.component';
import { TablePaginationComponent } from './pagination/table.pagination.component';
import { TableSearchComponent } from './search/table.search.component';
import { TableComponent } from './table.component';

const LIST_COMPONENTS = [
  TableComponent,
  TableFilterComponent,
  TableSearchComponent,
  TableHeaderColumnComponent,
  TablePaginationComponent,
  ListComponent,
  TableLimitComponent,
  ListStringFilterComponent,
  ListFilterRowComponent,
  ListDomainFilterComponent,
  ListBooleanFilterComponent,
  ListDateFilterComponent,
  ListNumericFilterComponent,
  ListEmptyFilterComponent,
];

@NgModule({
  declarations: [
    LIST_COMPONENTS,
  ],
  providers: [
    BlueriqComponents.register([ListComponent]),
  ],
  imports: [
    BlueriqCommonModule,
    CommonModule,
    HeadingModule,
    FlexLayoutModule,
    SharedModule,
    ReactiveFormsModule,
    TableFormControlModule, // form controls that have different appearance within a table
    OwlDateTimeModule, // used in filter component
    OwlMomentDateTimeModule, // used in filter component

    /* Material modules */
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatChipsModule,
    MatOptionModule,
    MatCheckboxModule,
    MatSelectModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatInputModule,
  ],
  exports: [LIST_COMPONENTS],
})
export class ListModule {
}
