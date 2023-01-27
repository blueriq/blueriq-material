import { AfterViewChecked, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dispatcher, PortalChangeAction, SessionEventActions } from '@blueriq/angular';
import { PageModel } from '@blueriq/dashboard';
import { Actions, ofType } from '@ngrx/effects';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { DashboardActions, NavigateAction, RefreshAction } from '../events/actions';
import { PageFinderService } from '../routing/page-finder.service';
import { RouteResolveService } from '../routing/route-resolve.service';

@Component({
  selector: 'bq-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit, OnDestroy, AfterViewChecked {

  readonly page$: Observable<PageModel | undefined>;
  refreshWidget = false;

  private readonly subscription = new Subscription();

  constructor(private readonly activatedRoute: ActivatedRoute,
              private readonly actions$: Actions,
              private readonly dispatcher: Dispatcher,
              private readonly routeResolveService: RouteResolveService,
              private readonly pageFinderService: PageFinderService) {
    this.page$ = this.activatedRoute.data.pipe(map(data => data.page));
  }

  ngOnInit(): void {
    this.subscription.add(this.actions$.pipe(ofType<PortalChangeAction>(SessionEventActions.PORTAL_CHANGE))
      .subscribe(action => {
        const page = this.pageFinderService.tryFindPageWithEvent(action.changeType, action.changeContext);
        if (!page) {
          throw new Error(`no page found for type '${action.changeType}' and context '${action.changeContext}'`);
        }
        const url = this.routeResolveService.resolve(`/${page.id}`);
        this.dispatcher.dispatch(new NavigateAction(url, action.parameters));
      }));

    this.subscription.add(this.actions$.pipe(ofType<RefreshAction>(DashboardActions.REFRESH))
      .subscribe(() => this.refreshWidget = true));
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
