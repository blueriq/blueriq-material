import {Component, Host, ViewEncapsulation} from '@angular/core';
import {BlueriqComponent} from '@blueriq/angular';
import {TextItem} from '@blueriq/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  encapsulation: ViewEncapsulation.None,
})
@BlueriqComponent({
  type: TextItem
})
export class InputComponent {

  constructor(@Host() public input: TextItem) {
  }

}
