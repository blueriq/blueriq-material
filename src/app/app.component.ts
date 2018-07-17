import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ErrorService } from './blueriq/error/error.service';

@Component({
  selector: 'bq-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  error: { errorType: string, title: string, message: string, details?: string } | null;

  constructor(private errorService: ErrorService,
              private titleService: Title) {
  }

  ngOnInit(): void {
    this.errorService.getError().subscribe((error) => {
      switch(error.errorType) {
        case 'NOT_FOUND':
          this.error = error;
          break;
        default:
          console.log(error);
          break;
      }
    });
  }

  getPageTitle(): string {
    return this.titleService.getTitle();
  }

  clearError(): void {
    this.error = null;
  }
}
