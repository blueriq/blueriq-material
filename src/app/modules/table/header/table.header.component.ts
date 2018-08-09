import { Component, Host } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { Container } from '@blueriq/core';

@Component({
  template: ''
})
@BlueriqComponent({
  type: Container,
  selector: 'listplus_header'
})
export class TableHeaderComponent {

  // TODO this component can render search AND limit
  constructor(@Host() public container: Container) {
  }

}
