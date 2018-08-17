import { Component, Host, Self } from '@angular/core';
import { BlueriqComponent, FlowWidget } from '@blueriq/angular';
import { Container } from '@blueriq/core';

@Component({
  templateUrl: './flow-widget.component.html',
  providers: [FlowWidget]
})
@BlueriqComponent({
  type: Container,
  selector: 'dashboard_flowwidget'
})
export class FlowWidgetComponent {

  constructor(@Host() public widget: Container,
              @Self() public flowWidget: FlowWidget) {
  }

}
