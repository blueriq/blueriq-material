import { Component, Host } from '@angular/core';
import { BlueriqComponent, BlueriqSession } from '@blueriq/angular';
import { Page } from '@blueriq/core';
import { BqContentStyles } from '../BqContentStyles';

@Component({
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
@BlueriqComponent({
  type: Page
})
export class PageComponent {

  size;

  constructor(@Host() public page: Page,
              public blueriqSession: BlueriqSession) {
    this.size = this.determineSize();
  }

  determineSize(): string {
    if (this.blueriqSession.isWidget) {
      return 'full';
    }
    if (this.page.contentStyle === BqContentStyles.WIDTH_LARGE) {
      return 'large';
    } else if (this.page.contentStyle === BqContentStyles.WIDTH_MEDIUM) {
      return 'medium';
    } else if (this.page.contentStyle === BqContentStyles.WIDTH_SMALL) {
      return 'small';
    } else if (this.page.contentStyle === BqContentStyles.WIDTH_FULL) {
      return 'full';
    }
    return 'responsive';
  }

}
