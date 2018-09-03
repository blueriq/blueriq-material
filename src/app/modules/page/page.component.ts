import { Component, Host } from '@angular/core';
import { BlueriqComponent, BlueriqSession } from '@blueriq/angular';
import { Page } from '@blueriq/core';

@Component({
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
@BlueriqComponent({
  type: Page
})
export class PageComponent {
  constructor(@Host() public page: Page,
              public blueriqSession: BlueriqSession
  ) {
  }

  get size(): string {
    if (this.page.contentStyle === 'large') {
      return 'large';
    } else if (this.page.contentStyle === 'medium') {
      return 'medium';
    } else if (this.page.contentStyle === 'small') {
      return 'small';
    } else if (this.page.contentStyle === 'full') {
      return 'full';
    }
    return 'responsive';
  }
}
