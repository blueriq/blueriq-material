import { Component, Host, OnInit } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { List } from '@blueriq/angular/lists';
import { Container } from '@blueriq/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'bq-list',
  templateUrl: './list.component.html',
  providers: [List]
})
@BlueriqComponent({
  type: Container,
  selector: ':has(* > table)'
})
export class ListComponent implements OnInit {
  // @BlueriqChild(Container, 'table')
  // tableContainer: Container;
  //
  // @BlueriqChild(Container, 'listplus_header', { optional: true })
  // searchContainer: Container;
  //
  // @BlueriqChild(Container, 'listplus_footer', { optional: true })
  // paginationContainer: Container;
  //
  // @BlueriqChildren(Container, '[contentStyle^=listplus_search_]', { descendants: true })
  // searchColumns: Container[];

  searchContainers: Container[];

  constructor(@Host() public readonly list: List) {
  }

  ngOnInit(): void {
    const searches$: Observable<(Container | undefined)[]> = this.list.table.columns$.pipe(map(columns => columns.map(column => column.search)));
    // this.list.table.rows$.forEach(row => console.log(row));
  }
}
