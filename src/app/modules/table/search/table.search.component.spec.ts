import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqComponents } from '@blueriq/angular';
import { BlueriqSessionTemplate, BlueriqTestingModule } from '@blueriq/angular/testing';
import { BlueriqTestSession } from '@blueriq/angular/testing/src/test_session';
import { ContainerTemplate } from '@blueriq/core/testing';
import { MaterialModule } from '../../../material.module';

import { TableSearchComponent } from './table.search.component';

describe('TableSearchComponent', () => {
  let tableTemplate: ContainerTemplate;
  let session: BlueriqTestSession;
  let component: ComponentFixture<TableSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableSearchComponent],
      providers: [
        BlueriqComponents.register([TableSearchComponent])
      ],
      imports: [
        MaterialModule,
        BrowserAnimationsModule, // or NoopAnimationsModule
        BlueriqTestingModule,
        FormsModule
      ]
    });
  });

  beforeEach(() => {
    tableTemplate = ContainerTemplate.create('searchContainer');
    tableTemplate.contentStyle('table');
    session = BlueriqSessionTemplate.create().build(tableTemplate);
    component = session.get(TableSearchComponent);
  });

  it('should have been created', () => {
    expect(component).toBeTruthy();
  });

  it('should have no content', () => {
    // Since only the instanceList is implemented and the instancelist has no search container, we expect this to be so.
    expect(component.nativeElement.innerHTML).toBe('');
  });

});
