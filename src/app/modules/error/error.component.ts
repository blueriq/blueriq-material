import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ErrorModel } from './error.model';

@Component({
  selector: 'bq-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent {

  @Input()
  error: ErrorModel;

  @Output()
  dismissed = new EventEmitter<void>();

  dismiss(): void {
    this.dismissed.emit();
  }

}
