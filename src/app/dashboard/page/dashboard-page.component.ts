import { AfterViewChecked, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dispatcher, PortalChangeAction, SessionEventActions } from '@blueriq/angular';
import { DashboardModel, PageModel } from '@blueriq/dashboard';
import { Actions, ofType } from '@ngrx/effects';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { NotificationModel, NotificationType } from '../../notification-overlay/notification.model';
import { DashboardActions, NavigateAction, RefreshAction } from '../events/actions';
import { DashboardError } from '../resolvers/dashboard-error';
import { PageFinderService } from '../routing/page-finder.service';
import { RouteResolveService } from '../routing/route-resolve.service';

@Component({
  selector: 'bq-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit, OnDestroy, AfterViewChecked {
  readonly dashboard$: Observable<DashboardModel | DashboardError>;
  readonly page$: Observable<PageModel | undefined>;
  refreshWidget = false;
  notification: NotificationModel | undefined;

  private readonly subscription = new Subscription();

  constructor(private readonly activatedRoute: ActivatedRoute,
              private readonly actions$: Actions,
              private readonly dispatcher: Dispatcher,
              private readonly routeResolveService: RouteResolveService,
              private readonly pageFinderService: PageFinderService) {
    this.page$ = this.activatedRoute.data.pipe(map(data => data.page));
    this.dashboard$ = this.activatedRoute.data.pipe(map(data => data.dashboard));
  }

  ngOnInit(): void {
    this.subscription.add(this.actions$.pipe(ofType<PortalChangeAction>(SessionEventActions.PORTAL_CHANGE))
    .subscribe(action => {
      const page = this.pageFinderService.tryFindPageWithEvent(action.changeType, action.changeContext);
      if (!page) {
        throw new Error(`no page found for type '${ action.changeType }' and context '${ action.changeContext }'`);
      }
      const url = this.routeResolveService.resolve(`/${ page.id }`);
      this.dispatcher.dispatch(new NavigateAction(url, action.parameters));
    }));

    this.subscription.add(this.actions$.pipe(ofType<RefreshAction>(DashboardActions.REFRESH))
    .subscribe(() => this.refreshWidget = true));

    this.subscription.add(this.dashboard$.subscribe((data) => {
      if (data instanceof DashboardError) {
        this.notification = new NotificationModel(NotificationType.Error, 'Oops!', data.message);
        console.error(data);
      }
    }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewChecked(): void {
    if (this.refreshWidget) {
      Promise.resolve().then(() => this.refreshWidget = false);
    }
  }
}
