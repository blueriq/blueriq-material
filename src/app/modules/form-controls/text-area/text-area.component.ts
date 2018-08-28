import { Component, Host } from '@angular/core';
import { BlueriqComponent, bySelector } from '@blueriq/angular';
import { BlueriqFormBuilder, getFieldMessages } from '@blueriq/angular/forms';
import { Field, FieldMessages } from '@blueriq/core';
import { BqPresentationStyles } from '../../BqPresentationStyles';

@Component({
  selector: 'bq-text-area',
  templateUrl: './text-area.component.html'
})
@BlueriqComponent({
  type: Field,
  /* Textfield that itself or parent having the presentationstyle largetext/memo */
  selector: bySelector(
    '[dataType=text].' + BqPresentationStyles.LARGETEXT + ', ' +
    '[dataType=text].' + BqPresentationStyles.MEMO + ', ' +
    '.' + BqPresentationStyles.MEMO + ' > [dataType=text], ' +
    '.' + BqPresentationStyles.LARGETEXT + ' > [dataType=text]',
    { priorityOffset: 100 })
})
export class TextAreaComponent {

  formControl = this.form.control(this.field, { updateOn: 'blur', disableWhen: BqPresentationStyles.DISABLED });

  constructor(@Host() public field: Field, private form: BlueriqFormBuilder) {
  }

  getErrors(): FieldMessages {
    return getFieldMessages(this.formControl);
  }

}
