import { Component, Host, Self } from '@angular/core';
import { BlueriqComponent, ExternalContainer, FailedAction, isBlueriqError } from '@blueriq/angular';
import { Container } from '@blueriq/core';
import { BqContentStyles } from '../BqContentStyles';

@Component({
  selector: 'bq-external-container',
  templateUrl: './external-container.component.html',
  providers: [ExternalContainer],
})
@BlueriqComponent({
  type: Container,
  selector: BqContentStyles.EXTERNAL_CONTAINER,
})
export class ExternalContainerComponent {

  private error: unknown;
  private expired = false;
  private flowEnded = false;

  constructor(@Host() public container: Container,
    @Self() public externalContainer: ExternalContainer) {
  }

  get errorMessage(): string {
    if (this.expired) {
      return 'Your session has expired';
    } else if (this.flowEnded) {
      return 'The flow has ended';
    } else if (isBlueriqError(this.error)) {
      return this.error.cause.message;
    } else {
      return 'An unknown error occurred';
    }
  }

  shouldDisplayError(): boolean {
    return this.expired || this.flowEnded || !!this.error;
  }

  handleError(action: FailedAction): void {
    this.error = action.error;
  }

  handleFlowEnded(): void {
    this.flowEnded = true;
  }

  handleSessionExpired(): void {
    this.expired = true;
  }
}
