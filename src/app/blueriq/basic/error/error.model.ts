/**
 * This class represents an error
 */
export class ErrorModel {
  private fatal: boolean;

  constructor(private errorType: string,
              public title: string,
              public message: string,
              public details?: string) {
    this.fatal = true;
  }

  /** The severity of the error, can used to make a distinction in the way the error is displayed */
  get severity(): string {
    return this.errorType === 'SESSION_EXPIRED' ? 'notice' : 'error';
  }

  /**
   * Whether the error blocks the user to use the session
   *
   * NOTE: Currently unused; should be used when the errors are returned as events from BqSessionComponent
   *       or BqProjectComponent
   */
  get isFatal(): boolean {
    return this.fatal;
  }

  set isFatal(value: boolean) {
    this.fatal = value;
  }

}
