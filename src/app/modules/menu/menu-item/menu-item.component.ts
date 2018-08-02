import { Component, Input } from '@angular/core';
import { BlueriqSession } from '@blueriq/angular';
import { Button, Container, Element } from '@blueriq/core';

@Component({
  selector: 'bq-menu-item',
  templateUrl: './menu-item.component.html'
})
export class MenuItemComponent {

  @Input() child: Element;

  constructor(private session: BlueriqSession /*TODO not like this*/) {
  }

  onClick(child: Button): void {
    if (child.enabled) {
      this.session.pressed(child);
    }
  }

  isButton(element: any): boolean {
    return (element instanceof Button) ? true : false;
  }

  isContainer(element: any): boolean {
    return (element instanceof Container) ? true : false;
  }

  asButton(element: any): Button {
    return element as Button;
  }

  asContainer(element: any): Container {
    return element as Container;
  }

}
