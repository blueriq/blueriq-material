import { DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, waitForAsync } from '@angular/core/testing';
import { MatMenuTrigger } from '@angular/material/menu';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqSession } from '@blueriq/angular';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { ButtonTemplate, ContainerTemplate } from '@blueriq/core/testing';
import { BqContentStyles } from '../BqContentStyles';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { MenuComponent } from './menu.component';
import { MenuModule } from './menu.module';

describe('MenuComponent', () => {
    let menu: ContainerTemplate;
    let btnPublicA: ButtonTemplate;
    let btnPublicB: ButtonTemplate;
    let component: ComponentFixture<MenuComponent>;
    let session: BlueriqTestSession;

    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          NoopAnimationsModule,
          BlueriqTestingModule,
          MenuModule,
        ],
      });
    }));

    beforeEach(() => {
      menu = ContainerTemplate.create().contentStyle(BqContentStyles.DASHBOARD_MENU);
      btnPublicA = ButtonTemplate.create('Public').caption('Public-A');
      btnPublicB = ButtonTemplate.create('Public').caption('Public-B');
      menu.children(
        ContainerTemplate.create().contentStyle('menubar').children(
          ButtonTemplate.create('Home').caption('Home'),
          ContainerTemplate.create().displayName('Unit').children(
            ButtonTemplate.create('Core').caption('Core'),
            ButtonTemplate.create('Finance').caption('Finance').disabled(true),
            ContainerTemplate.create().displayName('Public').children(
              btnPublicA,
              btnPublicB,
            ),
          ),
        ),
      );
      // reset field to default
      session = BlueriqSessionTemplate.create().build(menu);
      component = session.get(MenuComponent);
    });

    it('buttons that are not a submenu should trigger the blueriq session pressed', (done) => {
      // retrieve the trigger
      const selectTrigger = component.debugElement.query(By.directive(MatMenuTrigger));

      // click on the menu button (via the trigger) to display the submenu
      selectTrigger.nativeElement.click();

      component.whenStable().then(() => {
        spyOn(BlueriqSession.prototype, 'pressed').and.callThrough();
        component.detectChanges();
        const setSubMenu1 = component.debugElement.query(By.css('.mat-menu-content')).nativeElement;
        const menuButtons = setSubMenu1.querySelectorAll('button:not(.mat-menu-item-submenu-trigger)');
        expect(menuButtons.length).toBe(2);
        menuButtons[0].click();
        menuButtons[1].click(); // is disabled
        expect(BlueriqSession.prototype.pressed).toHaveBeenCalledTimes(1);
        done();
      });
    });

    it('should display submenus when the menu button is clicked', () => {
      // by default, no submenus are shown
      const subMenu = component.debugElement.query(By.css('.mat-menu-content'));
      expect(subMenu).toBeFalsy();

      // retrieve the trigger
      const selectTrigger = component.debugElement.query(By.directive(MatMenuTrigger));
      expect(selectTrigger).toBeTruthy();

      // click on the menu button (via the trigger) to display the submenu
      selectTrigger.nativeElement.click();

      component.whenStable().then(() => {
        component.detectChanges();
        const setSubMenu1 = component.debugElement.query(By.css('.mat-menu-content')).nativeElement;
        const menuOptions = setSubMenu1.querySelectorAll('bq-menu-item') as NodeListOf<HTMLElement>;

        // verify
        expect(menuOptions.length).toBe(3);
        expect(menuOptions[0].innerText.trim()).toBe('CORE');
        expect(menuOptions[1].innerText.trim()).toBe('FINANCE');
        expect(menuOptions[2].innerText.trim()).toBe('PUBLIC');

        // expand the following submenu by clicking the 'Public' button
        menuOptions[2].getElementsByTagName('button')[0].click();
        component.whenStable().then(() => {
          component.detectChanges();
          // now 2 mat-menu-content sections exist, we want to verify the last one with the sub-submenu
          const setSubMenu2 = component.debugElement.queryAll(By.css('.mat-menu-content'))[1].nativeElement;
          const setMenuOptions = setSubMenu2.querySelectorAll('bq-menu-item') as NodeListOf<HTMLElement>;
          // verify
          expect(setMenuOptions.length).toBe(2);
          expect(setMenuOptions[0].innerText.trim()).toBe('PUBLIC-A');
          expect(setMenuOptions[1].innerText.trim()).toBe('PUBLIC-B');
        });
      });
    });

    it('should navigate submenus with arrowkeys', fakeAsync(() => {
      const subMenu = component.debugElement.query(By.css('.mat-menu-content'));
      expect(subMenu).toBeFalsy();

      // retrieve the trigger
      const selectTrigger = component.debugElement.query(By.directive(MatMenuTrigger));
      expect(selectTrigger).toBeTruthy();

      // click on the menu button (via the trigger) to display the submenu
      selectTrigger.nativeElement.click();
      component.detectChanges();

      component.whenStable().then(() => {
        component.detectChanges();
        const menuItems: DebugElement[] = component.debugElement.queryAll(By.directive(MenuItemComponent));
        const arrowDownEvent = new KeyboardEvent('keydown', { key: 'ArrowDown' });
        const arrowUpEvent = new KeyboardEvent('keydown', { key: 'ArrowUp' });
        const arrowRightEvent = new KeyboardEvent('keydown', { key: 'ArrowRight' });

        const unitBtn = menuItems.find(el => {
          return el.nativeElement.innerText.includes('UNIT');
        });

        const publicBtn = menuItems.find(el => {
          return el.nativeElement.innerText.includes('PUBLIC');
        });

        expect(unitBtn).toBeTruthy();
        expect(publicBtn).toBeTruthy();

        if (unitBtn && publicBtn) {
          const unitChildBtns = unitBtn.queryAll(By.css('button'));
          const unitChildContainers = unitBtn.queryAll(By.css('.menu-list'));

          const unitBtnOnMenuKeyDown = spyOn(unitBtn.componentInstance, 'onMenuKeyDown').and.callThrough();
          const unitBtnFocusElement = spyOn(unitBtn.componentInstance, 'focusElement').and.callThrough();
          const publicBtnOnHandleEnterSubmenu = spyOn(publicBtn.componentInstance, 'handleEnterSubmenu')
          .and.callThrough();

          // elements that change focus
          const financeBtnItem = document.getElementsByName(unitChildBtns[2].nativeElement.name)[0];
          const coreBtnItem = document.getElementsByName(unitChildBtns[1].nativeElement.name)[0];
          const publicBtnItem = document.getElementsByName(unitChildContainers[1].nativeElement.name)[0];

          const financeBtnFocusSpy = spyOn(financeBtnItem, 'focus');
          const coreBtnFocusSpy = spyOn(coreBtnItem, 'focus');
          const publicBtnFocusSpy = spyOn(publicBtnItem, 'focus');

          // actual submenu buttons that trigger onMenuKeyDown
          const coreHtmlElement = document.getElementById('item0');
          const financeHtmlElement = document.getElementById('item1');
          const publicHtmlElement = document.getElementById('item2');

          expect(coreHtmlElement).toBeTruthy();
          expect(financeHtmlElement).toBeTruthy();
          expect(publicHtmlElement).toBeTruthy();

          if (coreHtmlElement && financeHtmlElement && publicHtmlElement) {
            // navigate submenu down and up
            coreHtmlElement.dispatchEvent(arrowDownEvent);
            flush();
            component.detectChanges();
            financeHtmlElement.dispatchEvent(arrowDownEvent);
            flush();
            component.detectChanges();
            publicHtmlElement.dispatchEvent(arrowUpEvent);
            flush();
            component.detectChanges();

            financeHtmlElement.dispatchEvent(arrowUpEvent);
            flush();
            component.detectChanges();

            // navigate again down to enter sub-sub menu
            coreHtmlElement.dispatchEvent(arrowDownEvent);
            flush();
            component.detectChanges();
            financeHtmlElement.dispatchEvent(arrowDownEvent);
            flush();
            component.detectChanges();

            publicBtnItem.dispatchEvent(arrowRightEvent);
            flush();
            component.detectChanges();

            expect(unitBtnOnMenuKeyDown).toHaveBeenCalledTimes(6);
            expect(unitBtnFocusElement).toHaveBeenCalledTimes(6);
            expect(financeBtnFocusSpy).toHaveBeenCalled();
            expect(coreBtnFocusSpy).toHaveBeenCalled();
            expect(publicBtnFocusSpy).toHaveBeenCalled();
            expect(publicBtnOnHandleEnterSubmenu).toHaveBeenCalled();
          }
        }
      });
    }));

    //

  },
);
