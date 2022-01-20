import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqComponents } from '@blueriq/angular';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { ContainerTemplate, PageTemplate } from '@blueriq/core/testing';
import { SharedModule } from '@shared/shared.module';
import { ContainerModule } from '../../container.module';
import { ExternalFlowModule } from '../external-flow.module';
import { ExternalFlowPageComponent } from './external-flow-page.component';

describe('ExternalFlowPage', () => {
  let pageTemplate: PageTemplate;
  let containerComponent: ComponentFixture<ExternalFlowPageComponent>;
  let session: BlueriqTestSession;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        BlueriqTestingModule,
        SharedModule,
        ContainerModule,
        ExternalFlowModule,
      ],
      providers: [
        // ExternalFlowPageComponent is not registered in an NgModule as it's supposed to be scoped, so register it
        // manually here.
        BlueriqComponents.register([ExternalFlowPageComponent]),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    pageTemplate = PageTemplate.create().styles('CustomStyle')
      .children(
        ContainerTemplate.create().displayName('Test container'),
      );
    session = BlueriqSessionTemplate.create().build(pageTemplate);
    containerComponent = session.get(ExternalFlowPageComponent);
  });

  it('should render the content', () => {
    expect(containerComponent.nativeElement.querySelector('.CustomStyle')).toBeTruthy();

    const heading = (containerComponent.nativeElement as HTMLElement).querySelector('bq-heading');
    expect(heading).not.toBeNull();
    expect(heading!.textContent!).toContain('Test container');
  });

});
