import { Component } from '@angular/core';
import { BlueriqComponents } from '@blueriq/angular';
import { WidgetPageComponent } from '../modules/widget/widget-page/widget-page.component';
import { PageFinderService } from './routing/page-finder.service';
import { RouteResolveService } from './routing/route-resolve.service';

@Component({
  selector: 'bq-dashboard',
  templateUrl: './dashboard.component.html',
  providers: [
    BlueriqComponents.scoped([WidgetPageComponent]),
    RouteResolveService,
    PageFinderService,
  ],
})
export class DashboardComponent {

}
