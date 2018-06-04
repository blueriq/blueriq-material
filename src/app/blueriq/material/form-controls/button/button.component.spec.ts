import { async, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqComponents, BlueriqModule } from '@blueriq/angular';
import { BlueriqSessionTemplate, BlueriqTestingModule } from '@blueriq/angular/testing';
import { ButtonTemplate } from '@blueriq/core/testing';
import { MaterialModule } from '../../material/material.module';
import { PresentationStyles } from '../../presentationstyles/presentationstyles';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  const button = ButtonTemplate.create();
  let component;
  let session;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonComponent],
      providers: [BlueriqComponents.register([ButtonComponent])],
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

  fit('should be accent colored', () => {
    session.update(
      button.styles(PresentationStyles.ACCENT)
    );

    const classes: string = component.nativeElement.querySelector('button').getAttribute('class');
    expect(classes).toContain('mat-accent');
    expect(classes).not.toContain('mat-primary');
  });

});
