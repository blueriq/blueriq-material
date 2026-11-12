import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { ButtonTemplate } from '@blueriq/core/testing';
import { BqPresentationStyles } from '../../BqPresentationStyles';
import { ButtonIconComponent } from './button.icon.component';
import { provideButtonComponents } from '../button.providers';

describe('ButtonComponent', () => {
  let button: ButtonTemplate;
  let component: ComponentFixture<ButtonIconComponent>;
  let session: BlueriqTestSession;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      providers: [provideButtonComponents()],
      imports: [
        NoopAnimationsModule,
        BlueriqTestingModule,
        FormsModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    button = ButtonTemplate.create().caption('Click Me').styles(BqPresentationStyles.ONLYICON, BqPresentationStyles.ICON_FA_PREFIX + 'user');
    session = BlueriqSessionTemplate.create().build(button);
    component = session.get(ButtonIconComponent);
  });

  it('should only display a button containing a mat-icon', () => {
    expect(component.nativeElement.querySelector('mat-icon')).toBeTruthy();
    expect(component.nativeElement.textContent).not.toContain('Click me');
  });

  it('should use the bqbutton directive', () => {
    // Verify
    expect(component.nativeElement.querySelector('button[bqbutton]')).toBeTruthy();
  });

});
