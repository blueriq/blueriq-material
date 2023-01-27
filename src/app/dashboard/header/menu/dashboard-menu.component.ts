import { Component, Input } from '@angular/core';
import { Dispatcher } from '@blueriq/angular';
import { MenuItemModel } from '@blueriq/dashboard';
import { NavigateAction, RefreshAction } from '../../events/actions';
import { RouteResolveService } from '../../routing/route-resolve.service';

@Component({
  selector: 'bq-dashboard-menu',
  templateUrl: './dashboard-menu.component.html',
  styleUrls: [
    './dashboard-menu.component.scss',
    '../../../modules/menu/menu.component.scss',
    '../../../modules/menu/menu-item/menu-item.component.scss',
  ],
})
export class DashboardMenuComponent {

  @Input()
  menuItems: MenuItemModel[];

  constructor(private readonly dispatcher: Dispatcher,
              private readonly routeResolveService: RouteResolveService) {
  }

  onClick(path: string) {
    this.dispatcher.dispatch(new NavigateAction(this.routeResolveService.resolveRoute({ uri: path })));
  }

  refresh() {
    this.dispatcher.dispatch(new RefreshAction());
  }
}
