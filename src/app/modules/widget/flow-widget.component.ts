import { Component, Host, Self } from '@angular/core';
import { BlueriqComponent, FailedAction, FlowWidget } from '@blueriq/angular';
import { Container } from '@blueriq/core';

@Component({
  templateUrl: './flow-widget.component.html',
  styleUrls: ['./flow-widget.component.scss'],
  providers: [FlowWidget]
})
@BlueriqComponent({
  type: Container,
  selector: 'dashboard_flowwidget'
})
export class FlowWidgetComponent {

  bqError: FailedAction;

  constructor(@Host() public widget: Container,
              @Self() public flowWidget: FlowWidget) {
  }

  getErrorMessage(): string {
    return this.bqError.error.cause.message;
  }
}
