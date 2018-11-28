import { Component, Host, Optional } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { BlueriqFormBuilder, getFieldMessages } from '@blueriq/angular/forms';
import { List } from '@blueriq/angular/lists';
import { Field, FieldMessages } from '@blueriq/core';
import { BqPresentationStyles } from '../../../BqPresentationStyles';

@Component({
  selector: 'bq-slide-toggle',
  templateUrl: './slide-toggle.component.html',
  styleUrls: ['../selection-control.component.scss'],
})
@BlueriqComponent({
  type: Field,
  selector: '.' + BqPresentationStyles.DEPRECATED_TOGGLE + '[dataType=boolean]:not([hasDomain]), ' +
    '.' + BqPresentationStyles.TOGGLE + '[dataType=boolean]:not([hasDomain])',
})
export class SlideToggleComponent {

  formControl = this.form.control(this.field, {
    syncOn: 'update',
    ifUnknown: false,
    disableWhen: BqPresentationStyles.DISABLED,
  });

  constructor(@Host() public field: Field,
              private form: BlueriqFormBuilder,
              @Host() @Optional() public readonly list: List) {
  }

  getMessages(): FieldMessages {
    return getFieldMessages(this.formControl);
  }
}
