import { Component, Host } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { ContentItem } from '@blueriq/core';

@Component({
  templateUrl: './contentitem.component.html',
})

@BlueriqComponent({
  type: ContentItem,
})

export class ContentItemComponent {

  constructor(@Host() public contentItem: ContentItem) {
  }
}
