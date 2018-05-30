import { async, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqComponents, BlueriqModule } from '@blueriq/angular';
import { BlueriqSessionTemplate, BlueriqTestingModule } from '@blueriq/angular/testing';
import { ButtonTemplate } from '@blueriq/core/testing';
import { MaterialModule } from '../../material/material.module';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  const button = ButtonTemplate.create();

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

  it('should be created', () => {
    const session = BlueriqSessionTemplate.create().build(button);
    const component = session.get(ButtonComponent);
    expect(component).toBeTruthy();
  });

  it('should display the button text', () => {
    const text: string = 'Click me!';
    button.caption(text);
    const session = BlueriqSessionTemplate.create().build(button);
    const component = session.get(ButtonComponent);
    let buttonText: string = component.nativeElement.querySelector('.mat-button-wrapper').textContent.trim();
    expect(buttonText).toBe(text);
  });

  it('should be disabled', () => {
    const session = BlueriqSessionTemplate.create().build(button);
    const component = session.get(ButtonComponent);

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
    button.styles();
    const session = BlueriqSessionTemplate.create().build(button);
    const component = session.get(ButtonComponent);

    let classes: string = component.nativeElement.querySelector('button').getAttribute('class');
    expect(classes).not.toContain('mat-primary');
    expect(classes).not.toContain('mat-accent');
  });

  it('should be primary colored', () => {
    button.styles('Primary');
    const session = BlueriqSessionTemplate.create().build(button);
    const component = session.get(ButtonComponent);

    let classes: string = component.nativeElement.querySelector('button').getAttribute('class');
    expect(classes).toContain('mat-primary');
    expect(classes).not.toContain('mat-accent');
  });

  it('should be accent colored', () => {
    button.styles('Accent');
    const session = BlueriqSessionTemplate.create().build(button);
    const component = session.get(ButtonComponent);

    let classes: string = component.nativeElement.querySelector('button').getAttribute('class');
    expect(classes).toContain('mat-accent');
    expect(classes).not.toContain('mat-primary');
  });

});
