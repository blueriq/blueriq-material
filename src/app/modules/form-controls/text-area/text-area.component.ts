import { Component, HostBinding, inject } from '@angular/core';
import { BlueriqComponent, bySelector } from '@blueriq/angular';
import { BlueriqFormBuilder, getFieldMessages } from '@blueriq/angular/forms';
import { Field, FieldMessages } from '@blueriq/core';
import { BqPresentationStyles } from '../../BqPresentationStyles';

@Component({
    selector: 'bq-text-area',
    styleUrls: ['./text-area.component.scss'],
    templateUrl: './text-area.component.html',
    standalone: false
})
@BlueriqComponent({
  type: Field,
  selector: bySelector('[dataType=text].' + BqPresentationStyles.LARGETEXT +
    ', [dataType=text].' + BqPresentationStyles.DEPRECATED_MEMO, { priorityOffset: 100 }),
})
export class TextAreaComponent {
  field = inject(Field);
  private readonly form = inject(BlueriqFormBuilder);


  @HostBinding('class.fx-flex-row')

  formControl = this.form.control(this.field, { updateOn: 'blur', disableWhen: BqPresentationStyles.DISABLED });

  getErrors(): FieldMessages {
    return getFieldMessages(this.formControl);
  }

}
