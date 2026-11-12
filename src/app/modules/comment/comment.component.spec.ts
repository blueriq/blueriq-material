import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SubmitComment } from '@blueriq/angular/dashboard';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { ButtonTemplate, ContainerTemplate, FieldTemplate } from '@blueriq/core/testing';
import { BqContainerDirective } from '@shared/directive/container/bq-container.directive';
import { CommentComponent } from './comment.component';
import { provideCommentComponents } from './comment.providers';
import { provideFormControlComponents } from '../form-controls/form-control.providers';

describe('CommentComponent', () => {

  let container: ContainerTemplate;
  let component: ComponentFixture<CommentComponent>;
  let session: BlueriqTestSession;
  let commentField: FieldTemplate;
  let commentButton: ButtonTemplate;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      providers: [provideCommentComponents(), provideFormControlComponents()],
      imports: [
        NoopAnimationsModule,
        BlueriqTestingModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    commentField = FieldTemplate.text('somename').explainText('explaining');
    commentButton = ButtonTemplate.create('klik').caption('klikme');
    container = ContainerTemplate.create()
      .contentStyle('storecomment')
      .children(
        commentField,
        commentButton,
      );
    session = BlueriqSessionTemplate.create().build(container);
    component = session.get(CommentComponent);
  });

  it('should render the textarea', () => {
    expect(component.nativeElement.querySelector('textarea')).toBeTruthy();
  });

  it('should render the button', () => {
    // SUT
    const button = component.nativeElement.querySelector('button');

    // Verify
    expect(button).toBeTruthy();
    expect(button.innerHTML).toContain('klikme');
  });

  it('button click should call submit()', () => {
    // Init
    const submitSpy = spyOn(SubmitComment.prototype, 'submit');
    const button = component.nativeElement.querySelector('button');
    session.update(
      commentField.value('this is my first comment'),
    );

    // SUT
    button.click();
    component.detectChanges();

    // Verify
    expect(submitSpy).toHaveBeenCalled();
  });

  it('should use the bqContainer directive', () => {
    // Verify
    expect(component.debugElement.query(By.directive(BqContainerDirective))).toBeTruthy();
  });

  it('should use the bq-heading to display header', () => {
    // Verify
    expect(component.nativeElement.querySelector('bq-heading')).toBeTruthy();
  });
});
