import { Component, Input } from '@angular/core';
import { ErrorModel } from './error.model';

@Component({
  selector: 'bq-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent {

  @Input()
  error: ErrorModel;

}
