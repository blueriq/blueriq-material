import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
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
  MatTooltipModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqCommonModule, BlueriqComponents } from '@blueriq/angular';
import { SharedModule } from '@shared/shared.module';
import { OwlDateTimeModule } from 'ng-pick-datetime';
import { OwlMomentDateTimeModule } from 'ng-pick-datetime-moment';
import { TableFilterValueComponent } from './filter/table.filter-value.component';
import { TableFilterComponent } from './filter/table.filter.component';
import { TableHeaderColumnComponent } from './header/header.component';
import { ListComponent } from './list.component';
import { TablePaginationComponent } from './pagination/table.pagination.component';
import { TableSearchComponent } from './search/table.search.component';
import { TableComponent } from './table.component';

const LIST_COMPONENTS = [
  TableComponent,
  TableFilterComponent,
  TableSearchComponent,
  TableSortComponent,
  TablePaginationComponent,
  ListComponent,
  TableFilterValueComponent
];

@NgModule({
  declarations: [
    LIST_COMPONENTS
  ],
  providers: [
    BlueriqComponents.register([ListComponent, TableSortComponent, TableFilterIconComponent])
  ],
  imports: [
    BrowserAnimationsModule,
    BlueriqCommonModule,
    CommonModule,
    FlexLayoutModule,
    SharedModule,
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
    MatInputModule
  ],
  exports: [LIST_COMPONENTS]
})
export class ListModule {
}
