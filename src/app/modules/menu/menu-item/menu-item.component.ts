import { Component, ElementRef, Input, QueryList, ViewChildren } from '@angular/core';
import { MatMenuItem } from '@angular/material/menu';
import { Button, Container, Element } from '@blueriq/core';

@Component({
    selector: 'bq-menu-item',
    templateUrl: './menu-item.component.html',
    styleUrls: ['./menu-item.component.scss'],
    standalone: false
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
    return false;
  }

  public onMenuKeyDown(event: KeyboardEvent, index: number) {
    const menuItems = this.asContainer(this.child).children;
    const lastIndex = this.inputs.length - 1;
    const previousIndex = index - 1;
    const nextIndex = index + 1;
    let newIndex = nextIndex;

    switch (event.key) {
      case 'ArrowUp':
        newIndex = index === 0 ? lastIndex : previousIndex;
        break;
      case 'ArrowDown':
        newIndex = index === lastIndex ? 0 : nextIndex;
        break;
    }
    this.focusElement(menuItems, newIndex);
  }

  public focusElement(elementArray: Element[], index: number) {
    const elementName = elementArray[index].functionalKey || '';
    if (elementName.length > 0) {
      setTimeout(() => {
        document.getElementsByName(elementName)[0].focus();
      });
    }

  }

  handleEnterSubmenu(event: KeyboardEvent, child: Element) {
    if (child.type === 'container') {
      const possibleSubMenuEnterKeys: string[] = ['ArrowRight', 'ArrowDown'];
      if (possibleSubMenuEnterKeys.includes(event.key)) {
        setTimeout(() => {
          const firstItemOfSubMenu = document.getElementsByName(this.asContainer(child).children[0].functionalKey)[0];
          if (firstItemOfSubMenu !== undefined) {
            firstItemOfSubMenu.focus();
          }
        });
      }
    }

  }
}
