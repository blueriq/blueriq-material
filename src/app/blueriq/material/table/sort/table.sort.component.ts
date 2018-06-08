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

  hovering: boolean = false;
  iconMap = {
    ascending: 'arrow_downward',
    descending: 'arrow_upward',
  };

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

  hasNoDirection(): boolean {
    return this.getDirection() === null;
  }

  getIconByDirection() {
    const icon = this.iconMap[this.getDirection()];
    if (icon) {
      return icon;
    }
    return this.hovering ? this.iconMap.ascending : '';
  }

  mouseEnter() {
    if (this.hasNoDirection()) {
      this.hovering = true;
    }
  }

  mouseLeave() {
    if (this.hasNoDirection()) {
      this.hovering = false;
    }
  }
}
