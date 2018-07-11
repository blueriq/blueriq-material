import { Component, Input } from '@angular/core';

@Component({
  selector: 'bq-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent {

  @Input()
  error: { errorType: string, title: string, message: string };

  constructor() {
  }

}
