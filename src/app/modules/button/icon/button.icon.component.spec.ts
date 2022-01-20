import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { ButtonTemplate } from '@blueriq/core/testing';
import { BqPresentationStyles } from '../../BqPresentationStyles';
import { ButtonModule } from '../button.module';
import { ButtonIconComponent } from './button.icon.component';

describe('ButtonComponent', () => {
  let button: ButtonTemplate;
  let component: ComponentFixture<ButtonIconComponent>;
  let session: BlueriqTestSession;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        BlueriqTestingModule,
        FormsModule,
        ButtonModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    button = ButtonTemplate.create().caption('Click Me').styles(BqPresentationStyles.ONLYICON, BqPresentationStyles.ICON_FA_PREFIX + 'user');
    session = BlueriqSessionTemplate.create().build(button);
    component = session.get(ButtonIconComponent);
  });

  it('should only display a button containing a mat-icon', () => {
    expect(component.nativeElement.querySelector('mat-icon[ng-reflect-bq-icon]')).toBeTruthy();
    expect(component.nativeElement).not.toContain('Click me', 'Only a icon should be present');
  });

  it('should use the bqbutton directive', () => {
    // Verify
    expect(component.nativeElement.querySelector('button[bqbutton]')).toBeTruthy();
  });

});
