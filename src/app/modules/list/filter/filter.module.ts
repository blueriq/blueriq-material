import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BlueriqCommonModule } from '@blueriq/angular';
import { FormattingModule } from '@blueriq/angular/formatting';
import { SharedModule } from '@shared/shared.module';
import { OwlDateTimeModule } from 'ng-pick-datetime';
import { OwlMomentDateTimeModule } from 'ng-pick-datetime-moment';
import { BooleanFilterComponent } from './boolean-filter/boolean-filter.component';
import { DateFilterComponent } from './date-filter/date-filter.component';
import { DomainFilterComponent } from './domain-filter/domain-filter.component';
import { EmptyFilterComponent } from './empty-filter/empty-filter.component';
import { FilterRowComponent } from './filter-row/filter-row.component';
import { FilterComponent } from './filter.component';
import { NumericFilterComponent } from './numeric-filter/numeric-filter.component';
import { TextFilterComponent } from './text-filter/text-filter.component';

export const TABLE_FILTER_COMPONENTS = [
  FilterComponent,
  BooleanFilterComponent,
  DateFilterComponent,
  DomainFilterComponent,
  EmptyFilterComponent,
  FilterRowComponent,
  NumericFilterComponent,
  TextFilterComponent,
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

export class FilterModule {
}
