import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { DashboardModel, PageModel, WidgetIdManager } from '@blueriq/dashboard';
import { DASHBOARD_PAGE_ID } from '../routing/route-fragments';
import { DashboardError } from './dashboard-error';

@Injectable()
export class PageResolver implements Resolve<PageModel | undefined> {

  constructor(private readonly widgetIdManager: WidgetIdManager) {
  }

  resolve(route: ActivatedRouteSnapshot): PageModel | undefined {
    const dashboard = route.parent?.data?.dashboard as DashboardModel | DashboardError;
    if (dashboard === undefined || dashboard instanceof DashboardError) {
      return undefined;
    }

    const pageRouteId = route.paramMap.get(DASHBOARD_PAGE_ID);
    this.widgetIdManager.scopeToPage(pageRouteId ?? '___entry___');

    const pageId = pageRouteId ?? dashboard.entryPage;

    return dashboard.pages.find(page => page.id === pageId);
  }
}
