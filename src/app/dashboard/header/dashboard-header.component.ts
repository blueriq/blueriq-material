import { Component, Input } from '@angular/core';
import { Dispatcher } from '@blueriq/angular';
import { DashboardAuthService, MenuItemModel, UserInfo } from '@blueriq/dashboard';
import { Observable } from 'rxjs';
import { LogoutAction } from '../events/actions';

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
  menuItems: MenuItemModel[];

  constructor(private readonly authService: DashboardAuthService,
              private readonly dispatcher: Dispatcher) {
    this.userInfo$ = this.authService.userInfo();
  }

  logout(): void {
    this.dispatcher.dispatch(new LogoutAction());
  }
}
