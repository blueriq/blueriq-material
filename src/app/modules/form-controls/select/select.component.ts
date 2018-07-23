import { Component, Host } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { BlueriqFormBuilder } from '@blueriq/angular/forms';
import { DomainValue, Field } from '@blueriq/core';
import { PresentationStyles } from '../../presentationstyles';

@Component({
  selector: 'bq-select',
  templateUrl: './select.component.html'
})
@BlueriqComponent({
  type: Field,
  selector: '[hasDomain=true]'
})
export class SelectComponent {
  formControl = this.form.control(this.field, { updateOn: 'blur', disableWhen: PresentationStyles.DISABLED });

  constructor(@Host() public field: Field, private form: BlueriqFormBuilder) {
  }

  /** Returns all the available option from the field domain list */
  getOptions(): DomainValue[] {
    return this.field.domain.options;
  }
}
