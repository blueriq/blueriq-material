import { Component, Host } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { List } from '@blueriq/angular/lists';
import { Container } from '@blueriq/core';

@Component({
  selector: 'bq-list',
  templateUrl: './list.component.html',
  providers: [List],
})
@BlueriqComponent({
  type: Container,
  selector: `:has(* > table)`,
})
export class ListComponent {

  constructor(@Host() public container: Container,
              @Host() public readonly list: List) {
  }
}
