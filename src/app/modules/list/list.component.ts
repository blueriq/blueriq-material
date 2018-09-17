import { Component, Host } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { List } from '@blueriq/angular/lists';
import { Container } from '@blueriq/core';
import { BqContentStyles } from '../BqContentStyles';

@Component({
  selector: 'bq-list',
  templateUrl: './list.component.html',
  providers: [List]
})
@BlueriqComponent({
  type: Container,
  selector: `:has(* > ${BqContentStyles.TABLE})`
})
export class ListComponent {

  constructor(@Host() public readonly list: List) {
  }
}
