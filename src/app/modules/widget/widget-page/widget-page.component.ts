import { Component, inject } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { Page } from '@blueriq/core';

@Component({
    selector: 'bq-widget-page',
    templateUrl: './widget-page.component.html',
    standalone: false
})
@BlueriqComponent({
  type: Page,
})
export class WidgetPageComponent {  page = inject(Page);


}
