import { Component, Host, Optional } from '@angular/core';
import { BlueriqComponent, FlowWidget } from '@blueriq/angular';
import { Page } from '@blueriq/core';

@Component({
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
@BlueriqComponent({
  type: Page
})
export class PageComponent {
  constructor(@Host() public page: Page,
              @Optional() @Host() public readonly flowWidget: FlowWidget
  ) {
  }
}
