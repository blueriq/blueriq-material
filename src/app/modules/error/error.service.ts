import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * This class has a Subject to pass errors to subscribers
 *
 * NOTE: This class is temporary; errors will be returned from the BqProjectComponent/BqSessionComponent as
 *       events some time in the near future.
 */
@Injectable()
export class ErrorService {

  private readonly error: Subject<{ errorType: string, title: string, message: string }>;

  constructor() {
    this.error = new Subject<{ errorType: string, title: string, message: string }>();
  }

  /** Emits an error to subscribers */
  emitError(error: { errorType: string, title: string, message: string }) {
    this.error.next(error);
  }

  /** Returns the Subject so one can subscribe */
  getError(): Subject<{ errorType: string, title: string, message: string }> {
    return this.error;
  }
}
