import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqComponents, BlueriqSession } from '@blueriq/angular';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { ButtonTemplate } from '@blueriq/core/testing';
import { MaterialModule } from '../../material.module';
import { PresentationStyles } from '../PresentationStyles';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let button: ButtonTemplate;
  let component: ComponentFixture<ButtonComponent>;
  let session: BlueriqTestSession;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonComponent],
      providers: [BlueriqComponents.register([ButtonComponent])],
      imports: [
        MaterialModule,
        BrowserAnimationsModule, // or NoopAnimationsModule
        BlueriqTestingModule,
        FormsModule
      ]
    });
  }));

  beforeEach(() => {
    button = ButtonTemplate.create();
    button.caption('Click me!');
    session = BlueriqSessionTemplate.create().build(button);
    component = session.get(ButtonComponent);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
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
      button.disabled(true)
    );
    disabledAttributePresent = component.nativeElement.querySelector('button').hasAttribute('disabled');
    expect(disabledAttributePresent).toBeTruthy();
  });

  it('should be basic colored', () => {
    session.update(
      button.styles()
    );

    const classes: string = component.nativeElement.querySelector('button').getAttribute('class');
    expect(classes).not.toContain('mat-primary');
    expect(classes).not.toContain('mat-accent');
  });

  it('should be primary colored', () => {
    session.update(
      button.styles(PresentationStyles.PRIMARY)
    );

    const classes: string = component.nativeElement.querySelector('button').getAttribute('class');
    expect(classes).toContain('mat-primary');
    expect(classes).not.toContain('mat-accent');
  });

  it('should be accent colored', () => {
    session.update(
      button.styles(PresentationStyles.ACCENT)
    );

    const classes: string = component.nativeElement.querySelector('button').getAttribute('class');
    expect(classes).toContain('mat-accent');
    expect(classes).not.toContain('mat-primary');
  });

  it('should call the session when it gets clicked', () => {
    spyOn(BlueriqSession.prototype, 'pressed');
    const buttonComponent: ButtonComponent = component.componentInstance;
    session.update(
      button.disabled(true)
    );
    buttonComponent.onClick();
    expect(BlueriqSession.prototype.pressed).not.toHaveBeenCalled();

    session.update(
      button.disabled(false)
    );
    buttonComponent.onClick();
    expect(BlueriqSession.prototype.pressed).toHaveBeenCalledTimes(1);

  });

});
