///<reference path="../../../../../node_modules/@types/jasmine/index.d.ts"/>
import { async, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqComponents, BlueriqModule } from '@blueriq/angular';
import { BlueriqSessionTemplate, BlueriqTestingModule } from '@blueriq/angular/testing';
import { ContainerTemplate } from '@blueriq/core/testing';
import { MaterialModule } from '../material/material.module';
import { TableComponent } from './table.component';

describe('TableComponent', () => {
  const table = ContainerTemplate.create();
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

    const selectedElement = component.nativeElement.querySelector('.mat-form-field');
    expect(selectedElement).toBeTruthy();
  });

  fit('should have a paginator', () => {

    const selectedElement = component.nativeElement.querySelector('.mat-paginator');
    expect(selectedElement).toBeTruthy();
  });

});
