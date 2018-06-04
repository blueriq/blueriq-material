import { Component, Host } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { BlueriqFormBuilder } from '@blueriq/angular/forms';
import { Field } from '@blueriq/core';

@Component({
  selector: 'app-string-field',
  templateUrl: './string-field.component.html',
  styleUrls: ['./string-field.component.scss']
})

@BlueriqComponent({
  type: Field,
  selector: '[dataType=text]'
})

export class StringFieldComponent {

  formControl = this.form.control(this.field, {updateOn: 'blur'});

  constructor(@Host() public field: Field, private form: BlueriqFormBuilder) {
  }

  getType() {
    return this.field.dataType;
  }

}
