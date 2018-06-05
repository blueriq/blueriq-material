import { Component, Host } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import {Container} from '@blueriq/core';

@Component({
  template: `
<mat-form-field>
  <input matInput (keyup)="applyFilter($event.target.value)" placeholder="Filter">
</mat-form-field>
`
})
@BlueriqComponent({
  type: Container,
  selector: '[name=searchContainert]'
})
export class TableSearchComponent {
  constructor(@Host() public container: Container) {}

  applyFilter(e){
    console.log('not implemented yet');
  }

}
