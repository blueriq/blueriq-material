import { Component } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { Field } from '@blueriq/core';
import { InputFieldComponent } from '../input-field.component';

@Component({
  selector: 'app-string-field',
  templateUrl: '../input-field.component.html'
})

@BlueriqComponent({
  type: Field,
  selector: '[dataType=text]:not([hasDomain])'
})

export class StringFieldComponent extends InputFieldComponent {
}
