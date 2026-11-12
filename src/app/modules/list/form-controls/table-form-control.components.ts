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
