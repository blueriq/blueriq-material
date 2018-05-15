import { Component, Host, ViewEncapsulation } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { Input } from '@blueriq/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  encapsulation: ViewEncapsulation.None,
})
@BlueriqComponent({
  type: Input
})
export class InputComponent {

  constructor(@Host() public input: Input) { }

}
