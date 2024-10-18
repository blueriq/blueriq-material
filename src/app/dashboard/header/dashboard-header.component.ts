import { Component, Input } from '@angular/core';
import { DashboardAuthService, DashboardMenuItem, UserInfo } from '@blueriq/dashboard';
import { Observable } from 'rxjs';

@Component({
  selector: 'bq-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: [
    './dashboard-header.component.scss',
    '../../modules/header/header.component.scss',
  ],
})
export class DashboardHeaderComponent {

  userInfo$: Observable<UserInfo>;

  @Input()
  menuItems: DashboardMenuItem[];

  constructor(private readonly authService: DashboardAuthService) {
    this.userInfo$ = this.authService.userInfo();
  }

  logout(): void {
    this.authService.logout();
  }
}
