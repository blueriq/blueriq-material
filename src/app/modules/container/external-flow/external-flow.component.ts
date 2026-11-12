import { Component, inject } from '@angular/core';
import { BlueriqComponent, BlueriqComponents, ExternalFlow, ExternalFlowActions, FailedAction, isBlueriqError, BlueriqCommonModule } from '@blueriq/angular';
import { Container } from '@blueriq/core';
import { BqContentStyles } from '../../BqContentStyles';
import { ExternalFlowPageComponent } from './external-flow-page/external-flow-page.component';
import { BqKeyDirective } from '../../../shared/directive/bq-key/bq-key.directive';
import { NgClass } from '@angular/common';
import { BqContainerDirective } from '../../../shared/directive/container/bq-container.directive';
import { HeadingComponent } from '../../heading/heading.component';
import { MatError } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'bq-external-flow',
    templateUrl: './external-flow.component.html',
    providers: [
        ExternalFlow,
        BlueriqComponents.scoped([ExternalFlowPageComponent]),
    ],
    imports: [BqKeyDirective, BlueriqCommonModule, NgClass, BqContainerDirective, HeadingComponent, MatError, MatIcon]
})
@BlueriqComponent({
  type: Container,
  selector: BqContentStyles.EXTERNAL_FLOW,
})
export class ExternalFlowComponent {
  container = inject(Container);
  externalFlow = inject(ExternalFlow, { self: true });


  authenticationFailed = false;
  private error: unknown;
  private expired = false;
  private flowEnded = false;

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
