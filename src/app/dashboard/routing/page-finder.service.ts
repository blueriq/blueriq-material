import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardModel, PageModel } from '@blueriq/dashboard';

/**
 * Uses the currently resolved dashboard model to find certain pages according to user provided criteria.
 */
@Injectable()
export class PageFinderService {
  constructor(private readonly route: ActivatedRoute) {
  }

  /**
   * Searches the currently resolved dashboard model for the first occurrence
   * of an event mapping and returns that page model.
   * Returns undefined when no such page model matches the criteria or no dashboard is currently resolved.
   *
   * @param eventType The type of the event.
   * @param eventContext The context of the event.
   */
  tryFindPageWithEvent(eventType: string, eventContext: string): PageModel | undefined {
    const dashboard = this.route.snapshot.data.dashboard as DashboardModel | undefined;
    if (!dashboard) {
      return undefined;
    }

    const pages = Object.values(dashboard.pages);
    return pages.find(
      page => page.events
        .find(event => event.type === eventType && event.context === eventContext));
  }
}
