import { Component, Host } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { Page } from '@blueriq/core';

@Component({
  selector: 'bq-external-flow-page',
  templateUrl: './external-flow-page.component.html',
})
@BlueriqComponent({
  type: Page,
})
export class ExternalFlowPageComponent {

  constructor(@Host() public page: Page) {
  }

}
