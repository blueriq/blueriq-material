import { Component } from '@angular/core';
import { BlueriqChildren, BlueriqComponent, BlueriqComponents } from '@blueriq/angular';
import { Button, Container } from '@blueriq/core';
import { BqContentStyles } from '../BqContentStyles';
import { NavigationItemComponent } from './navigation-item/navigation-item.component';

@Component({
  selector: 'bq-navigation-menu',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  providers: [BlueriqComponents.scoped([NavigationItemComponent])],
})
@BlueriqComponent({
  type: Container,
  selector: `${ BqContentStyles.NAVIGATION_MENU }`,
})
export class NavigationComponent {

  @BlueriqChildren(Button)
  buttons: Button[];

  constructor(public readonly container: Container) {
  }
}
