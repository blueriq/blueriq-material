import { Component, ElementRef, Input, QueryList, ViewChildren } from '@angular/core';
import { MatMenuItem } from '@angular/material/menu';
import { Button, Container, Element } from '@blueriq/core';

@Component({
  selector: 'bq-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
})
export class MenuItemComponent {

  @Input() child: Element;
  @ViewChildren('items') inputs: QueryList<ElementRef<MatMenuItem>>;

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
    console.log(false);
    return false;
  }

  public onMenuKeyDown(event: KeyboardEvent, index: number) {
    let menuItem = this.asContainer(this.child).children;
    let lastIndex = this.inputs.length - 1;
    let previousIndex = index - 1;
    let nextIndex = index + 1;

    switch (event.key) {
      case 'ArrowUp':
        index == 0 ? this.focusElement(menuItem, lastIndex) : this.focusElement(menuItem, previousIndex);
        break;
      case 'ArrowDown':
        index == lastIndex ? this.focusElement(menuItem, 0) : this.focusElement(menuItem, nextIndex);
        break;
    }
  }

  public focusElement(elementArray: Element[], index: number) {
    let eName = elementArray[index].name || '';
    if (eName.length > 0) {
      setTimeout(() => {
        document.getElementsByName(eName)[0].focus();
      });
    }

  }
}
