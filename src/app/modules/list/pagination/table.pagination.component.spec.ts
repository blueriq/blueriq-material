import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqSessionTemplate, BlueriqTestingModule } from '@blueriq/angular/testing';
import { BlueriqTestSession } from '@blueriq/angular/testing/src/test_session';
import { AssetTemplate, ButtonTemplate, ContainerTemplate, FieldTemplate } from '@blueriq/core/testing';
import { ListComponent } from '../list.component';
import { ListModule } from '../list.module';
import { TablePaginationComponent } from './table.pagination.component';

describe('TablePaginationComponent', () => {
  const LABEL = '.mat-paginator-range-label';
  const NAVIGATION_PREVIOUS = '.mat-paginator-navigation-previous';
  const NAVIGATION_NEXT = '.mat-paginator-navigation-next';
  const NAVIGATION_LAST = '.mat-paginator-navigation-last';
  const NAVIGATION_FIRST = '.mat-paginator-navigation-first';

  let session: BlueriqTestSession;
  let component: ComponentFixture<ListComponent>;

  let btnFirst: ButtonTemplate;
  let btnLast: ButtonTemplate;
  let btnPrevious: ButtonTemplate;
  let currentPageNumber: FieldTemplate;
  let btnNext: ButtonTemplate;
  let pagingSelector: ContainerTemplate;
  let prefixAsset: AssetTemplate;
  let suffixAsset: AssetTemplate;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        BlueriqTestingModule,
        ListModule,
      ],
    });
  });

  describe('by InstanceList', () => {
    beforeEach(() => {
      btnFirst = ButtonTemplate.create('first')
      .caption('<<')
      .disabled(true)
      .styles('pagination');

      btnPrevious = ButtonTemplate.create('previous')
      .caption('<')
      .disabled(true)
      .styles('pagination');

      currentPageNumber = FieldTemplate.integer('InstanceListContainer_currentPageNumber')
      .domain({ 1: '1', 2: '2', 3: '3' })
      .styles('paginationNumber')
      .value('1');

      btnNext = ButtonTemplate.create('next')
      .caption('>')
      .styles('pagination');

      btnLast = ButtonTemplate.create('last')
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
        btnLast,
      );
      const table = ContainerTemplate.create().contentStyle('table');
      const list = ContainerTemplate.create().children(table, pagination);
      session = BlueriqSessionTemplate.create().build(list);
      component = session.get(ListComponent);
    });
    executedSharedTests();
  });

  describe('by Aggregatelist', () => {
    beforeEach(() => {
      btnFirst = ButtonTemplate.create('first')
      .caption('<<')
      .disabled(true)
      .styles('pagination');

      btnPrevious = ButtonTemplate.create('prev')
      .caption('<')
      .disabled(true)
      .styles('pagination');

      prefixAsset = AssetTemplate.create().text('Page ');
      currentPageNumber = FieldTemplate.integer('pageSelector').value('1');
      suffixAsset = AssetTemplate.create().text(' of 3');

      pagingSelector = ContainerTemplate.create('pagingSelector').children(
        prefixAsset,
        currentPageNumber,
        suffixAsset,
      );

      btnNext = ButtonTemplate.create('next')
      .caption('>')
      .styles('pagination');

      btnLast = ButtonTemplate.create('last')
      .caption('>>')
      .styles('pagination');

      const pagination = ContainerTemplate.create()
      .name('list_footer')
      .displayName('DisplayName')
      .contentStyle('listplus_footer')
      .children(
        btnFirst,
        btnPrevious,
        pagingSelector,
        btnNext,
        btnLast,
      );
      const table = ContainerTemplate.create().contentStyle('table');
      const list = ContainerTemplate.create().children(table, pagination);
      session = BlueriqSessionTemplate.create().build(list);
      component = session.get(ListComponent);
    });
    executedSharedTests();
  });

  describe('by case and worklist', () => {
    beforeEach(() => {
      btnFirst = ButtonTemplate.create('first')
      .caption('<<')
      .disabled(true)
      .styles('pagination');

      btnPrevious = ButtonTemplate.create('previous')
      .caption('<')
      .disabled(true)
      .styles('pagination');

      prefixAsset = AssetTemplate.create().text('Page ');
      currentPageNumber = FieldTemplate.integer('pageSelector').value('1');
      suffixAsset = AssetTemplate.create().text(' of 3');

      pagingSelector = ContainerTemplate.create('pagingSelector').children(
        prefixAsset,
        currentPageNumber,
        suffixAsset,
      );

      btnNext = ButtonTemplate.create('next')
      .caption('>')
      .styles('pagination');

      btnLast = ButtonTemplate.create('last')
      .caption('>>')
      .styles('pagination');

      const pagination = ContainerTemplate.create()
      .name('navigationContainer')
      .displayName('DisplayName')
      .styles('navigationContainer')
      .contentStyle('listplus_footer')
      .children(
        btnFirst,
        btnPrevious,
        pagingSelector,
        btnNext,
        btnLast,
      );
      const table = ContainerTemplate.create().contentStyle('table');
      const list = ContainerTemplate.create().children(table, pagination);
      session = BlueriqSessionTemplate.create().build(list);
      component = session.get(ListComponent);
    });
    executedSharedTests();
  });

  function executedSharedTests() {
    describe('should', () => {

      it('have a firstpage that cannot navigate to previous page', () => {
        const pageLabel = component.nativeElement.querySelector(LABEL).innerHTML;
        const previousButton = component.nativeElement.querySelector(NAVIGATION_PREVIOUS);
        const nextButton = component.nativeElement.querySelector(NAVIGATION_NEXT);
        const lastButton = component.nativeElement.querySelector(NAVIGATION_LAST);
        const firstButton = component.nativeElement.querySelector(NAVIGATION_FIRST);

        // Verify
        expect(pageLabel).toBe('Page 1 of 3');
        expect(previousButton.hasAttribute('disabled')).toBeTruthy();
        expect(nextButton.hasAttribute('disabled')).toBeFalsy();
        expect(lastButton.hasAttribute('disabled')).toBeFalsy();
        expect(firstButton.hasAttribute('disabled')).toBeTruthy();
      });

      it('have a middle page that can navigate', () => {
        // Setup second(middle) page
        session.update(currentPageNumber.value('2'),
          btnNext.disabled(false),
          btnPrevious.disabled(false),
          btnFirst.disabled(false),
          btnLast.disabled(false),
        );

        const pageLabel = component.nativeElement.querySelector(LABEL).innerHTML;
        const previousButton = component.nativeElement.querySelector(NAVIGATION_PREVIOUS);
        const nextButton = component.nativeElement.querySelector(NAVIGATION_NEXT);
        const lastButton = component.nativeElement.querySelector(NAVIGATION_LAST);
        const firstButton = component.nativeElement.querySelector(NAVIGATION_FIRST);

        // Verify
        expect(pageLabel).toBe('Page 2 of 3');
        expect(previousButton.hasAttribute('disabled')).toBeFalsy();
        expect(nextButton.hasAttribute('disabled')).toBeFalsy();
        expect(lastButton.hasAttribute('disabled')).toBeFalsy();
        expect(firstButton.hasAttribute('disabled')).toBeFalsy();
      });

      it('have a last page that cannot navigate forward', () => {
        // Setup Last page
        session.update(currentPageNumber.value('3'),
          btnPrevious.disabled(false),
          btnNext.disabled(true),
          btnFirst.disabled(false),
          btnLast.disabled(true),
        );

        const pageLabel = component.nativeElement.querySelector(LABEL).innerHTML;
        const previousButton = component.nativeElement.querySelector(NAVIGATION_PREVIOUS);
        const nextButton = component.nativeElement.querySelector(NAVIGATION_NEXT);
        const lastButton = component.nativeElement.querySelector(NAVIGATION_LAST);
        const firstButton = component.nativeElement.querySelector(NAVIGATION_FIRST);

        // Verify
        expect(pageLabel).toBe('Page 3 of 3');
        expect(previousButton.hasAttribute('disabled')).toBeFalsy();
        expect(nextButton.hasAttribute('disabled')).toBeTruthy();
        expect(lastButton.hasAttribute('disabled')).toBeTruthy();
        expect(firstButton.hasAttribute('disabled')).toBeFalsy();
      });
    });
  }

});
