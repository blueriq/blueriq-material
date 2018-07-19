import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ErrorService {

  private readonly error: Subject<{ errorType: string, title: string, message: string }>;

  constructor() {
    this.error = new Subject<{ errorType: string, title: string, message: string }>();
  }

  emitError(error: { errorType: string, title: string, message: string }) {
    this.error.next(error);
  }

  getError(): Subject<{ errorType: string, title: string, message: string }> {
    return this.error;
  }
}
