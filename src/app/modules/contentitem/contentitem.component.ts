import { Component } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { ContentItem } from '@blueriq/core';

@Component({
  selector: 'bq-contentitem',
  templateUrl: './contentitem.component.html',
})
@BlueriqComponent({
  type: ContentItem,
})
export class ContentItemComponent {

  constructor(public contentItem: ContentItem) {
  }
}
