import { ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatMenuTrigger } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqSession } from '@blueriq/angular';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { ButtonTemplate, ContainerTemplate } from '@blueriq/core/testing';
import { MenuComponent } from './menu.component';
import { MenuModule } from './menu.module';

export class TestTrigger {
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  open() {
    this.trigger.openMenu();
  }
}

describe('MenuComponent', () => {
    let menu: ContainerTemplate;
    let unitMenu: ContainerTemplate;
    let component: ComponentFixture<MenuComponent>;
    let session: BlueriqTestSession;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        // declarations: [ButtonComponent],
        imports: [
          MenuModule,
          BrowserAnimationsModule, // or NoopAnimationsModule
          BlueriqTestingModule,
          FormsModule
        ]
      });
    }));

    beforeEach(() => {
      menu = ContainerTemplate.create().contentStyle('dashboard_menu');
      unitMenu = ContainerTemplate.create();

      menu.children(
        ContainerTemplate.create().contentStyle('menubar').children(
          ButtonTemplate.create('Home').caption('Home'),
          unitMenu.displayName('Unit').children(
            ButtonTemplate.create('Core').caption('Core'),
            ButtonTemplate.create('Finance').caption('Finance'),
            ButtonTemplate.create('Public').caption('Public'))
        )
      );
      // reset field to default
      session = BlueriqSessionTemplate.create().build(menu);
      component = session.get(MenuComponent);
    });

    it('should create menu', () => {
      expect(component).toBeTruthy();
    });

    // test 1: dat buttons onClick event aangeroepen wordt EN een spy dat session.pressed aangeroepen wordt.
    // zo kunnen we garanderen dat navigeren werkt
    fit('should call the session when it gets clicked', () => {
      spyOn(BlueriqSession.prototype, 'pressed');
      TestTrigger.prototype.open();
      // expect(BlueriqSession.prototype.pressed).not.toHaveBeenCalled();
      expect(BlueriqSession.prototype.pressed).toHaveBeenCalledTimes(1);

    });
  }

// test 2: dat een container met knoppen en daarin weer containers uiteindelijk weer gerenderd wordt,
// ze test je de recursie

// test 3: simpele test, alle items zijn gerenderd. (A | B | C | D->D1 )

);
