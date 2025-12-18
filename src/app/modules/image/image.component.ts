import { Component } from '@angular/core';
import { BlueriqComponent, ImageInfo } from '@blueriq/angular';
import { ImageResource } from '@blueriq/angular/files';
import { Image } from '@blueriq/core';
import { Subscription } from 'rxjs';

@Component({
    selector: 'bq-image',
    templateUrl: './image.component.html',
    providers: [ImageResource],
    standalone: false
})
@BlueriqComponent({
  type: Image,
})
export class ImageComponent {

  imageInfo: ImageInfo;
  private readonly imageInfoSubscription: Subscription;

  constructor(public image: Image,
              private readonly imageResource: ImageResource) {

    this.imageInfoSubscription = this.imageResource.getImageInfo().subscribe((info: ImageInfo) => {
      this.imageInfo = info;
    });
  }

}
