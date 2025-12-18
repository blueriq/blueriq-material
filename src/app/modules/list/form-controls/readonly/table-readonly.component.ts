import { Component } from '@angular/core';
import { BlueriqComponent, bySelector } from '@blueriq/angular';
import { Field } from '@blueriq/core';
import { ReadonlyComponent } from '../../../readonly/readonly.component';

@Component({
    selector: 'bq-table-readonly',
    templateUrl: './table-readonly.component.html',
    styleUrls: ['./table-readonly.component.scss'],
    standalone: false
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
