import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqCommonModule, BlueriqComponents } from '@blueriq/angular';
import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from '../../material.module';
import { TableHeaderComponent } from './header/table.header.component';
import { TablePaginationComponent } from './pagination/table.pagination.component';
import { TableSearchComponent } from './search/table.search.component';
import { TableSortComponent } from './sort/table.sort.component';
import { TableComponent } from './table.component';

const TABLE_COMPONENTS = [
  TableComponent,
  TableSearchComponent,
  TableSortComponent,
  TableHeaderComponent,
  TablePaginationComponent,
];

@NgModule({
  declarations: [
    TABLE_COMPONENTS,
  ],
  providers: [
    BlueriqComponents.register(TABLE_COMPONENTS),
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    BlueriqCommonModule,
    CommonModule,
    FlexLayoutModule,
    SharedModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  exports: [TABLE_COMPONENTS],
})
export class TableModule {
}
