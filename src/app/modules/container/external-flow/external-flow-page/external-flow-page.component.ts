import { Component, inject } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { Page } from '@blueriq/core';

@Component({
    selector: 'bq-external-flow-page',
    templateUrl: './external-flow-page.component.html',
    standalone: false
})
@BlueriqComponent({
  type: Page,
})
export class ExternalFlowPageComponent {  page = inject(Page);


}
