import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqComponents } from '@blueriq/angular';
import { BlueriqSessionTemplate, BlueriqTestingModule } from '@blueriq/angular/testing';
import { BlueriqTestSession } from '@blueriq/angular/testing/src/test_session';
import { ButtonTemplate, ContainerTemplate, FieldTemplate } from '@blueriq/core/testing';
import { MaterialModule } from '../../material/material.module';
import { PaginationComponent } from './table.pagination.component';

describe('TablePaginationComponent', () => {
  let pagination: ContainerTemplate;
  let session: BlueriqTestSession;
  let component: ComponentFixture<PaginationComponent>;

  let btnPrevious: ButtonTemplate;
  let btnNext: ButtonTemplate;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaginationComponent],
      providers: [
        BlueriqComponents.register([PaginationComponent]),
      ],
      imports: [
        MaterialModule,
        BrowserAnimationsModule, // or NoopAnimationsModule
        BlueriqTestingModule,
        FormsModule,
      ],
    });
  });

  beforeEach(() => {
    btnPrevious = ButtonTemplate.create('previous');
    btnNext = ButtonTemplate.create('next');
    pagination = ContainerTemplate.create();
    pagination
    .name('navigationContainer')
    .displayName('DisplayName')
    .styles('navigationContainer')
    .contentStyle('tablenavigation')
    .children(
      btnPrevious.disabled(true),
      btnNext.disabled(false),
      ButtonTemplate.create('first'),
      ButtonTemplate.create('last'),
      FieldTemplate.integer('currentPageNumber').domain({ 1: '1', 2: '2' }),
    );
    session = BlueriqSessionTemplate.create().build(pagination);
    component = session.get(PaginationComponent);
    component.autoDetectChanges();
  });

  it('should have been created', () => {
    expect(component).toBeTruthy();
  });

  it('should have working previous and next buttons', () => {
    const pageLabel = component.nativeElement.querySelector('.mat-paginator-range-label').innerHTML;
    const previousButton = component.nativeElement.querySelector('.mat-paginator-navigation-previous');
    const nextButton = component.nativeElement.querySelector('.mat-paginator-navigation-next');
    expect(pageLabel).toBe('1 of 2');
    expect(previousButton.hasAttribute('disabled')).toBeTruthy();
    expect(nextButton.hasAttribute('disabled')).toBeFalsy();

    // TODO: this cant be test any further since this is a ContainerTemplate and
    // TODO: not of type Pagination and is missing the attributes of Pagination
  });

});
