import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { BlueriqFormBuilder, getFieldMessages } from '@blueriq/angular/forms';
import { Field, FieldMessages } from '@blueriq/core';
import { BqPresentationStyles } from '../../BqPresentationStyles';

@Component({
    selector: 'bq-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
@BlueriqComponent({
  type: Field,
  selector: '[hasDomain]',
})
export class SelectComponent {

  @HostBinding('class.fx-flex-row')

  formControl = this.form.control(this.field, { updateOn: 'blur', disableWhen: BqPresentationStyles.DISABLED });

  constructor(public field: Field, private readonly form: BlueriqFormBuilder) {
  }

  getMessages(): FieldMessages {
    return getFieldMessages(this.formControl);
  }
}
