import {Component, Host, QueryList} from '@angular/core';
import {BlueriqChild, BlueriqChildren, BlueriqComponent} from '@blueriq/angular';
import {Container, Field} from '@blueriq/core';
import {Observable} from 'rxjs/Observable';

@Component({
  styleUrls: ['./container.component.css'],
  templateUrl: './container.component.html',

})
@BlueriqComponent({
  type: Container,
})
export class ContainerComponent {

  @BlueriqChildren(Field)
  fields: QueryList<Field>;

  @BlueriqChildren(Field, {descendants: true})
  descendants: QueryList<Field>;

  @BlueriqChild(Field, {required: false})
  field: Field;

  @BlueriqChild(Field, {observe: true})
  fieldObs: Observable<Field>;

  constructor(@Host() public container: Container) {
  }

}
