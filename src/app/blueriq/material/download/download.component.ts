import { Component, Host } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { UnknownElement } from '@blueriq/core';
import { Actions } from '@ngrx/effects';
import { DownloadService } from './download.service';

@Component({
  templateUrl: './download.component.html'
})
@BlueriqComponent({
  type: UnknownElement, // TODO use: Link
  selector: '#document'
  // name: document
  // type: 'link'
})
export class DownloadComponent {

  constructor(@Host() public unknownElement: UnknownElement, public downloadService: DownloadService, private actions$: Actions) {
    console.log(unknownElement);
  }

  hasButtonPresentationStyle() {
    // TODO use as constant presentationstyle.ts
    return this.unknownElement.styles.has('button_link');
  }

  getDownloadURL(): string {
    return this.downloadService.getDownloadURL();
  }

  getStyles() {
    return this.unknownElement.styles.toString();
  }

}
