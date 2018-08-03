import { Component, Input } from '@angular/core';
import { BlueriqSession } from '@blueriq/angular';
import { Button, Container, Element } from '@blueriq/core';

@Component({
  selector: 'bq-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent {

  @Input() child: Element;

  constructor(private session: BlueriqSession) {
  }

  onClick(child: Button): void {
    if (child.enabled) {
      this.session.pressed(child);
    }
  }

  isButton(element: any): boolean {
    return (element instanceof Button);
  }

  isContainer(element: any): boolean {
    return (element instanceof Container);
  }

  asButton(element: any): Button {
    return element as Button;
  }

  asContainer(element: any): Container {
    return element as Container;
  }

}
