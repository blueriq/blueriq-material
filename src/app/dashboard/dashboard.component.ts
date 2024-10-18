import { Component } from '@angular/core';
import { BlueriqComponents } from '@blueriq/angular';
import { DashboardAuthService, DashboardPageChange, QueryParameters } from '@blueriq/dashboard';
import { WidgetPageComponent } from '../modules/widget/widget-page/widget-page.component';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NotificationModel, NotificationType } from '../notification-overlay/notification.model';

@Component({
  templateUrl: './dashboard.component.html',
  providers: [
    BlueriqComponents.scoped([WidgetPageComponent]),
  ],
})
export class DashboardComponent {

  shortcut: Observable<string | null>;
  project: Observable<string | null>;
  dashboard: Observable<string | null>;
  page: Observable<string | null>;
  parameters: Observable<QueryParameters | null>;
  notification: NotificationModel | undefined;

  constructor(private readonly route: ActivatedRoute,
              private readonly router: Router,
              private readonly authService: DashboardAuthService) {
    this.shortcut = this.route.paramMap.pipe(map(param => param.get('shortcut')));
    this.project = this.route.paramMap.pipe(map(param => param.get('project')));
    this.dashboard = this.route.paramMap.pipe(map(param => param.get('dashboard')));
    this.page = this.route.paramMap.pipe(map(param => param.get('page')));
    this.parameters = this.route.queryParams;

  }

  onPageChanged(pageChange: DashboardPageChange): void {
    this.router.navigate([`../${pageChange.page}`], {
      relativeTo: this.route,
      queryParams: this.determineQueryParameters(this.route, pageChange.parameters),
    });
  }

  onUnauthorized(): void {
    this.authService.login();
  }

  onNotFound(): void {
    this.notification = new NotificationModel(NotificationType.Error, 'Not found️', 'Unable to open page');
  }

  onError(error: string) {
    this.notification = new NotificationModel(NotificationType.Error, 'Unexpected error', error);
  }

  determineQueryParameters(route: ActivatedRoute, currentParams?: Params | null): Params {
    const params = currentParams ?? {};
    if (route.snapshot.queryParams['devtools'] !== undefined) {
      return {
        ...params,
        'devtools': '',
      };
    }
    return params;
  }

}
