import { Component, inject } from '@angular/core';
import { BlueriqComponent, BlueriqCommonModule } from '@blueriq/angular';
import { Container } from '@blueriq/core';
import { BqContentStyles } from '../BqContentStyles';
import { HeadingComponent } from '../heading/heading.component';
import { MatTabGroup, MatTab, MatTabLabel } from '@angular/material/tabs';
import { BqContainerDirective } from '../../shared/directive/container/bq-container.directive';

@Component({
    selector: 'bq-tab',
    templateUrl: './tab.component.html',
    styleUrls: ['./tab.component.scss'],
    imports: [HeadingComponent, MatTabGroup, BqContainerDirective, MatTab, MatTabLabel, BlueriqCommonModule]
})
@BlueriqComponent({
  type: Container,
  selector: BqContentStyles.TAB,
})
export class TabComponent {  container = inject(Container);


}
