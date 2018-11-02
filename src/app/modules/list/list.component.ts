import { Component, Host } from '@angular/core';
import { BlueriqComponent, BlueriqComponents } from '@blueriq/angular';
import { List } from '@blueriq/angular/lists';
import { Container } from '@blueriq/core';
import { BqContentStyles } from '../BqContentStyles';
import { TABLE_FORM_CONTROL_COMPONENTS } from './form-controls/table-form-control.module';

@Component({
  selector: 'bq-list',
  templateUrl: './list.component.html',
  providers: [List, BlueriqComponents.scoped(TABLE_FORM_CONTROL_COMPONENTS)]
})
@BlueriqComponent({
  type: Container,
  selector: `:has(* > ${BqContentStyles.TABLE})`
})
export class ListComponent {

  constructor(@Host() public container: Container,
              @Host() public readonly list: List) {
  }
}
