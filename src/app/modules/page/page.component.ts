import { Component, Host, OnInit } from '@angular/core';
import { BlueriqChild, BlueriqComponent, BlueriqSession, OnUpdate } from '@blueriq/angular';
import { Container, Page } from '@blueriq/core';
import { BqContentStyles } from '../BqContentStyles';

@Component({
  selector: 'bq-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
@BlueriqComponent({
  type: Page
})
export class PageComponent implements OnInit, OnUpdate {

  @BlueriqChild(Container, 'dashboard_header', { exclude: true, optional: true })
  dashboardHeader: Container;

  @BlueriqChild(Container, 'dashboard_menu', { exclude: true, optional: true })
  dashboardMenu: Container;

  pageSize: string;

  constructor(@Host() public page: Page,
              public blueriqSession: BlueriqSession) {
    this.pageSize = this.determinePageSize();
  }

  /**
   * Scroll to the top of the page whenever a new page is loaded.
   */
  ngOnInit(): void {
    window.scroll(0, 0);
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
