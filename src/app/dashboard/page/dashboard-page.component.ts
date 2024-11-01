import { AfterViewChecked, Component, OnDestroy, OnInit } from '@angular/core';
import { BlueriqDashboard, DashboardPage } from '@blueriq/dashboard';
import { Subscription } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';
import { DashboardActions, RefreshAction } from '../events/actions';

@Component({
  selector: 'bq-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit, OnDestroy, AfterViewChecked {

  private readonly subscription = new Subscription();
  page: DashboardPage | null;
  refreshWidget = false;

  constructor(private readonly actions$: Actions,
              private readonly dashboard: BlueriqDashboard) {
  }

  ngOnInit(): void {
    this.subscription.add(this.dashboard.page.subscribe(page => this.page = page));
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
