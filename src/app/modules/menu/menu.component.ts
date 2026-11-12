import { Component } from '@angular/core';
import { BlueriqChild, BlueriqComponent, BlueriqCommonModule } from '@blueriq/angular';
import { Container } from '@blueriq/core';
import { BqContentStyles } from '../BqContentStyles';
import { MatToolbar } from '@angular/material/toolbar';
import { MenuItemComponent } from './menu-item/menu-item.component';

@Component({
    selector: 'bq-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
    imports: [MatToolbar, MenuItemComponent, BlueriqCommonModule]
})
@BlueriqComponent({
  type: Container,
  selector: BqContentStyles.DASHBOARD_MENU,
})
export class MenuComponent {

  @BlueriqChild(Container, 'menubar')
  menuBar: Container;

}
