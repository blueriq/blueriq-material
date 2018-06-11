import { Component, Host } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { UnknownElement } from '@blueriq/core';

@Component({
  templateUrl: './download.component.html' //,
  // providers: [Container]
})
@BlueriqComponent({
  type: UnknownElement,
  selector: '#document'
  // name: document
  // type: 'link'
})
export class DownloadComponent {

  constructor(@Host() public unknownElement: UnknownElement) {
    console.log(unknownElement);
  }

  hasButtonPresentationStyle() {
    return this.unknownElement.styles.has('button');
  }
}
