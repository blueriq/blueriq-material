import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ActivatedRouteSnapshot, convertToParamMap, UrlSegment } from '@angular/router';
import { Dispatcher } from '@blueriq/angular';
import { DashboardService, UnauthorizedError } from '@blueriq/dashboard';
import { of, throwError } from 'rxjs';
import { LoginAction } from '../events/actions';
import { DashboardResolver } from './dashboard.resolver';
import createSpyObj = jasmine.createSpyObj;

describe('Dashboard Resolver', () => {
  let service: jasmine.SpyObj<DashboardService>;
  let dispatcher: jasmine.SpyObj<Dispatcher>;
  let resolver: DashboardResolver;

  beforeEach(() => {
    service = createSpyObj(DashboardService, ['getDashboard']);
    dispatcher = createSpyObj(Dispatcher, ['dispatch']);
    TestBed.configureTestingModule({
      providers: [
        { provide: DashboardService, useValue: service },
        { provide: Dispatcher, useValue: dispatcher },
        DashboardResolver,
      ],
    });
    resolver = TestBed.inject(DashboardResolver);
  });

  it('should resolve the dashboard', (done) => {
    const dashboard = { id: 'dashboard', pages: [], entryPage: 'main' };
    service.getDashboard.and.callFake(() => of(dashboard));

    const paramMap = convertToParamMap({ 'dashboardId': 'dashboard' });
    const resolve = resolver.resolve({ paramMap } as ActivatedRouteSnapshot);

    resolve.subscribe(resolved => {
      expect(resolved).toEqual(dashboard);
      expect(service.getDashboard).toHaveBeenCalledWith('dashboard');
      done();
    }).unsubscribe();
  });

  it('should not crash if the route does not contain a dashboard id', (done) => {
    const paramMap = convertToParamMap({});
    const resolve = resolver.resolve({ paramMap } as ActivatedRouteSnapshot);

    resolve.subscribe(resolved => {
      expect(resolved).toBeUndefined();
      done();
    }).unsubscribe();
  });

  it('should return error if we are not able to retrieve a dashboard', (done) => {
    const expectedError = new Error('expectedError');
    service.getDashboard.and.callFake(() => throwError(expectedError));

    const paramMap = convertToParamMap({ 'dashboardId': 'TestId' });
    const resolve = resolver.resolve({ paramMap } as ActivatedRouteSnapshot);

    resolve.subscribe(_ => {
      // test should always fail when this callback is called, because the error callback should be called.
      expect(true).toBeFalse();
    }, error => {
      expect(error).toBeDefined();
      expect(error.message).toEqual('expectedError');
      expect(service.getDashboard).toHaveBeenCalledWith('TestId');
      expect(dispatcher.dispatch).not.toHaveBeenCalled();
      done();
    }).unsubscribe();
  });

  it('should navigate to login on UnauthorizedError when retrieving a dashboard', fakeAsync(() => {
    service.getDashboard.and.callFake(() => throwError(new UnauthorizedError('Unauthorized', 401)));

    let expectedAction;
    dispatcher.dispatch.and.callFake((action) => expectedAction = action);

    const paramMap = convertToParamMap({ 'dashboardId': '123' });
    const url: UrlSegment[] = [new UrlSegment('dashboard', {})];

    resolver.resolve({ url, paramMap } as ActivatedRouteSnapshot).subscribe().unsubscribe();

    tick(600);
    expect(service.getDashboard).toHaveBeenCalledWith('123');
    expect(dispatcher.dispatch).toHaveBeenCalledWith(expectedAction);
    expect(expectedAction).toBeInstanceOf(LoginAction);
  }));
});
