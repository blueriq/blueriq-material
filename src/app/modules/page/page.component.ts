import { Component, HostBinding, OnInit, inject } from '@angular/core';
import { BlueriqChild, BlueriqChildren, BlueriqComponent, OnUpdate } from '@blueriq/angular';
import { Container, Page } from '@blueriq/core';
import { BackendBusyService } from '@shared/loading/backend-busy.service';
import { BqContentStyles } from '../BqContentStyles';

@Component({
    selector: 'bq-page',
    templateUrl: './page.component.html',
    styleUrls: [
        './page.component.scss',
    ],
    standalone: false
})
@BlueriqComponent({
  type: Page,
})
export class PageComponent implements OnInit, OnUpdate {
  page = inject(Page);
  private readonly backendBusy = inject(BackendBusyService);

  @BlueriqChild(Container, BqContentStyles.DASHBOARD_HEADER, { exclude: true, optional: true })
  dashboardHeader: Container;

  @BlueriqChildren(Container, BqContentStyles.DASHBOARD_MENU, { exclude: true })
  dashboardMenus: Container[];

  @BlueriqChild(Container, BqContentStyles.NAVIGATION_MENU, { exclude: true, optional: true, descendants: true })
  navigationMenu: Container;

  pageSize: string;

  constructor() {
    this.pageSize = this.determinePageSize();
  }

  /**
   * Makes the entire page non-interactive (blocks clicks, focus and typing) while a blocking
   * request to the backend is in progress, so the user cannot trigger additional requests before
   * the current one completes. Reacts immediately, unlike the loading overlay which only appears
   * after 400ms. Uses {@link BackendBusyService.blocking}, which excludes field refreshes, so a
   * refresh neither locks the page nor breaks tabbing between fields.
   */
  @HostBinding('attr.inert')
  get inert(): string | null {
    return this.backendBusy.blocking() ? '' : null;
  }

  /**
   * - Scroll to the top of the page whenever a new page is loaded.
   * - Decide on how many toolbars are rendered so the page can use margin-top * toolbars
   */
  ngOnInit(): void {
    window.scroll(0, 0);
  }

  bqOnUpdate(): void {
    this.pageSize = this.determinePageSize();
  }

  determinePageSize(): string {
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
