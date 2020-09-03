import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqCommonModule } from '@blueriq/angular';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { ButtonTemplate } from '@blueriq/core/testing';
import { BqPresentationStyles } from '../BqPresentationStyles';
import { ButtonComponent } from './button.component';
import { ButtonModule } from './button.module';

describe('ButtonComponent', () => {
  let button: ButtonTemplate;
  let component: ComponentFixture<ButtonComponent>;
  let session: BlueriqTestSession;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        BlueriqTestingModule,
        BlueriqCommonModule,
        FormsModule,
        ButtonModule,
      ],
    });
  }));

  beforeEach(() => {
    button = ButtonTemplate.create();
    button.caption('Click me!');
    session = BlueriqSessionTemplate.create().build(button);
    component = session.get(ButtonComponent);
  });

  it('should display the button text', () => {
    const buttonText: string = component.nativeElement.querySelector('.mat-button-wrapper').textContent.trim();
    expect(buttonText).toBe('Click me!');

  });

  it('should be disabled', () => {
    let disabledAttributePresent = component.nativeElement.querySelector('button').hasAttribute('disabled');
    expect(disabledAttributePresent).toBeFalsy();

    // Disable
    session.update(
      button.disabled(true),
    );
    disabledAttributePresent = component.nativeElement.querySelector('button').hasAttribute('disabled');
    expect(disabledAttributePresent).toBeTruthy();
  });

  it('should be basic colored', () => {
    session.update(
      button.styles(),
    );

    const classes: string = component.nativeElement.querySelector('button').getAttribute('class');
    expect(classes).not.toContain('mat-primary');
    expect(classes).not.toContain('mat-accent');
  });

  it('should be primary colored', () => {
    session.update(
      button.styles(BqPresentationStyles.PRIMARY),
    );

    const classes: string = component.nativeElement.querySelector('button').getAttribute('class');
    expect(classes).toContain('mat-primary');
    expect(classes).not.toContain('mat-accent');
  });

  it('should be secondary colored', () => {
    session.update(
      button.styles(BqPresentationStyles.ACCENT),
    );

    const classes: string = component.nativeElement.querySelector('button').getAttribute('class');
    expect(classes).toContain('mat-accent');
    expect(classes).not.toContain('mat-primary');
  });

  it('should be tertiary colored', () => {
    session.update(
      button.styles(BqPresentationStyles.TERTIARY),
    );

    const classes: string = component.nativeElement.querySelector('button').getAttribute('class');
    expect(classes).toContain('Tertiary');
    expect(classes).not.toContain('mat-primary');
  });

  it('should be raised by default', () => {
    const classes: string = component.nativeElement.querySelector('button').getAttribute('class');
    expect(classes).toContain('mat-raised-button');
  });

  it('should be flat on presentation style', () => {
    session.update(
      button.styles(BqPresentationStyles.FLAT_BUTTON),
    );

    const classes: string = component.nativeElement.querySelector('button').getAttribute('class');
    expect(classes).not.toContain('mat-raised-button');
  });

  it('should use the bqbutton directive', () => {
    // Verify
    expect(component.nativeElement.querySelector('button[bqbutton]')).toBeTruthy();
  });

});
