import { Component, inject } from '@angular/core';
import { BlueriqComponent, BlueriqCommonModule } from '@blueriq/angular';
import { ContentItem } from '@blueriq/core';

@Component({
    selector: 'bq-contentitem',
    templateUrl: './contentitem.component.html',
    imports: [BlueriqCommonModule]
})
@BlueriqComponent({
  type: ContentItem,
})
export class ContentItemComponent {  contentItem = inject(ContentItem);

}
