import { Component, Input, inject } from '@angular/core';
import { DashboardAuthService, DashboardMenuItem, UserInfo } from '@blueriq/dashboard';
import { Observable } from 'rxjs';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButton } from '@angular/material/button';
import { MatMenuTrigger, MatMenu, MatMenuItem } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';
import { DashboardMenuComponent } from './menu/dashboard-menu.component';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'bq-dashboard-header',
    templateUrl: './dashboard-header.component.html',
    styleUrls: [
        './dashboard-header.component.scss',
        '../../modules/header/header.component.scss',
    ],
    imports: [MatToolbar, MatButton, MatMenuTrigger, MatIcon, MatMenu, MatMenuItem, DashboardMenuComponent, AsyncPipe]
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
