import { ChangeDetectionStrategy, Component, HostBinding, inject } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { BlueriqFormBuilder, getFieldMessages } from '@blueriq/angular/forms';
import { Field, FieldMessages } from '@blueriq/core';
import { BqPresentationStyles } from '../../BqPresentationStyles';
import { MatFormField, MatLabel, MatHint, MatError } from '@angular/material/form-field';
import { BqKeyDirective } from '../../../shared/directive/bq-key/bq-key.directive';
import { MatSelect } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatOption } from '@angular/material/autocomplete';

@Component({
    selector: 'bq-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [MatFormField, BqKeyDirective, MatLabel, MatSelect, FormsModule, ReactiveFormsModule, MatOption, MatHint, MatError]
})
@BlueriqComponent({
  type: Field,
  selector: '[hasDomain]',
})
export class SelectComponent {
  field = inject(Field);
  private readonly form = inject(BlueriqFormBuilder);


  @HostBinding('class.fx-flex-row')

  formControl = this.form.control(this.field, { updateOn: 'blur', disableWhen: BqPresentationStyles.DISABLED });

  getMessages(): FieldMessages {
    return getFieldMessages(this.formControl);
  }
}
