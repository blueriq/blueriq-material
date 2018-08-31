import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqComponents } from '@blueriq/angular';
import { SharedModule } from '@shared/shared.module';
import { OwlDateTimeModule } from 'ng-pick-datetime';
import { OwlMomentDateTimeModule } from 'ng-pick-datetime-moment';
import { MaterialModule } from '../../material.module';
import { BqErrorStateMatcher } from './bq-errorstatematcher';
import { DatepickerComponent } from './date/datepicker/datepicker.component';
import { DateTimepickerComponent } from './date/datetimepicker/datetimepicker.component';
import { CurrencyFieldComponent } from './input-field/currency/currency.component';
import { IntegerFieldComponent } from './input-field/integer/integer.component';
import { NumberFieldComponent } from './input-field/number/number.component';
import { PercentageFieldComponent } from './input-field/percentage/percentage.component';
import { StringFieldComponent } from './input-field/string/string.component';
import { SelectComponent } from './select/select.component';
import { CheckboxComponent } from './selection-control/checkbox/checkbox.component';
import { RadioButtonComponent } from './selection-control/radio-button/radio-button.component';
import { SelectionControlComponent } from './selection-control/selection-control.component';
import { SlideToggleComponent } from './selection-control/slide-toggle/slide-toggle.component';
import { TextAreaComponent } from './text-area/text-area.component';

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
  TextAreaComponent,
  PercentageFieldComponent
];

@NgModule({
  declarations: [
    FORM_CONTROL_COMPONENTS,
    SelectionControlComponent
  ],
  providers: [
    BlueriqComponents.register(FORM_CONTROL_COMPONENTS),
    SelectionControlComponent,
    { provide: ErrorStateMatcher, useClass: BqErrorStateMatcher }
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
  exports: [FORM_CONTROL_COMPONENTS, SelectionControlComponent]
})

export class FormControlModule {
}
