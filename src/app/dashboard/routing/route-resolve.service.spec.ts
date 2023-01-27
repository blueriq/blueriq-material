import { ActivatedRoute, convertToParamMap, ParamMap } from '@angular/router';
import { DashboardModel } from '@blueriq/dashboard';
import { RouteResolveService } from './route-resolve.service';

describe('RouteResolveService', () => {
  const dashboard: DashboardModel = {
    id: 'biogas',
    pages: [
      {
        id: 'main',
        events: [{ 'type': 'Main', 'context': 'CaseTypeA' }],
        layout: 'single-column',
        columns: [{ widgets: [] }],
        menuItems: [],
      },
      {
        id: 'open-case',
        events: [{ 'type': 'open-case', 'context': 'caseType' }],
        layout: 'single-column',
        columns: [{ widgets: [] }],
        menuItems: [],
      },
    ],
    entryPage: 'main',
  };

  it('should resolve the correct URI according to current dashboard id', () => {
    const route = {
      snapshot: {
        get paramMap(): ParamMap {
          return convertToParamMap({ 'dashboardId': 'biogas' });
        },
        data: { dashboard },
      },
    } as unknown as ActivatedRoute;

    const routeResolveService = new RouteResolveService(route);

    const uri = routeResolveService.resolve('main');

    expect(uri).toEqual('/dashboard/biogas/main');
  });

  it('should resolve URIs containing slashes', () => {
    const route = {
      snapshot: {
        get paramMap(): ParamMap {
          return convertToParamMap({ 'dashboardId': 'biogas' });
        },
        data: { dashboard },
      },
    } as unknown as ActivatedRoute;

    const routeResolveService = new RouteResolveService(route);

    const uri = routeResolveService.resolve('/main');

    expect(uri).toEqual('/dashboard/biogas/main');
  });
});
