import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatTooltipModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqCommonModule, BlueriqComponents } from '@blueriq/angular';
import { BlueriqFormsModule } from '@blueriq/angular/forms';
import { SharedModule } from '@shared/shared.module';
import { OwlDateTimeModule } from 'ng-pick-datetime';
import { OwlMomentDateTimeModule } from 'ng-pick-datetime-moment';
import { TableDatetimepickerComponent } from './datetimepicker/table-datetimepicker.component';
import { TableCurrencyFieldComponent } from './input-field/currency/table-currency.component';
import { TableIntegerFieldComponent } from './input-field/integer/table-integer.component';
import { TableNumberFieldComponent } from './input-field/number/table-number.component';
import { TablePercentageFieldComponent } from './input-field/percentage/table-percentage.component';
import { TableStringFieldComponent } from './input-field/string/table-string.component';
import { TableSelectComponent } from './select/table-select.component';

export const TABLE_FORM_CONTROL_COMPONENTS = [
  TableStringFieldComponent,
  TablePercentageFieldComponent,
  TableIntegerFieldComponent,
  TableNumberFieldComponent,
  TablePercentageFieldComponent,
  TableCurrencyFieldComponent,
  TableDatetimepickerComponent,
  TableSelectComponent
];

@NgModule({
  declarations: [
    TABLE_FORM_CONTROL_COMPONENTS
  ],
  providers: [
    BlueriqComponents.register(TABLE_FORM_CONTROL_COMPONENTS)
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
    BlueriqFormsModule.forRoot(),

    /* Material modules */
    MatIconModule,

    // In order of appearance
    MatFormFieldModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule
  ],
  exports: [TABLE_FORM_CONTROL_COMPONENTS]
})

export class TableFormControlModule {
}
