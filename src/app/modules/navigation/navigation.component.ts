import { Component, inject } from '@angular/core';
import { BlueriqChildren, BlueriqComponent, BlueriqComponents, BlueriqCommonModule } from '@blueriq/angular';
import { Button, Container } from '@blueriq/core';
import { BqContentStyles } from '../BqContentStyles';
import { NavigationItemComponent } from './navigation-item/navigation-item.component';
import { BqKeyDirective } from '../../shared/directive/bq-key/bq-key.directive';
import { BqContainerDirective } from '../../shared/directive/container/bq-container.directive';

@Component({
    selector: 'bq-navigation-menu',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
    providers: [BlueriqComponents.scoped([NavigationItemComponent])],
    imports: [BlueriqCommonModule, BqKeyDirective, BqContainerDirective]
})
@BlueriqComponent({
  type: Container,
  selector: `${ BqContentStyles.NAVIGATION_MENU }`,
})
export class NavigationComponent {
  readonly container = inject(Container);


  @BlueriqChildren(Button)
  buttons: Button[];
}
