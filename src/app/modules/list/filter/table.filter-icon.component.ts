import { Component, Host } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { List } from '@blueriq/angular/lists';
import { Container } from '@blueriq/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  templateUrl: './table.filter-icon.component.html'
})
@BlueriqComponent({
  type: Container,
  selector: '[contentStyle^=listplus_search_]'
})
export class TableFilterIconComponent {

  isColumnFiltered$: Observable<boolean>;

  constructor(@Host() private readonly list: List, @Host() private readonly container: Container) {
    this.isColumnFiltered$ = list.filter$.pipe(
      map(filter => {
        const columnIndex = container.properties['index'];

        if (!filter || columnIndex === undefined) {
          return false;
        }

        return filter.filterValues.some(value => value.selectedOption ? value.selectedOption.index === columnIndex : false);
      })
    );
  }

}
