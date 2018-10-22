import { Filter, FilterOption, FilterValue, List, TableColumn } from '@blueriq/angular/lists';
import { of } from 'rxjs';
import { TableHeaderColumnComponent } from './header.component';

describe('TableHeaderColumnComponent', () => {

  let headerComponent: TableHeaderColumnComponent;

  fdescribe('filtering', () => {

    let listSpy: List;
    let filterSpy: Filter;
    let columnSpy;

    beforeEach(() => {
      filterSpy = jasmine.createSpyObj<Filter>(['addFilter']);
      filterSpy.filterValues = [];
      listSpy = { filter$: of(filterSpy) } as any;
      const filterOption = new FilterOption();
      filterOption.title = 'age';
      const filterValue = new FilterValue();
      filterValue.selectedOption = filterOption;
      filterSpy.filterValues.push(filterValue);
      headerComponent = new TableHeaderColumnComponent(listSpy);
      columnSpy = jasmine.createSpyObj<TableColumn>('TableColumn', ['cellFor']);
      headerComponent.column = columnSpy;
    });

    it('column without filtering', (done) => {
      let isColumnFiltered!: boolean;
      headerComponent.isColumnFiltered$.subscribe(isFiltered => {
        isColumnFiltered = isFiltered;
        done();
      }).unsubscribe();

      // verify
      expect(isColumnFiltered).toBe(false);
    });

    it('column with filtering', (done) => {
      // Setup
      // Set column age so the (which is also filtered on) so filtering results in true
      const column: TableColumn | any = {
        header: {
          name: 'age'
        }
      };
      headerComponent.column = column;
      let isColumnFiltered!: boolean;
      headerComponent.isColumnFiltered$.subscribe(isFiltered => {
        isColumnFiltered = isFiltered;
        done();
      }).unsubscribe();

      // verify
      expect(isColumnFiltered).toBe(true);
    });

  });

  fdescribe('sorting', () => {

//   let button: ButtonTemplate;
//   let session: BlueriqTestSession;
//   let component: ComponentFixture<TableSortComponent>;
//
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [
//         NoopAnimationsModule,
//         BlueriqTestingModule,
//         ListModule
//       ]
//     });

    //   beforeEach(() => {
//     button = ButtonTemplate.create().styles('sort');
//     session = BlueriqSessionTemplate.create().build(button);
//     component = session.get(TableSortComponent);
//     component.autoDetectChanges();
//   });
//
//   it('should display the right material icon', () => {
//     let iconElement = component.debugElement.query(By.css('.material-icons')).nativeElement;
//     let currentIcon = component.componentInstance.getIconByDirection();
//     expect(iconElement).not.toContain('arrow_upward');
//     expect(iconElement).not.toContain('arrow_downward');
//     expect(currentIcon).toBe('');
//
//     session.update(
//       button.styles('icon', 'descending')
//     );
//     iconElement = component.nativeElement.querySelector('.material-icons').innerHTML;
//     currentIcon = component.componentInstance.getIconByDirection();
//     expect(iconElement).toContain('arrow_upward');
//     expect(currentIcon).toBe('arrow_upward');
//
//     session.update(
//       button.styles('icon', 'ascending')
//     );
//     iconElement = component.nativeElement.querySelector('.material-icons').innerHTML;
//     currentIcon = component.componentInstance.getIconByDirection();
//     expect(iconElement).toContain('arrow_downward');
//     expect(currentIcon).toBe('arrow_downward');
//   });
//
//   it('should have a working hovering', () => {
//     let isHovering = component.componentInstance.hovering;
//     let currentIcon = component.componentInstance.getIconByDirection();
//     expect(isHovering).toBeFalsy();
//     expect(currentIcon).toBe('');
//
//     fireEvent(component.nativeElement.querySelector('.material-icons'), 'mouseenter');
//     isHovering = component.componentInstance.hovering;
//     currentIcon = component.componentInstance.getIconByDirection();
//     expect(isHovering).toBeTruthy();
//     expect(currentIcon).toBe('arrow_downward');
//
//     fireEvent(component.nativeElement.querySelector('.material-icons'), 'mouseleave');
//     isHovering = component.componentInstance.hovering;
//     currentIcon = component.componentInstance.getIconByDirection();
//     expect(isHovering).toBeFalsy();
//     expect(currentIcon).toBe('');
//   });

    function fireEvent(element, event) {
      if (element.fireEvent) {
        element.fireEvent('on' + event);
      } else {
        const evObj = document.createEvent('Events');
        evObj.initEvent(event, true, false);
        element.dispatchEvent(evObj);
      }
    }
  });

});

