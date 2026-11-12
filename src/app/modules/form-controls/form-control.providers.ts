import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { BlueriqComponents } from '@blueriq/angular';
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

export function provideFormControlComponents(): EnvironmentProviders {
  return makeEnvironmentProviders([
    BlueriqComponents.register([
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
    ]),
    DomainValueTransformer,
    MomentTransformer,
    { provide: ErrorStateMatcher, useClass: BqErrorStateMatcher },
  ]);
}
