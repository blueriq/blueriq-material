import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatChipsModule, MatFormFieldModule, MatIconModule, MatTableModule } from '@angular/material';
import { BlueriqCommonModule, BlueriqComponents } from '@blueriq/angular';
import { SharedModule } from '@shared/shared.module';
import { HeadingModule } from '../heading/heading.module';
import { FilterModule } from './filter/filter.module';
import { TableFormControlModule } from './form-controls/table-form-control.module';
import { TableHeaderColumnComponent } from './header/header.component';
import { TableLimitComponent } from './limit/table.limit.component';
import { ListComponent } from './list.component';
import { TablePaginationComponent } from './pagination/table.pagination.component';
import { TableSearchComponent } from './search/table.search.component';
import { TableComponent } from './table.component';

const LIST_COMPONENTS = [
  TableComponent,
  TableSearchComponent,
  TableHeaderColumnComponent,
  TablePaginationComponent,
  ListComponent,
  TableLimitComponent,
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
    FilterModule,
    TableFormControlModule, // form controls that have different appearance within a table

    /* Material modules */
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatFormFieldModule,
  ],
  exports: [LIST_COMPONENTS],
})
export class ListModule {
}
