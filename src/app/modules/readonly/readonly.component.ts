import { Component, inject } from '@angular/core';
import { BlueriqComponent, bySelector } from '@blueriq/angular';
import { Field } from '@blueriq/core';

@Component({
    selector: 'bq-readonly',
    templateUrl: './readonly.component.html',
    styleUrls: ['./readonly.component.scss'],
    standalone: false
})
@BlueriqComponent({
  type: Field,
  selector: bySelector('[readonly]:not([dataType=boolean]),' +
    '[readonly][hasDomain]', { priorityOffset: 1000 }),
})
export class ReadonlyComponent {  readonly field = inject(Field);

}
