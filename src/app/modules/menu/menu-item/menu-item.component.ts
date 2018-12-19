import { Component, Input } from '@angular/core';
import { Button, Container, Element } from '@blueriq/core';

@Component({
  selector: 'bq-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
})
export class MenuItemComponent {

  @Input() child: Element;

  asButton(element: Element): Button {
    return element as Button;
  }

  asContainer(element: Element): Container {
    return element as Container;
  }

  isRootOfMenubar(element: Element): boolean {
    if (element.parent instanceof Container) {
      return element.parent.contentStyle === 'menubar';
    }
    return false;
  }

}
