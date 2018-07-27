import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqComponents } from '@blueriq/angular';
import { SharedModule } from '@shared/shared.module';
import { OwlDateTimeModule } from 'ng-pick-datetime';
import { OwlMomentDateTimeModule } from 'ng-pick-datetime-moment';
import { MaterialModule } from '../../material.module';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { DatepickerComponent } from './date/datepicker/datepicker.component';
import { DateTimepickerComponent } from './date/datetimepicker/datetimepicker.component';
import { CurrencyFieldComponent } from './input-field/currency/currency.component';
import { IntegerFieldComponent } from './input-field/integer/integer.component';
import { NumberFieldComponent } from './input-field/number/number.component';
import { PercentageFieldComponent } from './input-field/percentage/percentage.component';
import { StringFieldComponent } from './input-field/string/string.component';
import { RadioButtonComponent } from './radio-button/radio-button.component';
import { SelectComponent } from './select/select.component';
import { SlideToggleComponent } from './slide-toggle/slide-toggle.component';

const FORM_CONTROL_COMPONENTS = [
  CheckboxComponent,
  DatepickerComponent,
  DateTimepickerComponent,
  StringFieldComponent,
  IntegerFieldComponent,
  NumberFieldComponent,
  RadioButtonComponent,
  CurrencyFieldComponent,
  SlideToggleComponent,
  SelectComponent,
  PercentageFieldComponent
];

@NgModule({
  declarations: [
    FORM_CONTROL_COMPONENTS
  ],
  providers: [
    BlueriqComponents.register(FORM_CONTROL_COMPONENTS)
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    SharedModule,
    FlexLayoutModule,
    OwlDateTimeModule,
    OwlMomentDateTimeModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [FORM_CONTROL_COMPONENTS]
})

export class FormControlModule {
}
