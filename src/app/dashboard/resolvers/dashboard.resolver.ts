import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Dispatcher } from '@blueriq/angular';
import { DashboardModel, DashboardService, UnauthorizedError } from '@blueriq/dashboard';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LoginAction } from '../events/actions';
import { DASHBOARD_ID } from '../routing/route-fragments';

@Injectable()
export class DashboardResolver implements Resolve<DashboardModel | unknown> {
  constructor(private readonly dashboardService: DashboardService,
              private readonly dispatcher: Dispatcher) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<DashboardModel | unknown> {
    const dashboardId: string | null = route.paramMap.get(DASHBOARD_ID);
    if (dashboardId === null) {
      return of(undefined);
    }
    return this.dashboardService.getDashboard(dashboardId).pipe(
      map(dashboard => dashboard),
      catchError(error => {
        if (error instanceof UnauthorizedError) {
          this.dispatcher.dispatch(new LoginAction());
          return of(undefined);
        } else {
          throw error;
        }
      }),
    );
  }
}
