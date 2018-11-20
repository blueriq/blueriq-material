import { Component } from '@angular/core';
import { BlueriqChild, BlueriqComponent } from '@blueriq/angular';
import { Container } from '@blueriq/core';
import { BqContentStyles } from '../BqContentStyles';

@Component({
  selector: 'bq-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
@BlueriqComponent({
  type: Container,
  selector: BqContentStyles.DASHBOARD_MENU,
})
export class MenuComponent {

  @BlueriqChild(Container, 'menubar')
  menuBar: Container;

}
