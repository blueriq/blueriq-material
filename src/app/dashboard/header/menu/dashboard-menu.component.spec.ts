import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { By } from '@angular/platform-browser';
import { Action, Dispatcher } from '@blueriq/angular';
import { NavigateAction } from '../../events/actions';
import { RouteResolveService, RouteResolveOptions } from '../../routing/route-resolve.service';
import { DashboardMenuComponent } from './dashboard-menu.component';

describe('Dashboard Menu', () => {

  let dispatches: Action[];
  let fixture: ComponentFixture<DashboardMenuComponent>;

  beforeEach(() => {
    dispatches = [];
    const dispatcher: Dispatcher = {
      dispatch: (action: Action) => dispatches.push(action),
    };
    TestBed.configureTestingModule({
      declarations: [DashboardMenuComponent],
      imports: [MatToolbarModule],
      providers: [
        { provide: Dispatcher, useValue: dispatcher },
        { provide: RouteResolveService, useValue: { resolveRoute: (options: RouteResolveOptions) => `/routed/${options.uri}` } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardMenuComponent);
  });

  it('should dispatch a navigation action', () => {
    fixture.componentInstance.onClick('path');

    expect(dispatches.length).toEqual(1);
    expect(dispatches[0]).toBeInstanceOf(NavigateAction);
    const action = dispatches[0] as NavigateAction;
    expect(action.url).toEqual('/routed/path');
  });

  it('should display the menu', () => {
    fixture.componentInstance.menuItems = [{ path: 'main', displayText: 'Main' }, {
      path: 'side',
      displayText: 'Side',
    }];
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('button')).length).toBe(3);
    expect(fixture.debugElement.nativeElement.innerHTML).toContain('Main');
    expect(fixture.debugElement.nativeElement.innerHTML).toContain('Side');
    expect(fixture.debugElement.nativeElement.innerHTML).toContain('Refresh');
  });
});
