import { Component, inject } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { BlueriqFormBuilder, getFieldMessages } from '@blueriq/angular/forms';
import { List } from '@blueriq/angular/lists';
import { Field, FieldMessages } from '@blueriq/core';
import { BqPresentationStyles } from '../../../BqPresentationStyles';
import { BqKeyDirective } from '../../../../shared/directive/bq-key/bq-key.directive';
import { MatCheckbox } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatHint, MatError } from '@angular/material/form-field';

@Component({
    selector: 'bq-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['../selection-control.component.scss'],
    imports: [BqKeyDirective, MatCheckbox, FormsModule, ReactiveFormsModule, MatHint, MatError]
})
@BlueriqComponent({
  type: Field,
  selector: `[dataType=boolean]:not([hasDomain])`,
})
export class CheckboxComponent {
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
