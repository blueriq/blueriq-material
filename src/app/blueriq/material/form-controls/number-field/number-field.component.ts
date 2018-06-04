import { Component, Host } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { BlueriqFormBuilder } from '@blueriq/angular/forms';
import { Field } from '@blueriq/core';

@Component({
  selector: 'app-integer-field',
  templateUrl: './number-field.component.html',
  styleUrls: ['./number-field.component.scss']
})

@BlueriqComponent({
  type: Field,
  selector: '[dataType=number]'
})

export class NumberFieldComponent {

  formControl = this.form.control(this.field, {updateOn: 'blur'});

  constructor(@Host() public field: Field, private form: BlueriqFormBuilder) {
  }

  getType() {
    return this.field.dataType;
  }

}
