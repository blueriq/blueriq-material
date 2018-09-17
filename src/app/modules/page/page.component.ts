import { Component, Host } from '@angular/core';
import { BlueriqChild, BlueriqComponent, BlueriqSession, OnUpdate } from '@blueriq/angular';
import { Container, Page } from '@blueriq/core';
import { BqContentStyles } from '../BqContentStyles';

@Component({
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
@BlueriqComponent({
  type: Page
})
export class PageComponent implements OnUpdate {

  @BlueriqChild(Container, 'dashboard_header', { exclude: true, optional: true })
  dashboardHeader: Container;

  @BlueriqChild(Container, 'dashboard_menu', { exclude: true, optional: true })
  dashboardMenu: Container;

  pageSize: string;

  constructor(@Host() public page: Page,
              public blueriqSession: BlueriqSession) {
    this.pageSize = this.determinePageSize();
  }

  bqOnUpdate(): void {
    this.pageSize = this.determinePageSize();
  }

  determinePageSize(): string {
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
