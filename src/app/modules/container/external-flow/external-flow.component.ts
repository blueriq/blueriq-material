import { Component, Host, Self } from '@angular/core';
import { BlueriqComponent, BlueriqComponents, ExternalFlow, ExternalFlowActions, FailedAction, isBlueriqError } from '@blueriq/angular';
import { Container } from '@blueriq/core';
import { BqContentStyles } from '../../BqContentStyles';
import { ExternalFlowPageComponent } from './external-flow-page/external-flow-page.component';

@Component({
  selector: 'bq-external-flow',
  templateUrl: './external-flow.component.html',
  providers: [
    ExternalFlow,
    BlueriqComponents.scoped([ExternalFlowPageComponent]),
  ],
})
@BlueriqComponent({
  type: Container,
  selector: BqContentStyles.EXTERNAL_FLOW,
})
export class ExternalFlowComponent {

  authenticationFailed = false;
  private error: unknown;
  private expired = false;
  private flowEnded = false;

  constructor(@Host() public container: Container,
              @Self() public externalFlow: ExternalFlow) {
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
    if (action.type === ExternalFlowActions.AUTHENTICATION_FAILED) {
      this.authenticationFailed = true;
      return;
    }

    this.error = action.error;
  }

  handleFlowEnded(): void {
    this.flowEnded = true;
  }

  handleSessionExpired(): void {
    this.expired = true;
  }
}
