import { ErrorType } from '@blueriq/core';

export interface DismissInfo {
  /** The label to display for dismissing the error */
  label: string;

  /** The action to execute when the error is dismissed */
  action(): void;
}

/**
 * This class represents an error
 */
export class ErrorModel {

  dismiss?: DismissInfo;

  constructor(private errorType: ErrorType,
              public title: string,
              public message: string,
              public details?: string) {
  }

  /** The severity of the error, can used to make a distinction in the way the error is displayed */
  get severity(): string {
    return this.errorType === ErrorType.UnknownSession ? 'notice' : 'error';
  }

}
