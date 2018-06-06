import { Component, Host } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BlueriqComponent } from '@blueriq/angular';
import { Page } from '@blueriq/core';

@Component({
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
@BlueriqComponent({
  type: Page
})
export class PageComponent {

  constructor(@Host() public page: Page, private titleService: Title) {
    this.titleService.setTitle(page.name);
  }

}
