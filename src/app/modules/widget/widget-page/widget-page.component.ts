import {Component, Host, OnInit} from '@angular/core';
import {Page} from "@blueriq/core";
import {BlueriqComponent} from "@blueriq/angular";

@Component({
  selector: 'bq-widget-page',
  templateUrl: './widget-page.component.html'
})
@BlueriqComponent({
  type: Page
})
export class WidgetPageComponent implements OnInit {

  constructor(@Host() public page: Page) {
  }

  ngOnInit() {
  }

}
