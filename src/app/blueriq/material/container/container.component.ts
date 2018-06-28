import { animateChild, query, transition, trigger } from '@angular/animations';
import { Component, Host, QueryList } from '@angular/core';
import { BlueriqChild, BlueriqChildren, BlueriqComponent } from '@blueriq/angular';
import { Container, Field } from '@blueriq/core';
import { Observable } from 'rxjs/Observable';

@Component({
  styleUrls: ['./container.component.scss'],
  templateUrl: './container.component.html',
  animations: [
    trigger('animate', [
      transition(':leave', [
        query('@*', animateChild(), { optional: true })
      ])
    ])
  ]
})
@BlueriqComponent({
  type: Container
})
export class ContainerComponent {

  @BlueriqChildren(Field)
  fields: QueryList<Field>;

  @BlueriqChildren(Field, { descendants: true })
  descendants: QueryList<Field>;

  @BlueriqChild(Field, { required: false })
  field: Field;

  @BlueriqChild(Field, { observe: true })
  fieldObs: Observable<Field>;

  constructor(@Host() public container: Container) {
  }

  isOutlet(): boolean {
    return this.container.contentStyle === 'container';
  }

}
