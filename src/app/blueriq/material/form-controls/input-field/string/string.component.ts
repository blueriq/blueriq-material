import { Component, Host } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { BlueriqFormBuilder } from '@blueriq/angular/forms';
import { Field } from '@blueriq/core';

@Component({
  selector: 'app-string-field',
  templateUrl: './string.component.html',
  styleUrls: ['./string.component.scss']
})

@BlueriqComponent({
  type: Field,
  selector: '[dataType=text]:not([hasDomain])'
})

export class StringFieldComponent {

  formControl = this.form.control(this.field, {updateOn: 'blur'});

  constructor(@Host() public field: Field, private form: BlueriqFormBuilder) {
  }

  getType() {
    return this.field.dataType;
  }

  isReadonly() {
    return this.field.readonly;
  }

}
