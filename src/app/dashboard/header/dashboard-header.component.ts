import { Component, Input, inject } from '@angular/core';
import { DashboardAuthService, DashboardMenuItem, UserInfo } from '@blueriq/dashboard';
import { Observable } from 'rxjs';

@Component({
    selector: 'bq-dashboard-header',
    templateUrl: './dashboard-header.component.html',
    styleUrls: [
        './dashboard-header.component.scss',
        '../../modules/header/header.component.scss',
    ],
    standalone: false
})
export class DashboardHeaderComponent {
  private readonly authService = inject(DashboardAuthService);


  userInfo$: Observable<UserInfo>;

  @Input()
  menuItems: DashboardMenuItem[];

  constructor() {
    this.userInfo$ = this.authService.userInfo();
  }

  logout(): void {
    this.authService.logout();
  }
}
