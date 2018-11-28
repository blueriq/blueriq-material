import { Component, Host } from '@angular/core';
import { BlueriqComponent, bySelector } from '@blueriq/angular';
import { Field } from '@blueriq/core';

@Component({
  selector: 'bq-readonly',
  templateUrl: './readonly.component.html',
  styleUrls: ['./readonly.component.scss'],
})
@BlueriqComponent({
  type: Field,
  selector: bySelector('[readonly]:not([dataType=boolean]),' +
    '[readonly][hasDomain]', { priorityOffset: 1000 }),
})
export class ReadonlyComponent {

  constructor(@Host() public readonly field: Field) {
  }
}
