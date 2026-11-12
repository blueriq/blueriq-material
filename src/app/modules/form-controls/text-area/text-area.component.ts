import { Component, HostBinding, inject } from '@angular/core';
import { BlueriqComponent, bySelector } from '@blueriq/angular';
import { BlueriqFormBuilder, getFieldMessages } from '@blueriq/angular/forms';
import { Field, FieldMessages } from '@blueriq/core';
import { BqPresentationStyles } from '../../BqPresentationStyles';
import { MatFormField, MatLabel, MatHint, MatError } from '@angular/material/form-field';
import { BqKeyDirective } from '../../../shared/directive/bq-key/bq-key.directive';
import { MatInput } from '@angular/material/input';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'bq-text-area',
    styleUrls: ['./text-area.component.scss'],
    templateUrl: './text-area.component.html',
    imports: [MatFormField, BqKeyDirective, MatLabel, MatInput, CdkTextareaAutosize, FormsModule, ReactiveFormsModule, MatHint, MatError]
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
