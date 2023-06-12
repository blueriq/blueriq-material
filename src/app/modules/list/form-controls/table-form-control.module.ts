import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyAutocompleteModule as MatAutocompleteModule } from '@angular/material/legacy-autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqCommonModule } from '@blueriq/angular';
import { FormattingModule } from '@blueriq/angular/formatting';
import { BlueriqFormsModule } from '@blueriq/angular/forms';
import { OwlDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import { OwlMomentDateTimeModule } from '@danielmoncada/angular-datetime-picker-moment-adapter';
import { SharedModule } from '@shared/shared.module';
import { TableDatetimepickerComponent } from './datetimepicker/table-datetimepicker.component';
import { TableCurrencyFieldComponent } from './input-field/currency/table-currency.component';
import { TableIntegerFieldComponent } from './input-field/integer/table-integer.component';
import { TableNumberFieldComponent } from './input-field/number/table-number.component';
import { TablePercentageFieldComponent } from './input-field/percentage/table-percentage.component';
import { TableStringFieldComponent } from './input-field/string/table-string.component';
import { TableReadonlyComponent } from './readonly/table-readonly.component';
import { TableSelectComponent } from './select/table-select.component';

export const TABLE_FORM_CONTROL_COMPONENTS = [
  TableStringFieldComponent,
  TablePercentageFieldComponent,
  TableIntegerFieldComponent,
  TableNumberFieldComponent,
  TablePercentageFieldComponent,
  TableCurrencyFieldComponent,
  TableDatetimepickerComponent,
  TableSelectComponent,
  TableReadonlyComponent,
];

@NgModule({
  declarations: [
    TABLE_FORM_CONTROL_COMPONENTS,
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    SharedModule,
    FlexLayoutModule,
    OwlDateTimeModule,
    OwlMomentDateTimeModule,
    BlueriqCommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormattingModule.forRoot(),
    BlueriqFormsModule.forRoot(),

    /* Material modules */
    MatIconModule,

    // In order of appearance
    MatFormFieldModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
  ],
  exports: [TABLE_FORM_CONTROL_COMPONENTS],
})

export class TableFormControlModule {
}
