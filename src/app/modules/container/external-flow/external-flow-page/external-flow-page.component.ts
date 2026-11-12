import { Component, inject } from '@angular/core';
import { BlueriqComponent, BlueriqCommonModule } from '@blueriq/angular';
import { Page } from '@blueriq/core';
import { BqKeyDirective } from '../../../../shared/directive/bq-key/bq-key.directive';

@Component({
    selector: 'bq-external-flow-page',
    templateUrl: './external-flow-page.component.html',
    imports: [BlueriqCommonModule, BqKeyDirective]
})
@BlueriqComponent({
  type: Page,
})
export class ExternalFlowPageComponent {  page = inject(Page);


}
