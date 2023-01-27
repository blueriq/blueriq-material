import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DASHBOARD_ID, DASHBOARD_ROOT } from './route-fragments';

/**
 * Use this to configure how the route resolver resolves a route.
 */
export interface RouteResolveOptions {
  /**
   * The URI that should be appended to the dashboard id.
   */
  uri: string;
}

/**
 * Route resolving service to determine the next route based on the current dashboard the user is in.
 */
@Injectable()
export class RouteResolveService {
  constructor(private readonly route: ActivatedRoute) {
  }

  /**
   * Resolve a route URI for the currently selected dashboard.
   * The dashboard id is retrieved from the activated route param map.
   *
   * @param options Options object is used to configure how the final URI should be resolved.
   */
  resolveRoute(options: RouteResolveOptions): string {
    return this.resolve(options.uri);
  }

  /**
   * Resolve a route in the context of the currently selected dashboard.
   *
   * @param uri The URI that should be appended to the dashboard id.
   */
  public resolve(uri: string): string {
    const dashboardId = this.route.snapshot.paramMap.get(DASHBOARD_ID)!;
    const baseRoute = `/${DASHBOARD_ROOT}/${dashboardId}`;
    return uri.startsWith('/') ? baseRoute + uri : `${baseRoute}/${uri}`;
  }
}
