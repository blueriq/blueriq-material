import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { ContainerTemplate, FailedElementTemplate } from '@blueriq/core/testing';
import { ContainerFailedComponent } from './container.failed.component';
import { provideContainerComponents } from '../container.providers';

describe('FailedContainerComponent', () => {

  let failedTemplate: FailedElementTemplate;
  let session: BlueriqTestSession;
  let fixture: ComponentFixture<ContainerFailedComponent>;
  let component: ContainerFailedComponent;

  const CLASS_MESSAGE = '.message';
  const CLASS_TRACE = '.trace';

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      providers: [provideContainerComponents()],
      imports: [
        NoopAnimationsModule,
        BlueriqTestingModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    const containerTemplate = ContainerTemplate.create().children(
      failedTemplate = FailedElementTemplate.create()
        .message('Some error has occurred')
        .stacktrace('com.blueriq.exception'),
    );
    session = BlueriqSessionTemplate.create().build(containerTemplate);
    fixture = session.get(ContainerFailedComponent);
    component = fixture.componentInstance;
    fixture.autoDetectChanges();
  });

  it('should display the message and no stacktrace', () => {
    expect(fixture.nativeElement.querySelector(CLASS_MESSAGE).innerHTML).toContain('Some error has occurred');
    expect(fixture.nativeElement.querySelector(CLASS_TRACE)).toBeFalsy();
    expect(component.showTrace, 'by default this should be false').toBeFalsy();
  });

  it('should copy to clipboard', () => {
    vi.spyOn(document, 'execCommand');
    const buttons = fixture.nativeElement.querySelector(CLASS_MESSAGE).querySelectorAll('button');
    const buttonCopyToClipBoard = buttons[0];
    buttonCopyToClipBoard.click();
    expect(document.execCommand).toHaveBeenCalledWith('copy');
  });

  it('should copy to clipboard with missing stacktrace', () => {
    session.update(
      failedTemplate.stacktrace(undefined),
    );

    vi.spyOn(document, 'execCommand');
    const buttons = fixture.nativeElement.querySelector(CLASS_MESSAGE).querySelectorAll('button');
    const buttonCopyToClipBoard = buttons[0];
    buttonCopyToClipBoard.click();
    expect(document.execCommand).toHaveBeenCalledWith('copy');
  });

  it('should display the stacktrace when clicked on expanding', () => {
    const buttons = fixture.nativeElement.querySelector(CLASS_MESSAGE).querySelectorAll('button');
    const buttonShowTrace = buttons[1];
    buttonShowTrace.click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector(CLASS_TRACE).innerHTML).toContain('com.blueriq.exception');
  });

  it('should not display stacktrace when isDev is false', () => {
    // Init
    component.isDev = false;
    component.showTrace = true;
    fixture.detectChanges();

    // Verify
    expect(fixture.nativeElement.querySelector(CLASS_TRACE), 'With showTrace true, this still should be visible when not development mode').toBeFalsy(
      );
    expect(fixture.nativeElement.querySelector('button'), 'No actions should be available, just the message should be shown').toBeFalsy();
  });

});
