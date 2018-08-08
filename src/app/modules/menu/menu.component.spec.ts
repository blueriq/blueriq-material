import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatMenuTrigger } from '@angular/material';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqSession } from '@blueriq/angular';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { ButtonTemplate, ContainerTemplate } from '@blueriq/core/testing';
import { MenuComponent } from './menu.component';
import { MenuModule } from './menu.module';

describe('MenuComponent', () => {
    let menu: ContainerTemplate;
    let btnPublicA: ButtonTemplate;
    let btnPublicB: ButtonTemplate;
    let component: ComponentFixture<MenuComponent>;
    let session: BlueriqTestSession;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          MenuModule,
          NoopAnimationsModule,
          BlueriqTestingModule,
          FormsModule
        ]
      });
    }));

    beforeEach(() => {
      menu = ContainerTemplate.create().contentStyle('dashboard_menu');
      btnPublicA = ButtonTemplate.create('Public').caption('Public-A');
      btnPublicB = ButtonTemplate.create('Public').caption('Public-B');
      menu.children(
        ContainerTemplate.create().contentStyle('menubar').children(
          ButtonTemplate.create('Home').caption('Home'),
          ContainerTemplate.create().displayName('Unit').children(
            ButtonTemplate.create('Core').caption('Core'),
            ButtonTemplate.create('Finance').caption('Finance'),
            ContainerTemplate.create().displayName('Public').children(
              btnPublicA,
              btnPublicB
            )
          )
        )
      );
      // reset field to default
      session = BlueriqSessionTemplate.create().build(menu);
      component = session.get(MenuComponent);
    });

    it('should create menu', () => {
      expect(component).toBeTruthy();
    });

    it(' buttons that are not a submenu should trigger the blueriq session pressed', () => {
      // retrieve the trigger
      const selectTrigger = component.debugElement.query(By.directive(MatMenuTrigger));

      // click on the menu button (via the trigger) to display the submenu
      selectTrigger.nativeElement.click();

      component.whenStable()
      .then(() => {
        spyOn(BlueriqSession.prototype, 'pressed').and.callThrough();
        component.detectChanges();
        const setSubMenu1 = component.debugElement.query(By.css('.mat-menu-content')).nativeElement;
        const menuButtons = setSubMenu1.querySelectorAll('button:not(.mat-menu-item-submenu-trigger)');
        expect(menuButtons.length).toBe(2);
        menuButtons[0].click();
        menuButtons[1].click();
        expect(BlueriqSession.prototype.pressed).toHaveBeenCalledTimes(2);
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

      component.whenStable()
      .then(() => {
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
        component.whenStable()
        .then(() => {
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

    //

  }
);
