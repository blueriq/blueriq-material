import { Component } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { Container } from '@blueriq/core';
import { ContainerEmptyComponentMatcher } from './container.empty.component-matcher';

@Component({
  selector: 'bq-empty-container',
  template: '',
})
@BlueriqComponent({
  type: Container,
  selector: new ContainerEmptyComponentMatcher(),
})
export class ContainerEmptyComponent {

}
