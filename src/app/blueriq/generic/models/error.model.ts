export class ErrorModel {
  constructor(private errorType: string,
              public title: string,
              public message: string,
              public details?: string) {
  }

  get severity(): string {
    return this.errorType === 'SESSION_EXPIRED' ? 'notice' : 'error';
  }

  get closable(): boolean {
    return false;
  }

  get reloadable(): boolean {
    return this.errorType === 'SESSION_EXPIRED';
  }

}
