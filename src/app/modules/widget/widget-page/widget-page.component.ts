import { Component, inject } from '@angular/core';
import { BlueriqComponent, BlueriqCommonModule } from '@blueriq/angular';
import { Page } from '@blueriq/core';
import { BqKeyDirective } from '../../../shared/directive/bq-key/bq-key.directive';

@Component({
    selector: 'bq-widget-page',
    templateUrl: './widget-page.component.html',
    imports: [BlueriqCommonModule, BqKeyDirective]
})
@BlueriqComponent({
  type: Page,
})
export class WidgetPageComponent {  page = inject(Page);


}
