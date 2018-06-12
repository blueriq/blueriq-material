import { Component, Host, OnInit } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { BlueriqFormBuilder } from '@blueriq/angular/forms';
import { DomainValue, Field } from '@blueriq/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html'
})

@BlueriqComponent({
  type: Field,
  selector: '[hasDomain=true]'
})
export class SelectComponent implements OnInit {
  formControl = this.form.control(this.field, { updateOn: 'blur' });

  constructor(@Host() public field: Field, private form: BlueriqFormBuilder) {
  }

  ngOnInit(): void {
    if (this.isDisabled() || this.isReadonly()) {
      this.formControl.disable();
    }
    this.formControl.setValue(this.field.getValue());
  }

  /** Whether the select has a presentation style Disabled */
  isDisabled() {
    return this.field.styles.has('Disabled');
  }

  /** Whether the select is read only */
  isReadonly() {
    return this.field.readonly;
  }

  /** Returns all the available option from the field domain list */
  getOptions(): DomainValue[] {
    return this.field.domain.options;
  }
}
