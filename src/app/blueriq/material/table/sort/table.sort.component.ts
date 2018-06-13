import { Component, Host } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { Button } from '@blueriq/core';

@Component({
  templateUrl: './table.sort.component.html',
  styleUrls: ['./table.sort.component.scss']
})
@BlueriqComponent({
  type: Button,
  selector: '.sort'
})
export class TableSortComponent {

  hovering = false;

  constructor(@Host() public button: Button) {
  }

  getIconByDirection(): string {
    if (this.button.styles.has('ascending')) {
      return 'arrow_downward';
    } else if (this.button.styles.has('descending')) {
      return 'arrow_upward';
    } else {
      return this.hovering ? 'arrow_downward' : '';
    }
  }

  mouseEnter() {
    this.hovering = true;
  }

  mouseLeave() {
    this.hovering = false;
  }
}
