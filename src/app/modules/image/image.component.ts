import { Component, inject } from '@angular/core';
import { BlueriqComponent, ImageInfo } from '@blueriq/angular';
import { ImageResource } from '@blueriq/angular/files';
import { Image } from '@blueriq/core';
import { Subscription } from 'rxjs';
import { BqKeyDirective } from '../../shared/directive/bq-key/bq-key.directive';

@Component({
    selector: 'bq-image',
    templateUrl: './image.component.html',
    providers: [ImageResource],
    imports: [BqKeyDirective]
})
@BlueriqComponent({
  type: Image,
})
export class ImageComponent {
  image = inject(Image);
  private readonly imageResource = inject(ImageResource);


  imageInfo: ImageInfo;
  private readonly imageInfoSubscription: Subscription;

  constructor() {

    this.imageInfoSubscription = this.imageResource.getImageInfo().subscribe((info: ImageInfo) => {
      this.imageInfo = info;
    });
  }

}
