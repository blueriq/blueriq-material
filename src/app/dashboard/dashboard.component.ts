import { Component, inject, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BlueriqComponents, Dispatcher } from '@blueriq/angular';
import { DashboardAuthService, DashboardPageChange, QueryParameters } from '@blueriq/dashboard';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { WidgetPageComponent } from '../modules/widget/widget-page/widget-page.component';
import { NotificationModel, NotificationType } from '../notification-overlay/notification.model';
import { ActivateCaseAction, DeactivateCaseAction } from '../shared/dcm/case-aware.service';
import { ActivateTaskAction } from '../shared/dcm/task-aware.service';

@Component({
    templateUrl: './dashboard.component.html',
    providers: [
        BlueriqComponents.scoped([WidgetPageComponent]),
    ],
    standalone: false
})
export class DashboardComponent implements OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly authService = inject(DashboardAuthService);
  private readonly dispatcher = inject(Dispatcher);


  shortcut: Observable<string | null>;
  project: Observable<string | null>;
  version: Observable<string | null>;
  dashboard: Observable<string | null>;
  page: Observable<string | null>;
  parameters: Observable<QueryParameters | null>;
  notification: NotificationModel | undefined;
  private activeCaseId: string | undefined;

  constructor() {
    this.shortcut = this.route.paramMap.pipe(map(param => param.get('shortcut')));
    this.project = this.route.paramMap.pipe(map(param => param.get('project')));
    this.version = this.route.paramMap.pipe(map(param => param.get('version')));
    this.dashboard = this.route.paramMap.pipe(map(param => param.get('dashboard')));
    this.page = this.route.paramMap.pipe(map(param => param.get('page')));
    this.parameters = this.route.queryParams;

    this.parameters.subscribe((query) => {
      this.activateCase(query?.['caseId'] ?? undefined);
      if (query != null && query['taskId'] != null) {
        this.dispatcher.dispatch(new ActivateTaskAction(query['taskId']));
      }
    });
  }

  ngOnDestroy(): void {
    this.activateCase(undefined);
  }

  onPageChanged(pageChange: DashboardPageChange): void {
    this.router.navigate([this.determineRoutePage(pageChange.page)], {
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

  private activateCase(caseId: string | undefined): void {
    if (caseId === this.activeCaseId) {
      return;
    }
    if (this.activeCaseId != null) {
      this.dispatcher.dispatch(new DeactivateCaseAction(this.activeCaseId));
    }
    if (caseId != null) {
      this.dispatcher.dispatch(new ActivateCaseAction(caseId));
    }
    this.activeCaseId = caseId;
  }

  private determineRoutePage(page: string): string {
    return this.route.snapshot.params['page'] ? `../${ page }` : `${ page }`;
  }

  private determineQueryParameters(route: ActivatedRoute, currentParams?: Params | null): Params {
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
