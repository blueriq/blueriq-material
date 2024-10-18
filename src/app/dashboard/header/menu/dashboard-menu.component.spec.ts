import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { By } from '@angular/platform-browser';
import { Action, Dispatcher } from '@blueriq/angular';
import { RefreshAction } from '../../events/actions';
import { DashboardMenuComponent } from './dashboard-menu.component';
import { NavigatePageAction } from '@blueriq/dashboard';

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
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardMenuComponent);
  });

  it('should dispatch a navigation action', () => {
    fixture.componentInstance.navigate('path');

    expect(dispatches.length).toEqual(1);
    expect(dispatches[0]).toBeInstanceOf(NavigatePageAction);
    const action = dispatches[0] as NavigatePageAction;
    expect(action.page).toEqual('path');
  });

  it('should display the menu', () => {
    fixture.componentInstance.menuItems = [{ pageId: 'main', displayText: 'Main' }, {
      pageId: 'side',
      displayText: 'Side',
    }];
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('button')).length).toBe(3);
    expect(fixture.debugElement.nativeElement.innerHTML).toContain('Main');
    expect(fixture.debugElement.nativeElement.innerHTML).toContain('Side');
    expect(fixture.debugElement.nativeElement.innerHTML).toContain('Refresh');
  });

  it('should dispatch a refresh action', () => {
    fixture.componentInstance.refresh();

    expect(dispatches.length).toEqual(1);
    expect(dispatches[0]).toBeInstanceOf(RefreshAction);
  });
});
