import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Dispatcher } from '@blueriq/angular';
import { DashboardModel, DashboardService, UnauthorizedError } from '@blueriq/dashboard';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LoginAction } from '../events/actions';
import { DASHBOARD_ID } from '../routing/route-fragments';
import { DashboardError, DashboardMessageError, DashboardUnauthorizedError } from './dashboard-error';

@Injectable()
export class DashboardResolver implements Resolve<DashboardModel | DashboardError> {
  constructor(private readonly dashboardService: DashboardService,
              private readonly dispatcher: Dispatcher) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<DashboardModel | DashboardError> {
    const dashboardId: string | null = route.paramMap.get(DASHBOARD_ID);
    if (dashboardId === null) {
      return of(new DashboardMessageError('Unable to display dashboard'));
    }
    return this.dashboardService.getDashboard(dashboardId).pipe(
      map(dashboard => dashboard),
      catchError(error => {
        if (error instanceof UnauthorizedError) {
          this.dispatcher.dispatch(new LoginAction());
          return of(new DashboardUnauthorizedError());
        } else {
          return of(this.createError(error));
        }
      }),
    );
  }

  private createError(error: Error): DashboardMessageError {
    if (error instanceof HttpErrorResponse && error.status === 404) {
      return new DashboardMessageError('Dashboard not found');
    }
    return new DashboardMessageError('An unknown error occurred');
  }
}
