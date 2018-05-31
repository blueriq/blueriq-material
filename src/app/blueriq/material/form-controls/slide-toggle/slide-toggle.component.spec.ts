import { async, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqComponents, BlueriqModule } from '@blueriq/angular';
import { BlueriqSessionTemplate, BlueriqTestingModule } from '@blueriq/angular/testing';
import { FieldTemplate } from '@blueriq/core/testing';
import { MaterialModule } from '../../material/material.module';
import { SlideToggleComponent } from './slide-toggle.component';

describe('SlideToggleComponent', () => {
  const field = FieldTemplate.boolean();
  let component;
  let session;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SlideToggleComponent],
      providers: [BlueriqComponents.register([SlideToggleComponent])],
      imports: [
        MaterialModule,
        BrowserAnimationsModule, // or NoopAnimationsModule
        BlueriqModule.forRoot(),
        BlueriqTestingModule,
        FormsModule
      ]
    });
  }));

  beforeEach(() => {
    field.styles('toggle');
    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(SlideToggleComponent);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should be changed', () => {
    session.update(
      field.value('true')
    );
    let inputField = component.nativeElement.querySelector('.mat-checked');
    expect(inputField).toBeTruthy();

    session.update(
      field.value('false')
    );
    inputField = component.nativeElement.querySelector('.mat-checked');
    expect(inputField).toBeFalsy();
  });

  it('should be disabled', () => {
    field.styles('toggle', 'Disabled');
    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(SlideToggleComponent);

    const inputField = component.nativeElement.querySelector('.mat-disabled');
    expect(inputField).toBeTruthy();

  });
});
