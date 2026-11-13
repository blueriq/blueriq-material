import { Component, Input, inject } from '@angular/core';
import { Dispatcher } from '@blueriq/angular';
import { DashboardMenuItem, NavigatePageAction } from '@blueriq/dashboard';
import { RefreshAction } from '../../events/actions';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
    selector: 'bq-dashboard-menu',
    templateUrl: './dashboard-menu.component.html',
    styleUrls: [
        './dashboard-menu.component.scss',
        '../../../modules/menu/menu.component.scss',
        '../../../modules/menu/menu-item/menu-item.component.scss',
    ],
    imports: [MatToolbar, MatButton, MatTooltip]
})
export class DashboardMenuComponent {
  private readonly dispatcher = inject(Dispatcher);


  // TODO: Skipped for migration because:
  //  Your application code writes to the input. This prevents migration.
  @Input()
  menuItems: DashboardMenuItem[];

  navigate(page: string): void {
    this.dispatcher.dispatch(new NavigatePageAction(page));
  }

  refresh(): void {
    this.dispatcher.dispatch(new RefreshAction());
  }
}
