import { Component, inject } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { BlueriqFormBuilder, getFieldMessages } from '@blueriq/angular/forms';
import { List } from '@blueriq/angular/lists';
import { Field, FieldMessages } from '@blueriq/core';
import { BqPresentationStyles } from '../../../BqPresentationStyles';

@Component({
    selector: 'bq-slide-toggle',
    templateUrl: './slide-toggle.component.html',
    styleUrls: [
        'slide-toggle.component.scss',
        '../selection-control.component.scss',
    ],
    standalone: false
})
@BlueriqComponent({
  type: Field,
  selector: '.' + BqPresentationStyles.DEPRECATED_TOGGLE + '[dataType=boolean]:not([hasDomain]), ' +
    '.' + BqPresentationStyles.SWITCH + '[dataType=boolean]:not([hasDomain])',
})
export class SlideToggleComponent {
  field = inject(Field);
  private readonly form = inject(BlueriqFormBuilder);
  readonly list = inject(List, { optional: true });


  formControl = this.form.control(this.field, {
    syncOn: 'update',
    ifUnknown: false,
    disableWhen: BqPresentationStyles.DISABLED,
  });

  getMessages(): FieldMessages {
    return getFieldMessages(this.formControl);
  }
}
