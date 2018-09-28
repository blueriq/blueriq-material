import { Component, Host } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { BlueriqFormBuilder, getFieldMessages } from '@blueriq/angular/forms';
import { DomainValue, Field, FieldMessages } from '@blueriq/core';
import { BqPresentationStyles } from '../../BqPresentationStyles';

@Component({
  selector: 'bq-select',
  templateUrl: './select.component.html'
})
@BlueriqComponent({
  type: Field,
  selector: '[hasDomain]'
})
export class SelectComponent {
  formControl = this.form.control(this.field, { updateOn: 'blur', disableWhen: BqPresentationStyles.DISABLED });

  constructor(@Host() public field: Field, private form: BlueriqFormBuilder) {
  }

  /** Returns all the available option from the field domain list */
  getOptions(): DomainValue[] {
    return this.field.domain.options;
  }

  getMessages(): FieldMessages {
    return getFieldMessages(this.formControl);
  }
}
