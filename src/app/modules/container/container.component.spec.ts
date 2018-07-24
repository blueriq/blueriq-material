import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqComponents } from '@blueriq/angular';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { Page } from '@blueriq/core';
import { ContainerTemplate } from '@blueriq/core/testing';
import { MaterialModule } from '../../material.module';
import { ContainerComponent } from './container.component';

class MockPage extends Page {
  contentStyle = 'qweqwewqewqewqewqeqwe';
}

describe('ContainerComponent', () => {
  let containerTemplate: ContainerTemplate;
  // let pageTemplate: PageTemplate;
  let containerComponent: ComponentFixture<ContainerComponent>;
  let session: BlueriqTestSession;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContainerComponent/*, PageComponent*/],
      providers: [BlueriqComponents.register([ContainerComponent/*, PageComponent*/])],
      imports: [
        MaterialModule,
        BrowserAnimationsModule, // or NoopAnimationsModule
        BlueriqTestingModule,
        FormsModule
      ]
    });
  }));

  beforeEach(() => {
    containerTemplate = ContainerTemplate.create();
    session = BlueriqSessionTemplate.create().build(containerTemplate);
    containerComponent = session.get(ContainerComponent);
  });

  it('should be created', () => {
    expect(containerComponent).toBeTruthy();
  });

  it('should be created', () => {
    // init
    const container = containerComponent.componentInstance;
    // Sut
    const display = container.displayAs();

    // Verify
    expect(display).toBe('');
  });

});
