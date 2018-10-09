import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { Container, FailedElementJson } from '@blueriq/core';
import { CompositeElementTemplate, ContainerTemplate } from '@blueriq/core/testing';
import { SharedModule } from '@shared/shared.module';
import { ContainerModule } from '../container.module';
import { FailedComponent } from './failed.component';

export class FailedElementTemplate extends CompositeElementTemplate<Container> {

  private readonly _container: Partial<FailedElementJson> = {
    message: '',
    stackTrace: ''
  };

  protected constructor(name?: string) {
    super(name);
  }

  static create(name?: string): FailedElementTemplate {
    return new FailedElementTemplate(name);
  }

  get type(): string {
    return 'failedelement';
  }

  get prefix(): string {
    return 'F';
  }
}

describe('FailedContainerComponent', () => {

  let failedTemplate: ContainerTemplate;
  let session: BlueriqTestSession;
  let fixture: ComponentFixture<FailedComponent>;
  let component: FailedComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        BlueriqTestingModule,
        SharedModule,
        ContainerModule
      ]
    });
  }));

  beforeEach(() => {
    failedTemplate = ContainerTemplate.create().children(
      FailedElementTemplate.create('hoppa')
    );
    session = BlueriqSessionTemplate.create().build(failedTemplate);
    fixture = session.get(FailedComponent);
    fixture.componentInstance.failedElement.message = 'Some error has occured';
    fixture.componentInstance.failedElement.stacktrace = 'blueriq.com.error';
    component = fixture.componentInstance;
    fixture.autoDetectChanges();
  });

  it('should display the message and no stacktrace', () => {
    expect(fixture.nativeElement.querySelector('.message').innerHTML).toContain('Some error has occured');
    expect(fixture.nativeElement.querySelector('.trace')).toBeFalsy();
  });

  it('should display the stracktrace when clicked on expanding', () => {
    spyOn(document, 'execCommand').and.callThrough();
    const buttons = fixture.nativeElement.querySelector('.message').querySelectorAll('button');
    const buttoncopyToClipBoard = buttons[0];
    buttoncopyToClipBoard.click();
    expect(document.execCommand).toHaveBeenCalledWith('copy');
  });

  it('should copy to clipboard', () => {
    const buttons = fixture.nativeElement.querySelector('.message').querySelectorAll('button');
    const buttonShowTrace = buttons[1];
    buttonShowTrace.click();
    expect(fixture.nativeElement.querySelector('.trace').innerHTML).toContain('blueriq.com.error');
  });

});
