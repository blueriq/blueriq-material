import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'bq-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private titleService: Title) {
  }

  getPageTitle(): string {
    return this.titleService.getTitle();
  }
}
