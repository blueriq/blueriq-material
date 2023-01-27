import { ActivatedRoute } from '@angular/router';
import { DashboardModel } from '@blueriq/dashboard';
import { PageFinderService } from './page-finder.service';

describe('PageFinderService', () => {
  const dashboard: DashboardModel = {
    id: 'test-dashboard',
    entryPage: 'testPage1',
    pages: [
      {
        id: 'testPage1',
        events: [
          {
            type: 'testType',
            context: 'testContext',
          },
        ],
        layout: 'single-column',
        columns: [
          {
            widgets: [],
          },
        ],
        menuItems: [],
      },
      {
        id: 'testPage2',
        events: [
          {
            type: 'testType',
            context: 'testContext',
          },
        ],
        layout: 'single-column',
        columns: [
          {
            widgets: [],
          },
        ],
        menuItems: [],
      },
    ],
  };

  it('should return the first page with the correct event mappings', () => {
    const pageFinderService = new PageFinderService({ snapshot: { data: { dashboard } } } as unknown as ActivatedRoute);

    const page = pageFinderService.tryFindPageWithEvent('testType', 'testContext');

    expect(page).toBeDefined();
    expect(page?.id).toEqual('testPage1');
  });

  it('should return undefined when no page found with given event mappings', () => {
    const pageFinderService = new PageFinderService({ snapshot: { data: { dashboard } } } as unknown as ActivatedRoute);

    const page = pageFinderService.tryFindPageWithEvent('nope', 'wrong');

    expect(page).toBeUndefined();
  });
});
