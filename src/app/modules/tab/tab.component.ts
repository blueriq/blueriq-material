import { Component, Host } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { Container, Element, Field } from '@blueriq/core';
import { BqContentStyles } from '../BqContentStyles';

@Component({
  selector: 'bq-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
@BlueriqComponent({
  type: Container,
  selector: BqContentStyles.TAB
})
export class TabComponent {

  constructor(@Host() public container: Container) {
  }

  hasValidationErrors(element: Element): boolean {
    if (element instanceof Container) {
      return element.children.some(c => c instanceof Field && c.messages.hasMessages);
    }
    return false;
  }
}
