import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalComponent } from './modal.component';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { ModalModule } from './modal.module';
import { ButtonTemplate, ContainerTemplate } from '@blueriq/core/testing';
import { SharedModule } from '@shared/shared.module';
import { BqContentStyles } from '../BqContentStyles';
import { BqPresentationStyles } from '../BqPresentationStyles';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayContainer } from '@angular/cdk/overlay';

describe('ModalComponent', () => {

  let overlayContainer: OverlayContainer;
  let modalTemplate: ContainerTemplate;
  let session: BlueriqTestSession;
  let modalFixture: ComponentFixture<ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalComponent],
      imports: [
        BlueriqTestingModule,
        SharedModule,
        ModalModule,
        NoopAnimationsModule,
      ],
    }).compileComponents();

    modalTemplate = ContainerTemplate.create('modal')
      .contentStyle(BqContentStyles.MODAL)
      .displayName('Modal')
      .children(
        ContainerTemplate.create('container1').displayName('Container 1'),
        ContainerTemplate.create('container2').displayName('Container 2'),
        ButtonTemplate.create('closebutton').styles(BqPresentationStyles.MODAL_CLOSE_BUTTON),
        ButtonTemplate.create('cancel').caption('Cancel'),
        ButtonTemplate.create('ok').caption('Ok')
      );
    session = BlueriqSessionTemplate.create().build(modalTemplate);
    modalFixture = session.get(ModalComponent);
    overlayContainer = TestBed.inject(OverlayContainer);
  });

  it('should open the dialog when ngOnInit is called', async () => {
    modalFixture.detectChanges();
    expect(getOverLay().querySelector('h1')?.innerText).toContain('Modal');
    expect(getOverLay().querySelector('.close-button')?.innerHTML).toContain('button');
    expect(getOverLay().querySelector('.dialog-actions')?.textContent).toContain('Ok');
    expect(getOverLay().querySelector('.dialog-actions')?.textContent).toContain('Cancel');
    expect(getOverLay().querySelector('.dialog-content')).toBeTruthy();

    expect(modalFixture.componentInstance.modalCloseButton).toBeTruthy();
    expect(modalFixture.componentInstance.modalActionButtons.length).toBe(3);
    expect(modalFixture.componentInstance.container.children.length).toBe(5);
  });

  it('should close the dialog on close button click', () => {
    spyOn(modalFixture.componentInstance, 'onClick');
    getOverLay().querySelector('.close-button')?.firstElementChild?.dispatchEvent(new Event('click'));
    expect(modalFixture.componentInstance.onClick).toHaveBeenCalled();
  });

  it('should close the dialog on action button click', () => {
    spyOn(modalFixture.componentInstance, 'onClick');
    getOverLay().querySelector('.dialog-actions')?.firstElementChild?.dispatchEvent(new Event('click'));
    expect(modalFixture.componentInstance.onClick).toHaveBeenCalled();
  });

  function getOverLay() {
    return overlayContainer.getContainerElement();
  }
});

