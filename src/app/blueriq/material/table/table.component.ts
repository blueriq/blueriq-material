import {Component, OnInit, Host} from '@angular/core';
import {BlueriqComponent } from '@blueriq/angular';
import {Table} from '@blueriq/angular/lists';
import {Container} from '@blueriq/core';

@Component({
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [Table]
})
@BlueriqComponent({
  type: Container,
  selector: 'table'
})
export class TableComponent {

  constructor(@Host() public table: Table) {
  }
}
