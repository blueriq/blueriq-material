import { Component, Host, OnInit } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { BlueriqFormBuilder } from '@blueriq/angular/forms';
import { Field } from '@blueriq/core';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})

@BlueriqComponent({
  type: Field,
  selector: '[dataType=date]',
})

export class DatepickerComponent implements OnInit {

  formControl = this.form.control(this.field, {updateOn: 'blur'});
  fieldPrefix;
  fieldSuffix;

  constructor(@Host() public field: Field, private form: BlueriqFormBuilder) { }

  ngOnInit(): void {
    if (this.isDisabled()) {
      this.formControl.disable();
    }
    this.formControl.setValue(this.field.getValue());
  }

  /** Whether the select has a presentation style Disabled */
  isDisabled() {
    return this.field.styles.has('Disabled');
  }

  /** Whether the string field is read only */
  isReadonly() {
    return this.field.readonly;
  }


}
