import { Component, Host } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { BlueriqFormBuilder } from '@blueriq/angular/forms';
import { Field } from '@blueriq/core';

@Component({
  selector: 'app-percentage-field',
  templateUrl: './percentage.component.html',
  styleUrls: ['./percentage.component.scss']
})

@BlueriqComponent({
  type: Field,
  selector: '[dataType=percentage]:not([hasDomain])'
})

export class PercentageFieldComponent {

  formControl = this.form.control(this.field, {updateOn: 'blur'});

  constructor(@Host() public field: Field, private form: BlueriqFormBuilder) {
  }

  getType() {
    return this.field.dataType;
  }

}
