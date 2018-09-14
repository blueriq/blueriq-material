import { Component, Host } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { List } from '@blueriq/angular/lists';
import { Container } from '@blueriq/core';

@Component({
  templateUrl: './table.filter-icon.component.html'
})
@BlueriqComponent({
  type: Container,
  selector: '[contentStyle^=listplus_search_]'
})
export class TableFilterIconComponent {

  hovering = false;
  private readonly columnIndex;

  constructor(@Host() private readonly list: List, @Host() private readonly container: Container) {
    this.columnIndex = this.container.properties['index'];
  }

  isColumnFiltered(): boolean {
    if (this.columnIndex !== undefined && this.list.filter) {
      for (const value of this.list.filter.filterValues) {
        if (value.selectedOption && value.selectedOption.index === this.columnIndex) {
          return true;
        }
      }
    }
    return false;
  }
}
