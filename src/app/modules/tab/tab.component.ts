import { Component, Host } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { Container } from '@blueriq/core';
import { BqContentStyles } from '../BqContentStyles';

@Component({
  selector: 'bq-tab',
  templateUrl: './tab.component.html'
})
@BlueriqComponent({
  type: Container,
  selector: BqContentStyles.TAB
})
export class TabComponent {

  constructor(@Host() public container: Container) {
  }
}
