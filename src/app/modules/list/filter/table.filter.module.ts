import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatButtonModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatTooltipModule,
} from '@angular/material';
import { BlueriqCommonModule } from '@blueriq/angular';
import { FormattingModule } from '@blueriq/angular/formatting';
import { SharedModule } from '@shared/shared.module';
import { OwlDateTimeModule } from 'ng-pick-datetime';
import { OwlMomentDateTimeModule } from 'ng-pick-datetime-moment';
import { ListBooleanFilterComponent } from './list-boolean-filter/list-boolean-filter.component';
import { ListDateFilterComponent } from './list-date-filter/list-date-filter.component';
import { ListDomainFilterComponent } from './list-domain-filter/list-domain-filter.component';
import { ListEmptyFilterComponent } from './list-empty-filter/list-empty-filter.component';
import { ListFilterRowComponent } from './list-filter-row/list-filter-row.component';
import { ListNumericFilterComponent } from './list-numeric-filter/list-numeric-filter.component';
import { ListTextFilterComponent } from './list-text-filter/list-text-filter.component';
import { TableFilterComponent } from './table.filter.component';

export const TABLE_FILTER_COMPONENTS = [
  TableFilterComponent,
  ListBooleanFilterComponent,
  ListDateFilterComponent,
  ListDomainFilterComponent,
  ListEmptyFilterComponent,
  ListFilterRowComponent,
  ListNumericFilterComponent,
  ListTextFilterComponent,
];

@NgModule({
  declarations: [
    TABLE_FILTER_COMPONENTS,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FlexLayoutModule,
    OwlDateTimeModule,
    OwlMomentDateTimeModule,
    BlueriqCommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormattingModule.forRoot(),

    /* Material modules */
    MatAutocompleteModule,
    MatBadgeModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
  ],
  exports: [TABLE_FILTER_COMPONENTS],
})

export class TableFilterModule {
}
