import { Component, Host } from '@angular/core';
import { BlueriqComponent, BlueriqSession } from '@blueriq/angular';
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
              public blueriqSession: BlueriqSession
  ) {
  }
}
