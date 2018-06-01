import { async, TestBed } from '@angular/core/testing';
import {BlueriqSessionTemplate, BlueriqTestingModule} from '@blueriq/angular/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from '../../material/material/material.module';
import {BlueriqComponents, BlueriqModule} from '@blueriq/angular';
import {FormsModule} from '@angular/forms';
import {TableComponent} from './table.component';
import {Table} from "@blueriq/angular/lists";
import {ContainerTemplate} from "@blueriq/core/testing";

describe('TableComponent', () => {

  let table = ContainerTemplate.create();
  let session;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableComponent],
      providers: [BlueriqComponents.register([TableComponent])],
      imports: [
        MaterialModule,
        BrowserAnimationsModule, // or NoopAnimationsModule
        BlueriqModule.forRoot(),
        BlueriqTestingModule,
        FormsModule
      ]
    });
  }));

  beforeEach( () => {
    // Create a ElementComponent  based on a TableComponent.
    table.contentStyle('table');
    session = BlueriqSessionTemplate.create().build(table);
    component = session.get(TableComponent);
  });

  it('should have a filter', () => {

    let selectedElement = component.nativeElement.querySelector('.mat-form-field');
    expect(selectedElement).toBeTruthy();
  });

  fit('should have a paginator', () => {

    let selectedElement = component.nativeElement.querySelector('.mat-paginator');
    expect(selectedElement).toBeTruthy();
  });

});
