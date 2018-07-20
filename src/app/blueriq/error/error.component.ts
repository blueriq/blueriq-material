import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { ErrorModel } from './error.model';

@Component({
  selector: 'bq-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent {

  @Input()
  error: ErrorModel;

  @Output()
  closed: EventEmitter<void> = new EventEmitter<void>();

  constructor(@Inject(DOCUMENT) private document: Document) {
  }

  close(): void {
    this.closed.emit();
  }

}
