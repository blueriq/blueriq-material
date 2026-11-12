import { Component, inject } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { BlueriqFormBuilder, getFieldMessages } from '@blueriq/angular/forms';
import { List } from '@blueriq/angular/lists';
import { Field, FieldMessages } from '@blueriq/core';
import { BqPresentationStyles } from '../../../BqPresentationStyles';
import { BqKeyDirective } from '../../../../shared/directive/bq-key/bq-key.directive';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatHint, MatError } from '@angular/material/form-field';

@Component({
    selector: 'bq-slide-toggle',
    templateUrl: './slide-toggle.component.html',
    styleUrls: [
        'slide-toggle.component.scss',
        '../selection-control.component.scss',
    ],
    imports: [BqKeyDirective, MatSlideToggle, FormsModule, ReactiveFormsModule, MatHint, MatError]
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
