import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'bq-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent {

  @Input()
  error: { errorType: string, title: string, message: string, details?: string };

  @Input()
  closable = false;

  @Output()
  closed: EventEmitter<void> = new EventEmitter<void>();

  constructor() {
  }

  close(): void {
    this.closed.emit();
  }

}
