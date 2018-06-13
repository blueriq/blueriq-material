import { Component, Host } from '@angular/core';
import { BlueriqComponent, BlueriqSession } from '@blueriq/angular';
import { Link } from '@blueriq/core';
import { Actions } from '@ngrx/effects';
import { PresentationStyles } from '../presentationstyles/presentationstyles';
import { DownloadService } from './download.service';

@Component({
  templateUrl: './download.component.html'
})
@BlueriqComponent({
  type: Link
  // selector: '#document'
  // name: document
  // type: 'link'
})
export class DownloadComponent {

  constructor(
    @Host() public link: Link,
    public downloadService: DownloadService,
    private actions$: Actions,
    private readonly blueriqSession: BlueriqSession) {
    console.log(link);
  }

  hasButtonPresentationStyle() {
    return this.link.styles.has(PresentationStyles.BUTTON_LINK);
  }

  getDownloadUrl(): string {
    return this.downloadService.getDownloadUrl(this.link, this.blueriqSession);
  }

}
