import type { Mocked } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Dispatcher } from '@blueriq/angular';
import { TestDispatcher } from '@blueriq/angular/testing';
import { DashboardAuthService } from '@blueriq/dashboard';
import { of } from 'rxjs';
import { DashboardHeaderComponent } from './dashboard-header.component';

describe('Dashboard Header', () => {

  let authService: Mocked<DashboardAuthService>;
  let fixture: ComponentFixture<DashboardHeaderComponent>;

  beforeEach(async() => {
    authService = { userInfo: vi.fn(), logout: vi.fn() } as unknown as Mocked<DashboardAuthService>;
    authService.userInfo.mockReturnValue(of({ name: 'Jane Doe' }));
    await TestBed.configureTestingModule({
      imports: [DashboardHeaderComponent],
      providers: [
        { provide: DashboardAuthService, useValue: authService },
        { provide: Dispatcher, useClass: TestDispatcher },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardHeaderComponent);
    fixture.componentRef.setInput('menuItems', []);
  });

  it('should display the name of the logged in user', () => {
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.username').textContent).toEqual('Jane Doe');
  });

  it('should logout via the auth service', () => {
    fixture.componentInstance.logout();

    expect(authService.logout).toHaveBeenCalled();
  });
});
