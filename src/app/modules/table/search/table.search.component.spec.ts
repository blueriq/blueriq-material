import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqComponents } from '@blueriq/angular';
import { BlueriqSessionTemplate, BlueriqTestingModule } from '@blueriq/angular/testing';
import { BlueriqTestSession } from '@blueriq/angular/testing/src/test_session';
import { ButtonTemplate, ContainerTemplate, FieldTemplate } from '@blueriq/core/testing';
import { MaterialModule } from '../../../material.module';
import { TableFilterValueComponent } from '../filter/table.filter-value.component';
import { TableFilterComponent } from '../filter/table.filter.component';
import { ListComponent } from '../list.component';
import { TablePaginationComponent } from '../pagination/table.pagination.component';
import { TableComponent } from '../table.component';
import { TableSearchComponent } from './table.search.component';

describe('TableSearchComponent', () => {
  let tableSearch: ContainerTemplate;
  let field: FieldTemplate;
  let button: ButtonTemplate;
  let session: BlueriqTestSession;
  let component: ComponentFixture<ListComponent>;
  let tableSearchComponent: TableSearchComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListComponent, TableComponent, TableSearchComponent, TableFilterComponent,
        TableFilterValueComponent, TablePaginationComponent],
      providers: [
        BlueriqComponents.register([ListComponent])
      ],
      imports: [
        MaterialModule,
        NoopAnimationsModule,
        BlueriqTestingModule,
        FormsModule
      ]
    });
  });

  beforeEach(() => {
    field = FieldTemplate.text('searchField')
    .value([])
    .styles('searchField');

    button = ButtonTemplate.create('searchButton')
    .styles('searchButton')
    .caption('Zoeken');

    tableSearch = ContainerTemplate.create('searchContainer')
    .contentStyle('table')
    .children(field, button);

    const btnFirst = ButtonTemplate.create('first')
    .caption('<<')
    .disabled(true)
    .styles('pagination');

    const btnPrevious = ButtonTemplate.create('previous')
    .caption('<')
    .disabled(true)
    .styles('pagination');

    const currentPageNumber = FieldTemplate.integer('InstanceListContainer_currentPageNumber')
    .domain({ 1: '1', 2: '2', 3: '3' })
    .styles('paginationNumber')
    .value('1');

    const btnNext = ButtonTemplate.create('next')
    .caption('>')
    .styles('pagination');

    const btnLast = ButtonTemplate.create('last')
    .caption('>>')
    .styles('pagination');

    const pagination = ContainerTemplate.create()
    .name('navigationContainer')
    .displayName('DisplayName')
    .styles('navigationContainer')
    .contentStyle('tablenavigation')
    .children(
      btnFirst,
      btnPrevious,
      currentPageNumber,
      btnNext,
      btnLast
    );
    const table = ContainerTemplate.create().contentStyle('table');
    const list = ContainerTemplate.create().children(tableSearch, table, pagination);
    session = BlueriqSessionTemplate.create().build(list);
    component = session.get(ListComponent);

    tableSearchComponent = new TableSearchComponent();
    tableSearchComponent.search = component.componentInstance.list.search!;

  });

  it('should render', () => {
    expect(component.nativeElement.querySelector('mat-form-field')).toBeFalsy();
    expect(component.nativeElement.querySelector('button')).toBeTruthy();
    expect(component.nativeElement.querySelector('button mat-icon').innerText).toMatch(/^search$/i);
  });

  it('should show empty search field on button click', () => {
    component.nativeElement.querySelector('button').click();
    component.detectChanges();

    expect(component.nativeElement.querySelector('mat-label').innerText).toBe('Zoeken');
    expect(component.nativeElement.querySelector('mat-chip-list')).toBeTruthy();
    expect(component.nativeElement.querySelector('mat-chip')).toBeFalsy();
  });

  it('should render multiple chips', () => {
    session.update(
      field.value(['term1', 'term2', 'term3'])
    );

    expect(component.nativeElement.querySelectorAll('mat-chip').length).toBe(3);
  });

  it('should add a search term', () => {
    const searchInput = component.nativeElement.querySelector('input');
    tableSearchComponent.add({ 'input': searchInput, 'value': 'term1' });
    expect(tableSearchComponent.searchTerms.length).toBe(1);
  });

  it('should not add a search term if a term with different casing is already present', () => {
    const searchInput = component.nativeElement.querySelector('input');

    tableSearchComponent.add({ 'input': searchInput, 'value': 'term1' });
    expect(tableSearchComponent.searchTerms.length).toBe(1);
    tableSearchComponent.add({ 'input': searchInput, 'value': 'TERM1' });
    expect(tableSearchComponent.searchTerms.length).toBe(1);
  });

  it('should remove a search term', () => {
    tableSearchComponent.searchTerms = ['term1', 'term2', 'term3'];

    expect(tableSearchComponent.searchTerms.length).toBe(3);

    tableSearchComponent.remove('term2');
    expect(tableSearchComponent.searchTerms.length).toBe(2);
  });

  it('should remove a search term even in different casing', () => {
    tableSearchComponent.searchTerms = ['term1', 'term2', 'term3'];
    expect(tableSearchComponent.searchTerms.length).toBe(3);

    tableSearchComponent.remove('TERM2');
    expect(tableSearchComponent.searchTerms.length).toBe(2);
  });

  it('should not add an empty search term', () => {
    tableSearchComponent.searchTerms = ['term1', 'term2', 'term3'];
    const searchInput = component.nativeElement.querySelector('input');

    tableSearchComponent.add({ 'input': searchInput, 'value': '' });
    expect(tableSearchComponent.searchTerms.length).toBe(3);

  });

});
