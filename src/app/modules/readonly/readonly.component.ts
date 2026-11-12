import { Component, inject } from '@angular/core';
import { BlueriqComponent, bySelector } from '@blueriq/angular';
import { Field } from '@blueriq/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { BqKeyDirective } from '../../shared/directive/bq-key/bq-key.directive';
import { MatInput } from '@angular/material/input';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { FormattingModule } from '@blueriq/angular/formatting';

@Component({
    selector: 'bq-readonly',
    templateUrl: './readonly.component.html',
    styleUrls: ['./readonly.component.scss'],
    imports: [MatFormField, BqKeyDirective, MatLabel, MatInput, CdkTextareaAutosize, FormattingModule]
})
@BlueriqComponent({
  type: Field,
  selector: bySelector('[readonly]:not([dataType=boolean]),' +
    '[readonly][hasDomain]', { priorityOffset: 1000 }),
})
export class ReadonlyComponent {  readonly field = inject(Field);

}
