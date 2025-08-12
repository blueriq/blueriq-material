import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, ActivatedRouteSnapshot, convertToParamMap, Params, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Dispatcher } from '@blueriq/angular';
import { TestDispatcher } from '@blueriq/angular/testing';
import { DashboardAuthService } from '@blueriq/dashboard';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { NotificationType } from '../notification-overlay/notification.model';
import { DashboardComponent } from './dashboard.component';

describe('Dashboard Component', () => {

  let component: ComponentFixture<DashboardComponent>;
  let authService: DashboardAuthService;
  let router: Router;
  let route: jasmine.SpyObj<ActivatedRoute>;
  let toastrService: ToastrService;
  let testDispatcher: TestDispatcher;

  beforeEach(async() => {
    testDispatcher = new TestDispatcher();
    authService = jasmine.createSpyObj<DashboardAuthService>('DashboardAuthService', ['login']);
    router = jasmine.createSpyObj<Router>('Router', ['navigate']);
    const routeParams: Params = { page: 'default' };
    route = jasmine.createSpyObj<ActivatedRoute>('ActivateRoute', [], {
      'paramMap': of(convertToParamMap({})),
      'queryParams': of(convertToParamMap({})),
      'snapshot': {
        queryParams: {},
        params: routeParams,
      } as ActivatedRouteSnapshot,
    });
    toastrService = jasmine.createSpyObj<ToastrService>('ToastrService', ['success', 'info', 'warning']);
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [DashboardComponent],
      providers: [
        { provide: DashboardAuthService, useValue: authService },
        { provide: Router, useValue: router },
        { provide: ActivatedRoute, useValue: route },
        { provide: ToastrService, useValue: toastrService },
        { provide: Dispatcher, useValue: testDispatcher },
      ],
    }).compileComponents();

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
});

