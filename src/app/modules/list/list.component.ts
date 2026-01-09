import { Component, inject } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { List } from '@blueriq/angular/lists';
import { Container } from '@blueriq/core';
import { BqPresentationStyles } from '../BqPresentationStyles';

@Component({
    selector: 'bq-list',
    templateUrl: './list.component.html',
    providers: [List],
    standalone: false
})
@BlueriqComponent({
  type: Container,
  selector: `:has(* > table)`,
})
export class ListComponent {
  container = inject(Container);
  readonly list = inject(List);


  shouldShowSearchBox(): boolean {
    return !this.container.styles.has(BqPresentationStyles.DO_NOT_SHOW_SEARCH);
  }
}
