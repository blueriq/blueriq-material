import { Component } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { Page } from '@blueriq/core';

@Component({
  selector: 'bq-widget-page',
  templateUrl: './widget-page.component.html',
})
@BlueriqComponent({
  type: Page,
})
export class WidgetPageComponent {

  constructor(public page: Page) {
  }

}
