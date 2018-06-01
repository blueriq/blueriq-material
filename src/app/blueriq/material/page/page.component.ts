import { Component, Host } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { Page } from '@blueriq/core';
import {Title} from '@angular/platform-browser';

@Component({
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
@BlueriqComponent({
  type: Page
})
export class PageComponent {

  constructor(@Host() public page: Page,private titleService: Title) {
    this.titleService.setTitle(page.name);
  }

}
