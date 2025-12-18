import { Component, Input } from '@angular/core';
import { Dispatcher } from '@blueriq/angular';
import { DashboardMenuItem, NavigatePageAction } from '@blueriq/dashboard';
import { RefreshAction } from '../../events/actions';

@Component({
    selector: 'bq-dashboard-menu',
    templateUrl: './dashboard-menu.component.html',
    styleUrls: [
        './dashboard-menu.component.scss',
        '../../../modules/menu/menu.component.scss',
        '../../../modules/menu/menu-item/menu-item.component.scss',
    ],
    standalone: false
})
export class DashboardMenuComponent {

  @Input()
  menuItems: DashboardMenuItem[];

  constructor(private readonly dispatcher: Dispatcher) {
  }

  navigate(page: string): void {
    this.dispatcher.dispatch(new NavigatePageAction(page));
  }

  refresh(): void {
    this.dispatcher.dispatch(new RefreshAction());
  }
}
