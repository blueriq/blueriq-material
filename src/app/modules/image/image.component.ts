import { Component, Host } from '@angular/core';
import { BlueriqComponent, ImageInfo } from '@blueriq/angular';
import { ImageResource } from '@blueriq/angular/files';
import { Image } from '@blueriq/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'bq-image',
  templateUrl: './image.component.html',
  providers: [ImageResource],
})
@BlueriqComponent({
  type: Image,
})
export class ImageComponent {

  imageInfo: ImageInfo;
  private imageInfoSubscription: Subscription;

  constructor(@Host() public image: Image,
              private imageResource: ImageResource) {

    this.imageInfoSubscription = this.imageResource.getImageInfo().subscribe((info: ImageInfo) => {
      this.imageInfo = info;
    });
  }

}
