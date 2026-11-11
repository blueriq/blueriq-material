import type { Mocked } from 'vitest';
import { AsyncPipe } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, ActivatedRouteSnapshot, convertToParamMap, Params, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Dispatcher } from '@blueriq/angular';
import { TestDispatcher } from '@blueriq/angular/testing';
import { DashboardAuthService } from '@blueriq/dashboard';
import { ToastrService } from 'ngx-toastr';
import { of, Subject } from 'rxjs';
import { NotificationType } from '../notification-overlay/notification.model';
import { ActivateCaseAction, DeactivateCaseAction } from '../shared/dcm/case-aware.service';
import { DashboardComponent } from './dashboard.component';

describe('Dashboard Component', () => {

  let component: ComponentFixture<DashboardComponent>;
  let authService: DashboardAuthService;
  let router: Router;
  let route: Mocked<ActivatedRoute>;
  let toastrService: ToastrService;
  let testDispatcher: TestDispatcher;
  let queryParams: Subject<Params>;

  beforeEach(async() => {
    testDispatcher = new TestDispatcher();
    queryParams = new Subject<Params>();
    authService = { login: vi.fn() } as unknown as Mocked<DashboardAuthService>;
    router = { navigate: vi.fn() } as unknown as Mocked<Router>;
    const routeParams: Params = { page: 'default' };
    route = { 'paramMap': of(convertToParamMap({})), 'queryParams': queryParams, 'snapshot': {
        queryParams: {},
        params: routeParams,
      } as ActivatedRouteSnapshot } as unknown as Mocked<ActivatedRoute>;
    toastrService = { success: vi.fn(), info: vi.fn(), warning: vi.fn() } as unknown as Mocked<ToastrService>;
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, DashboardComponent],
      providers: [
        { provide: DashboardAuthService, useValue: authService },
        { provide: Router, useValue: router },
        { provide: ActivatedRoute, useValue: route },
        { provide: ToastrService, useValue: toastrService },
        { provide: Dispatcher, useValue: testDispatcher },
      ],
    }).overrideComponent(DashboardComponent, { set: { imports: [AsyncPipe], schemas: [NO_ERRORS_SCHEMA] } }).compileComponents();

    component = TestBed.createComponent(DashboardComponent);
  });

  it('should create dashboard component', () => {
    component.detectChanges();
    expect(component.debugElement).not.toBeNull();
  });

  it('should login when unauthorized', () => {
    component.componentInstance.onUnauthorized();

    expect(authService.login).toHaveBeenCalled();
  });

  it('should notify an error on error', () => {
    component.componentInstance.onError('error');

    expect(component.componentInstance.notification?.type).toEqual(NotificationType.Error);
    expect(component.componentInstance.notification?.title).toEqual('Unexpected error');
    expect(component.componentInstance.notification?.message).toEqual('error');
  });

  it('should notify an error on onNotFound', () => {
    component.componentInstance.onNotFound();

    expect(component.componentInstance.notification?.type).toEqual(NotificationType.Error);
    expect(component.componentInstance.notification?.title).toEqual('Not found️');
    expect(component.componentInstance.notification?.message).toEqual('Unable to open page');
  });

  it('should update the url when the page is changed', () => {
    component.componentInstance.onPageChanged({ page: 'page', parameters: null });

    expect(router.navigate).toHaveBeenCalledWith([`../page`], {
      relativeTo: route,
      queryParams: {},
    });
  });

  it('should update the url when the page is changed in case of a shortcut without a page', () => {
    const activatedRoute = TestBed.inject(ActivatedRoute);

    activatedRoute.snapshot.params = { 'shortcut': 'shortcut' };

    component.componentInstance.onPageChanged({ page: 'page', parameters: null });

    expect(router.navigate).toHaveBeenCalledWith([`page`], {
      relativeTo: route,
      queryParams: {},
    });
  });

  it('should update the url when the page is changed with parameters', () => {
    component.componentInstance.onPageChanged({ page: 'page', parameters: { param: '1' } });

    expect(router.navigate).toHaveBeenCalledWith([`../page`], {
      relativeTo: route,
      queryParams: { param: '1' },
    });
  });

  it('should update the url when the page is changed keeping the existing devtools parameter', () => {
    const activatedRoute = TestBed.inject(ActivatedRoute);

    activatedRoute.snapshot.queryParams['devtools'] = '';

    component.componentInstance.onPageChanged({ page: 'page', parameters: { param: '1' } });

    expect(router.navigate).toHaveBeenCalledWith([`../page`], {
      relativeTo: route,
      queryParams: { param: '1', devtools: '' },
    });
  });

  it('should update the url when the page is changed removing existing parameters', () => {
    const activatedRoute = TestBed.inject(ActivatedRoute);

    activatedRoute.snapshot.queryParams['param_2'] = 'test';

    component.componentInstance.onPageChanged({ page: 'page', parameters: { param: '1' } });

    expect(router.navigate).toHaveBeenCalledWith([`../page`], {
      relativeTo: route,
      queryParams: { param: '1' },
    });
  });

  describe('case topic subscription', () => {
    const dispatched = () => testDispatcher.dispatched
      .map(action => `${ action.type }:${ (action as ActivateCaseAction | DeactivateCaseAction).caseId }`);

    it('activates the case in the url', () => {
      queryParams.next({ caseId: 'A' });

      expect(dispatched()).toEqual(['activateCase:A']);
    });

    it('does not re-activate the case when other query parameters change', () => {
      queryParams.next({ caseId: 'A' });
      queryParams.next({ caseId: 'A', devtools: '' });

      expect(dispatched()).toEqual(['activateCase:A']);
    });

    it('deactivates the previous case when another case is opened', () => {
      queryParams.next({ caseId: 'A' });
      queryParams.next({ caseId: 'B' });

      expect(dispatched()).toEqual(['activateCase:A', 'deactivateCase:A', 'activateCase:B']);
    });

    it('deactivates the case when navigating to a page without a case', () => {
      queryParams.next({ caseId: 'A' });
      queryParams.next({});

      expect(dispatched()).toEqual(['activateCase:A', 'deactivateCase:A']);
    });

    it('deactivates the case when the dashboard is destroyed', () => {
      queryParams.next({ caseId: 'A' });
      component.destroy();

      expect(dispatched()).toEqual(['activateCase:A', 'deactivateCase:A']);
    });

    it('dispatches nothing without a case', () => {
      queryParams.next({});
      component.destroy();

      expect(testDispatcher.dispatched).toEqual([]);
    });
  });
});

