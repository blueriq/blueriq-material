export class ErrorModel {
  private fatal: boolean;

  constructor(private errorType: string,
              public title: string,
              public message: string,
              public details?: string) {
    this.fatal = true;
  }

  get severity(): string {
    return this.errorType === 'SESSION_EXPIRED' ? 'notice' : 'error';
  }

  get isFatal(): boolean {
    return this.fatal;
  }

  set isFatal(value: boolean) {
    this.fatal = value;
  }

}
