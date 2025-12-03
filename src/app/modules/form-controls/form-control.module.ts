import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyAutocompleteModule as MatAutocompleteModule } from '@angular/material/legacy-autocomplete';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatLegacyChipsModule as MatChipsModule } from '@angular/material/legacy-chips';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyRadioModule as MatRadioModule } from '@angular/material/legacy-radio';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqComponents } from '@blueriq/angular';
import { BlueriqFormsModule } from '@blueriq/angular/forms';
import { OwlDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import { OwlMomentDateTimeModule } from '@danielmoncada/angular-datetime-picker-moment-adapter';
import { SharedModule } from '@shared/shared.module';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { DomainValueTransformer } from './autocomplete/domain-value-transformer';
import { BqErrorStateMatcher } from './bq-errorstatematcher';
import { ChiplistComponent } from './chiplist/chiplist.component';
import { DatepickerComponent } from './date/datepicker/datepicker.component';
import { DateTimepickerComponent } from './date/datetimepicker/datetimepicker.component';
import { MomentTransformer } from './date/moment-transformer';
import { CurrencyFieldComponent } from './input-field/currency/currency.component';
import { IntegerFieldComponent } from './input-field/integer/integer.component';
import { NumberFieldComponent } from './input-field/number/number.component';
import { PercentageFieldComponent } from './input-field/percentage/percentage.component';
import { StringFieldComponent } from './input-field/string/string.component';
import { SelectComponent } from './select/select.component';
import { CheckboxListComponent } from './selection-control/checkbox-list/checkbox-list.component';
import { CheckboxComponent } from './selection-control/checkbox/checkbox.component';
import { RadioButtonComponent } from './selection-control/radio-button/radio-button.component';
import { SlideToggleComponent } from './selection-control/slide-toggle/slide-toggle.component';
import { TextAreaComponent } from './text-area/text-area.component';

const FORM_CONTROL_COMPONENTS = [
  AutocompleteComponent,
  CheckboxComponent,
  CheckboxListComponent,
  ChiplistComponent,
  CurrencyFieldComponent,
  DateTimepickerComponent,
  DatepickerComponent,
  IntegerFieldComponent,
  NumberFieldComponent,
  PercentageFieldComponent,
  RadioButtonComponent,
  SelectComponent,
  StringFieldComponent,
  SlideToggleComponent,
  TextAreaComponent,
];

@NgModule({
  declarations: [
    FORM_CONTROL_COMPONENTS,
  ],
  providers: [
    BlueriqComponents.register(FORM_CONTROL_COMPONENTS),
    DomainValueTransformer,
    MomentTransformer,
    { provide: ErrorStateMatcher, useClass: BqErrorStateMatcher },
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    SharedModule,
    OwlDateTimeModule,
    OwlMomentDateTimeModule,
    FormsModule,
    ReactiveFormsModule,
    BlueriqFormsModule.forRoot(),

    /* Material modules */
    MatIconModule,

    // In order of appearance
    MatFormFieldModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatDatepickerModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatTooltipModule,
  ],
  exports: [FORM_CONTROL_COMPONENTS],
})

export class FormControlModule {
}
