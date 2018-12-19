import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { Field } from '@blueriq/core';
import { InputFieldComponent } from '../input-field.component';

@Component({
  selector: 'bq-currency-field',
  templateUrl: '../input-field.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
@BlueriqComponent({
  type: Field,
  selector: '[dataType=currency]:not([hasDomain])',
})
export class CurrencyFieldComponent extends InputFieldComponent {

  iconPrefix = 'euro_symbol';
}
