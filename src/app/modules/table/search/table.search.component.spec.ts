import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqComponents } from '@blueriq/angular';
import { BlueriqSessionTemplate, BlueriqTestingModule } from '@blueriq/angular/testing';
import { BlueriqTestSession } from '@blueriq/angular/testing/src/test_session';
import { ButtonTemplate, ContainerTemplate, FieldTemplate } from '@blueriq/core/testing';
import { MaterialModule } from '../../../material.module';
import { TableSearchComponent } from './table.search.component';

fdescribe('TableSearchComponent', () => {
  let tableSearch: ContainerTemplate;
  let field: FieldTemplate;
  let button: ButtonTemplate;
  let session: BlueriqTestSession;
  let component: ComponentFixture<TableSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableSearchComponent],
      providers: [
        BlueriqComponents.register([TableSearchComponent]),
      ],
      imports: [
        MaterialModule,
        NoopAnimationsModule,
        BlueriqTestingModule,
        FormsModule,
      ],
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

  });

  it('should render', () => {
    session = BlueriqSessionTemplate.create().build(tableSearch);
    component = session.get(TableSearchComponent);

    expect(component.nativeElement.querySelector('mat-label').innerText).toBe('Zoeken');
    expect(component.nativeElement.querySelector('mat-chip-list')).toBeTruthy();
    expect(component.nativeElement.querySelector('mat-chip')).toBeFalsy();
  });

  it('should render multiple chips', () => {
    field.value(['term1', 'term2', 'term3']);
    session = BlueriqSessionTemplate.create().build(tableSearch);
    component = session.get(TableSearchComponent);

    expect(component.nativeElement.querySelectorAll('mat-chip').length).toBe(3);
  });

  it('should add a search term', () => {
    session = BlueriqSessionTemplate.create().build(tableSearch);
    component = session.get(TableSearchComponent);

    const searchInput = component.nativeElement.querySelector('input');

    component.componentInstance.add({ 'input': searchInput, 'value': 'term1' });
    expect(component.componentInstance.searchTerms.length).toBe(1);
  });

  it('should not add a search term if a term with different casing is already present', () => {
    session = BlueriqSessionTemplate.create().build(tableSearch);
    component = session.get(TableSearchComponent);

    const searchInput = component.nativeElement.querySelector('input');

    component.componentInstance.add({ 'input': searchInput, 'value': 'term1' });
    expect(component.componentInstance.searchTerms.length).toBe(1);
    component.componentInstance.add({ 'input': searchInput, 'value': 'TERM1' });
    expect(component.componentInstance.searchTerms.length).toBe(1);
  });

  it('should remove a search term', () => {
    field.value(['term1', 'term2', 'term3']);
    session = BlueriqSessionTemplate.create().build(tableSearch);
    component = session.get(TableSearchComponent);

    const searchInput = component.nativeElement.querySelector('input');
    expect(component.componentInstance.searchTerms.length).toBe(3);

    component.componentInstance.remove('term2');
    expect(component.componentInstance.searchTerms.length).toBe(2);
  });

  it('should remove a search term even in different casing', () => {
    field.value(['term1', 'term2', 'term3']);
    session = BlueriqSessionTemplate.create().build(tableSearch);
    component = session.get(TableSearchComponent);

    const searchInput = component.nativeElement.querySelector('input');
    expect(component.componentInstance.searchTerms.length).toBe(3);

    component.componentInstance.remove('TERM2');
    expect(component.componentInstance.searchTerms.length).toBe(2);
  });

  it('should not add an empty search term', () => {
    field.value(['term1', 'term2', 'term3']);
    session = BlueriqSessionTemplate.create().build(tableSearch);
    component = session.get(TableSearchComponent);
    const searchInput = component.nativeElement.querySelector('input');

    component.componentInstance.add({ 'input': searchInput, 'value': '' });
    expect(component.componentInstance.searchTerms.length).toBe(3);

  });

});
