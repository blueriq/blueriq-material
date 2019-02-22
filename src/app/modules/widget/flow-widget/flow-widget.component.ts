import { Component, Host, Self } from '@angular/core';
import { BlueriqComponent, FailedAction, FlowWidget, isBlueriqError } from '@blueriq/angular';
import { Container } from '@blueriq/core';
import { BqContentStyles } from '../../BqContentStyles';

@Component({
  selector: 'bq-flow-widget',
  templateUrl: './flow-widget.component.html',
  providers: [FlowWidget],
})
@BlueriqComponent({
  type: Container,
  selector: BqContentStyles.DASHBOARD_FLOWWIDGET,
})
export class FlowWidgetComponent {

  private error: unknown;
  private expired = false;
  private flowEnded = false;

  constructor(@Host() public widgetContainer: Container,
              @Self() public flowWidget: FlowWidget) {
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
