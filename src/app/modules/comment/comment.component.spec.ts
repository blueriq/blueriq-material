import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BlueriqSession, DashboardComment } from '@blueriq/angular';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { ButtonTemplate, ContainerTemplate, FieldTemplate } from '@blueriq/core/testing';
import { MaterialModule } from '../../material.module';
import { FormControlModule } from '../form-controls/form-control.module';
import { CommentComponent } from './comment.component';
import { CommentModule } from './comment.module';

describe('CommentComponent', () => {

  let container: ContainerTemplate;
  let component: ComponentFixture<CommentComponent>;
  let session: BlueriqTestSession;
  let commentField: FieldTemplate;
  let commentButton: ButtonTemplate;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        BlueriqTestingModule,
        CommentModule,
        FormControlModule
      ]
    });
  }));

  beforeEach(() => {
    commentField = FieldTemplate.text('somename').explainText('explaining');
    commentButton = ButtonTemplate.create('klik').caption('klikme');
    container = ContainerTemplate.create()
    .contentStyle('storecomment')
    .children(
      commentField,
      commentButton
    );
    session = BlueriqSessionTemplate.create().build(container);
    component = session.get(CommentComponent);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should render the textarea', () => {
    expect(component.nativeElement.querySelector('bq-text-area')).toBeTruthy();
  });

  it('should render the button', () => {
    // SUT
    const button = component.nativeElement.querySelector('button');

    // Verify
    expect(button).toBeTruthy();
    expect(button.innerHTML).toContain('klikme');
  });

  it('button click should call session pressed when value is set', () => {
    // Init
    spyOn(BlueriqSession.prototype, 'pressed');
    const button = component.nativeElement.querySelector('button');
    session.update(
      commentField.value('this is my first comment')
    );

    // SUT
    button.click();
    component.detectChanges();

    // Verify
    expect(DashboardComment.prototype.comment).toHaveBeenCalled();
  });
});
