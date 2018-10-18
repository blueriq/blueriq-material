import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Search } from '@blueriq/angular/lists';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { ButtonTemplate, ContainerTemplate, FieldTemplate } from '@blueriq/core/testing';
import { ListComponent } from '../list.component';
import { ListModule } from '../list.module';
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
      imports: [
        NoopAnimationsModule,
        BlueriqTestingModule,
        ListModule
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

    let search!: Search;
    component.componentInstance.list.search$.subscribe(s => search = s!).unsubscribe();

    tableSearchComponent = new TableSearchComponent();
    tableSearchComponent.search = search;

  });

  it('should render', () => {
    expect(component.nativeElement.querySelector('mat-form-field')).toBeFalsy();
    expect(component.nativeElement.querySelector('button')).toBeTruthy();
    expect(component.nativeElement.querySelector('button mat-icon').innerText).toMatch(/^search$/i);
  });

  it('should show empty search field on button click', () => {
    component.nativeElement.querySelector('button').click();
    component.detectChanges();

    expect(component.nativeElement.querySelector('mat-label').innerHTML).toBe('Zoeken');
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
