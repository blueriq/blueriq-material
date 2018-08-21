import { Component } from '@angular/core';
import { BlueriqChild, BlueriqComponent } from '@blueriq/angular';
import { Container } from '@blueriq/core';

@Component({
  selector: 'bq-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
@BlueriqComponent({
  type: Container,
  selector: 'dashboard_menu'
})
export class MenuComponent {

  @BlueriqChild(Container, 'menubar')
  menuBar: Container;

}
