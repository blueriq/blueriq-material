import { Component, Host, Input } from '@angular/core';
import { List, TableColumn } from '@blueriq/angular/lists';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'bq-header-column',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [List]
})
export class TableHeaderColumnComponent {

  @Input()
  public column: TableColumn;

  isColumnFiltered$: Observable<boolean>;

  hovering: boolean;

  constructor(@Host() private readonly list: List) {
    this.isColumnFiltered$ = list.filter$.pipe(
      map(filter => {
        const columnName = this.column.header ? this.column.header.name : undefined;
        if (!filter || columnName === undefined) {
          return false;
        }
        return filter.filterValues.some(value => value.selectedOption ? value.selectedOption.title === columnName : false);
      })
    );
  }

  isSorting() {
    if (!this.column.sort) {
      return false;
    }
    return this.column.sort.styles.hasAny('ascending', 'descending');
  }

  getIconByDirection(): string {
    if (!this.column.sort) {
      return '';
    }
    if (this.column.sort.styles.has('ascending')) {
      return 'arrow_downward';
    } else if (this.column.sort.styles.has('descending')) {
      return 'arrow_upward';
    } else {
      return 'arrow_downward';
    }
  }
}
