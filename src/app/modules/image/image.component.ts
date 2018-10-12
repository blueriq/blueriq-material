import { Component, Host } from '@angular/core';
import { BlueriqComponent, ImageInfo } from '@blueriq/angular';
import { ImageUrl } from '@blueriq/angular/files';
import { Image } from '@blueriq/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'bq-image',
  templateUrl: './image.component.html',
  providers: [ImageUrl]
})
@BlueriqComponent({
  type: Image
})
export class ImageComponent {

  imageInfo: ImageInfo;
  private imageInfoSubscription: Subscription;

  constructor(@Host() public image: Image,
              private imageUrl: ImageUrl) {

    this.imageInfoSubscription = this.imageUrl.getImageInfo().subscribe((info: ImageInfo) => {
      this.imageInfo = info;
    });
  }

}
