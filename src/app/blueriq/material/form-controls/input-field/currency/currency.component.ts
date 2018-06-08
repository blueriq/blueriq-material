import { Component, Host } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { BlueriqFormBuilder } from '@blueriq/angular/forms';
import { Field } from '@blueriq/core';

@Component({
  selector: 'app-currency-field',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})

@BlueriqComponent({
  type: Field,
  selector: '[dataType=currency]:not([hasDomain])'
})

export class CurrencyFieldComponent {

  formControl = this.form.control(this.field, {updateOn: 'blur'});

  constructor(@Host() public field: Field, private form: BlueriqFormBuilder) {
  }
}
