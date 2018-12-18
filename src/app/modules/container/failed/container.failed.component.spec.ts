import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { Container, FailedElementJson } from '@blueriq/core';
import { CompositeElementTemplate, ContainerTemplate } from '@blueriq/core/testing';
import { SharedModule } from '@shared/shared.module';
import { ContainerModule } from '../container.module';
import { ContainerFailedComponent } from './container.failed.component';

export class FailedElementTemplate extends CompositeElementTemplate<Container> {

  private readonly _container: Partial<FailedElementJson> = {
    message: '',
    stackTrace: '',
  };

  protected constructor(name?: string) {
    super(name);
  }

  get type(): string {
    return 'failedelement';
  }

  get prefix(): string {
    return 'F';
  }

  static create(name?: string): FailedElementTemplate {
    return new FailedElementTemplate(name);
  }
}

describe('FailedContainerComponent', () => {

  let failedTemplate: ContainerTemplate;
  let session: BlueriqTestSession;
  let fixture: ComponentFixture<ContainerFailedComponent>;
  let component: ContainerFailedComponent;

  const CLASS_MESSAGE = '.message';
  const CLASS_TRACE = '.trace';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        BlueriqTestingModule,
        SharedModule,
        ContainerModule,
      ],
    });
  }));

  beforeEach(() => {
    failedTemplate = ContainerTemplate.create().children(
      FailedElementTemplate.create('hoppa'),
    );
    session = BlueriqSessionTemplate.create().build(failedTemplate);
    fixture = session.get(ContainerFailedComponent);
    fixture.componentInstance.failedElement.message = 'Some error has occured';
    fixture.componentInstance.failedElement.stacktrace = 'blueriq.com.error';
    component = fixture.componentInstance;
    fixture.autoDetectChanges();
  });

  it('should display the message and no stacktrace', () => {
    expect(fixture.nativeElement.querySelector(CLASS_MESSAGE).innerHTML).toContain('Some error has occured');
    expect(fixture.nativeElement.querySelector(CLASS_TRACE)).toBeFalsy();
    expect(component.showTrace).toBeFalsy('by default this should be false');
  });

  it('should copy to clipboard', () => {
    spyOn(document, 'execCommand').and.callThrough();
    const buttons = fixture.nativeElement.querySelector(CLASS_MESSAGE).querySelectorAll('button');
    const buttonCopyToClipBoard = buttons[0];
    buttonCopyToClipBoard.click();
    expect(document.execCommand).toHaveBeenCalledWith('copy');
  });

  it('should copy to clipboard with missing stacktrace', () => {
    fixture.componentInstance.failedElement.stacktrace = undefined;

    spyOn(document, 'execCommand').and.callThrough();
    const buttons = fixture.nativeElement.querySelector(CLASS_MESSAGE).querySelectorAll('button');
    const buttonCopyToClipBoard = buttons[0];
    buttonCopyToClipBoard.click();
    expect(document.execCommand).toHaveBeenCalledWith('copy');
  });

  it('should display the stacktrace when clicked on expanding', () => {
    const buttons = fixture.nativeElement.querySelector(CLASS_MESSAGE).querySelectorAll('button');
    const buttonShowTrace = buttons[1];
    buttonShowTrace.click();
    expect(fixture.nativeElement.querySelector(CLASS_TRACE).innerHTML).toContain('blueriq.com.error');
  });

  it('should not display stacktrace when isDev is false', () => {
    // Init
    component.isDev = false;
    component.showTrace = true;
    fixture.detectChanges();

    // Verify
    expect(fixture.nativeElement.querySelector(CLASS_TRACE)).toBeFalsy(
      'With showTrace true, this still should be visible when not development mode');
    expect(fixture.nativeElement.querySelector('button')).toBeFalsy('No actions should be available, just the message should be shown');
  });

});
