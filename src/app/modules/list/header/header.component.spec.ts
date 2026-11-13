import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableColumn } from '@blueriq/angular/lists';
import { TableHeaderColumnComponent } from './header.component';

describe('TableHeaderColumnComponent', () => {

  let fixture: ComponentFixture<TableHeaderColumnComponent>;
  let headerComponent: TableHeaderColumnComponent;

  describe('sorting', () => {

    beforeEach(() => {
      TestBed.overrideComponent(TableHeaderColumnComponent, { set: { imports: [], template: '' } });
      fixture = TestBed.createComponent(TableHeaderColumnComponent);
      headerComponent = fixture.componentInstance;
    });

    it('should display no material icon if ordering is unavailable', () => {
      fixture.componentRef.setInput('column', { ordering: 'unavailable' } as TableColumn);
      const currentIcon = headerComponent.getIconByDirection();
      expect(currentIcon).toBe('');
    });

    it('should choose a ascending icon even when not ordering, as that will be shown on hover', () => {
      fixture.componentRef.setInput('column', { ordering: 'none' } as TableColumn);
      const currentIcon = headerComponent.getIconByDirection();
      expect(currentIcon).toBe('arrow_upward');
    });

    it('should display the right material icon if direction is descending', () => {
      fixture.componentRef.setInput('column', { ordering: 'descending' } as TableColumn);
      const currentIcon = headerComponent.getIconByDirection();
      expect(currentIcon).toBe('arrow_downward');
    });

    it('should display the right material icon if direction is ascending', () => {
      fixture.componentRef.setInput('column', { ordering: 'ascending' } as TableColumn);
      const currentIcon = headerComponent.getIconByDirection();
      expect(currentIcon).toBe('arrow_upward');
    });

  });

});
