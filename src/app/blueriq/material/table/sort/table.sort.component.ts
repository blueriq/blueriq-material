import { Component, Host } from '@angular/core';
import { BlueriqComponent, BlueriqSession } from '@blueriq/angular';
import { Button } from '@blueriq/core';

@Component({
  templateUrl: './table.sort.component.html',
  styleUrls: ['./table.sort.component.scss'],
})
@BlueriqComponent({
  type: Button,
  selector: '.sort',
})
export class TableSortComponent {

  constructor(@Host() public button: Button, private session: BlueriqSession) {
  }

  onClick(): void {
    if (this.button.enabled) {
      this.session.pressed(this.button);
    }
  }

  private getDirection(): string {
    const direction = this.button.styles.all()[1];
    return direction ? direction : null;
  }

  isAscending(): boolean {
    return this.getDirection() === 'ascending';
  }

  isDescending(): boolean {
    return this.getDirection() === 'descending';
  }

  hasNoDirection(): boolean {
    return this.getDirection() === null;
  }

}
