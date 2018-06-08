///<reference path="../../../../../node_modules/@types/jasmine/index.d.ts"/>
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqComponents, BlueriqModule } from '@blueriq/angular';
import { Table } from '@blueriq/angular/lists';
import { BlueriqSessionTemplate, BlueriqTestingModule } from '@blueriq/angular/testing';
import { BlueriqTestSession } from '@blueriq/angular/testing/src/test_session';
import { ButtonTemplate, ContainerTemplate, FieldTemplate, TextItemTemplate } from '@blueriq/core/testing';
import { ElementComponent } from '../../generic/element/element.component';
import { ButtonComponent } from '../button/button.component';
import { MaterialModule } from '../material/material.module';
import { TextItemComponent } from '../textitem/textitem.component';
import { TableComponent } from './table.component';
import { TableReadonlyComponent } from './table.readonly.component';

fdescribe('TableComponent', () => {
  let tableTemplate: ContainerTemplate;
  let session: BlueriqTestSession;
  let component: ComponentFixture<TableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableComponent, TableReadonlyComponent, ElementComponent
        , TextItemComponent, ButtonComponent],
      providers: [BlueriqComponents.register([TableComponent, TableReadonlyComponent,
        TextItemComponent, ButtonComponent]), Table],
      imports: [
        MaterialModule,
        BrowserAnimationsModule, // or NoopAnimationsModule
        BlueriqModule.forRoot(), // TODO delete me
        BlueriqTestingModule,
        FormsModule,
      ],
    });
  }));

  beforeEach(() => {
    // Create a ElementComponent  based on a TableComponent.
    tableTemplate = ContainerTemplate.create();
    tableTemplate.contentStyle('table');
    tableTemplate.children(
      ///////////// HEADER ////////////
      ContainerTemplate
      .create('header')
      .contentStyle('tablerow')
      .children(
        ContainerTemplate
        .create('cell')
        .contentStyle('tableheader')
        .children(
          TextItemTemplate.create('Name').plainText('Name'), // type: textitem
          ButtonTemplate.create('sort_%s0').styles('sort', 'descending'),
        ),
      ),
      ///////////// ROW ////////////
      ContainerTemplate
      .create('row')
      .contentStyle('tablerow')
      .children(
        ContainerTemplate
        .create('cell')
        .contentStyle('tablecell')
        .children(
          TextItemTemplate.create('Name2').plainText('Name2'), // type: textitem
          FieldTemplate.text('column0').value('Mike').readonly(true),
        ),
      ),
    );
    session = BlueriqSessionTemplate.create().build(tableTemplate);
    component = session.get(TableComponent);
  });

  it('should have a filter', () => {
    // component.componentInstance.table.columnNames$.subscribe((e) => console.log(e));
    // component.componentInstance.table.rows$.subscribe((e) => console.log(e));
    // component.componentInstance.table.columns$.subscribe((e) => console.log(e));
    // console.log(component.nativeElement);
    expect(component).toBeTruthy();
  });
  // Columns aanwezig in DOM?
  // Columns aanwezig

  function getTableHeaderRow() {
    return getTableRow('header', 'tableheader');
  }

  function getTableBodyRow() {
    return getTableRow('row', 'tablecell');
  }

  function getTableRow(name, cell) {
    const tableRow = ContainerTemplate.create(name).contentStyle('tablerow');
    tableRow.children(getTableCell(0, cell));
    return tableRow;
  }

  function getTableCell(index, contentStyle) {
    const tableCell = ContainerTemplate.create('cell').contentStyle(contentStyle); // or tablesortedheader
    tableCell.children(
      TextItemTemplate.create('Name'), // type: textitem
      ButtonTemplate.create('sort_%s' + index).styles('sort', 'descending'), // type: button
    );
    return tableCell;
  }

  function paste() {
    ContainerTemplate
    .create('header')
    .contentStyle('tablerow')
    .children(
      ContainerTemplate
      .create('cell')
      .contentStyle('tableheader')
      .children(
        TextItemTemplate.create('Name'), // type: textitem
        ButtonTemplate.create('sort_%s0').styles('sort', 'descending'),
      ),
    );
  }

});
