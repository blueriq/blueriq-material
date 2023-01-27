import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, convertToParamMap } from '@angular/router';
import { DashboardModel, WidgetIdManager } from '@blueriq/dashboard';
import { PageResolver } from './page.resolver';
import createSpy = jasmine.createSpy;

describe('Page Resolver', () => {
  let resolver: PageResolver;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PageResolver,
        {
          provide: WidgetIdManager,
          useClass: class {
            scopeToPage = createSpy('scopeToPage');
          },
        },
      ],
    });
    resolver = TestBed.inject(PageResolver);
  });

  it('should resolve the page from the pageId', () => {
    const dashboard: DashboardModel = {
      id: 'dashboard',
      pages: [{ id: 'main', events: [], layout: 'single-column', columns: [{ widgets: [] }], menuItems: [] }],
      entryPage: 'main',
    };

    const paramMap = convertToParamMap({ 'pageId': 'main' });
    const parent = { data: { dashboard } } as unknown as ActivatedRouteSnapshot;
    const resolved = resolver.resolve({ paramMap, parent } as ActivatedRouteSnapshot);

    expect(resolved).toEqual({
      id: 'main',
      events: [],
      layout: 'single-column',
      columns: [{ widgets: [] }],
      menuItems: [],
    });
  });

  it('should retrieve the entry page', () => {
    const dashboard: DashboardModel = {
      id: 'dashboard',
      pages: [{ id: 'main', events: [], layout: 'single-column', columns: [{ widgets: [] }], menuItems: [] }],
      entryPage: 'main',
    };

    const paramMap = convertToParamMap({});
    const parent = { data: { dashboard } } as unknown as ActivatedRouteSnapshot;
    const resolved = resolver.resolve({ paramMap, parent } as ActivatedRouteSnapshot);

    expect(resolved).toEqual({
      id: 'main',
      events: [],
      layout: 'single-column',
      columns: [{ widgets: [] }],
      menuItems: [],
    });
  });

  it('should not crash if the dashboard is not on the route data', () => {
    const paramMap = convertToParamMap({});
    const resolved = resolver.resolve({ paramMap } as ActivatedRouteSnapshot);

    expect(resolved).toBeUndefined();
  });

  it('should change the id manager scope to the new page id', () => {
    const widgetIdManager = TestBed.inject(WidgetIdManager);
    const dashboard: DashboardModel = {
      id: 'dashboard',
      pages: [{ id: 'main', events: [], layout: 'single-column', columns: [{ widgets: [] }], menuItems: [] }],
      entryPage: 'main',
    };

    const paramMap = convertToParamMap({ 'pageId': 'main' });
    const parent = { data: { dashboard } } as unknown as ActivatedRouteSnapshot;
    resolver.resolve({ paramMap, parent } as ActivatedRouteSnapshot);

    expect(widgetIdManager.scopeToPage).toHaveBeenCalledWith('main');
  });

  it('should change the id manager scope to the entry page scope', () => {
    const widgetIdManager = TestBed.inject(WidgetIdManager);
    const dashboard: DashboardModel = {
      id: 'dashboard',
      pages: [{ id: 'main', events: [], layout: 'single-column', columns: [{ widgets: [] }], menuItems: [] }],
      entryPage: 'main',
    };

    const paramMap = convertToParamMap({});
    const parent = { data: { dashboard } } as unknown as ActivatedRouteSnapshot;
    resolver.resolve({ paramMap, parent } as ActivatedRouteSnapshot);

    expect(widgetIdManager.scopeToPage).toHaveBeenCalledWith('___entry___');
  });

});
