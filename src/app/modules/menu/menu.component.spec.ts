import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatMenuTrigger } from '@angular/material';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { ButtonTemplate, ContainerTemplate } from '@blueriq/core/testing';
import { MenuComponent } from './menu.component';
import { MenuModule } from './menu.module';

describe('MenuComponent', () => {
    let menu: ContainerTemplate;
    let component: ComponentFixture<MenuComponent>;
    let session: BlueriqTestSession;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        // declarations: [ButtonComponent],
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

      menu.children(
        ContainerTemplate.create().contentStyle('menubar').children(
          ButtonTemplate.create('Home').caption('Home'),
          ContainerTemplate.create().displayName('Unit').children(
            ButtonTemplate.create('Core').caption('Core'),
            ButtonTemplate.create('Finance').caption('Finance'),
            ContainerTemplate.create().displayName('Public').children(
              ButtonTemplate.create('Public').caption('Public-A'),
              ButtonTemplate.create('Public').caption('Public-B')
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
        const subMenu = component.debugElement.query(By.css('.mat-menu-content')).nativeElement;
        const menuOptions = subMenu.querySelectorAll('bq-menu-item') as NodeListOf<HTMLElement>;

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
          const subMenu = component.debugElement.queryAll(By.css('.mat-menu-content'))[1].nativeElement;
          const menuOptions = subMenu.querySelectorAll('bq-menu-item') as NodeListOf<HTMLElement>;

          // verify
          expect(menuOptions.length).toBe(2);
          expect(menuOptions[0].innerText.trim()).toBe('PUBLIC-A');
          expect(menuOptions[1].innerText.trim()).toBe('PUBLIC-B');
        });
      });
    });
  }
);
