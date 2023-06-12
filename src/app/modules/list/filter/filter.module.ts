import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyAutocompleteModule as MatAutocompleteModule } from '@angular/material/legacy-autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { BlueriqCommonModule } from '@blueriq/angular';
import { FormattingModule } from '@blueriq/angular/formatting';
import { OwlDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import { OwlMomentDateTimeModule } from '@danielmoncada/angular-datetime-picker-moment-adapter';
import { SharedModule } from '@shared/shared.module';
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
    MatDialogModule,
  ],
  exports: [TABLE_FILTER_COMPONENTS],
})

export class FilterModule {
}
