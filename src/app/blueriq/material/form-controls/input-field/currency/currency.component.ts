import { Component } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { Field } from '@blueriq/core';
import { InputFieldComponent } from '../input-field.component';

@Component({
  selector: 'app-currency-field',
  templateUrl: '../input-field.component.html',
  styleUrls: ['./currency.component.scss']
})
@BlueriqComponent({
  type: Field,
  selector: '[dataType=currency]:not([hasDomain])'
})
export class CurrencyFieldComponent extends InputFieldComponent {

  fieldPrefix = '€';
}
