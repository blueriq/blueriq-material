import { Component, inject } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { ContentItem } from '@blueriq/core';

@Component({
    selector: 'bq-contentitem',
    templateUrl: './contentitem.component.html',
    standalone: false
})
@BlueriqComponent({
  type: ContentItem,
})
export class ContentItemComponent {  contentItem = inject(ContentItem);

}
