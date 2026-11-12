import { Component } from '@angular/core';
import { BlueriqComponent, bySelector, BlueriqCommonModule } from '@blueriq/angular';
import { Field } from '@blueriq/core';
import { ReadonlyComponent } from '../../../readonly/readonly.component';
import { BqKeyDirective } from '../../../../shared/directive/bq-key/bq-key.directive';
import { MatTooltip } from '@angular/material/tooltip';
import { FormattingModule } from '@blueriq/angular/formatting';

@Component({
    selector: 'bq-table-readonly',
    templateUrl: './table-readonly.component.html',
    styleUrls: ['./table-readonly.component.scss'],
    imports: [BqKeyDirective, BlueriqCommonModule, MatTooltip, FormattingModule]
})
@BlueriqComponent({
  type: Field,
  selector: bySelector('[readonly]:not([dataType=boolean]), ' +
    '[readonly][hasDomain]', { priorityOffset: 1000 }),
})
export class TableReadonlyComponent extends ReadonlyComponent {

  getErrors(): string {
    return this.field.messages.all.map(error => error.text).join('\n');
  }

}
