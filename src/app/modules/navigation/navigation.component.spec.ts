import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { ButtonTemplate, ContainerTemplate } from '@blueriq/core/testing';
import { BqContentStyles } from '../BqContentStyles';
import { NavigationItemComponent } from './navigation-item/navigation-item.component';
import { NavigationComponent } from './navigation.component';
import { NavigationModule } from './navigation.module';

describe('NavigationComponent', () => {
  let navigationTemplate: ContainerTemplate;
  let fixture: ComponentFixture<NavigationComponent>;
  let session: BlueriqTestSession;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        BlueriqTestingModule,
        NavigationModule,
      ],
    }).compileComponents();

    navigationTemplate = ContainerTemplate.create().contentStyle(BqContentStyles.NAVIGATION_MENU).children(
        createButton('Page 1 [Complete]', 'complete'),
        createButton('Page 2 [Complete]', 'complete'),
        createButton('Page 3 [Incomplete]', 'incomplete'),
        createButton('Page 4 [Incomplete]', 'incomplete', true),
        createButton('Page 5 [Incomplete]', 'incomplete', false, true),
        createButton('Page 6'),
    );

    session = BlueriqSessionTemplate.create().build(navigationTemplate);
    fixture = session.get(NavigationComponent);
    fixture.detectChanges();
  });

  it('should render its content correctly', () => {
    const navigationItems = fixture.nativeElement.querySelectorAll('bq-navigation-item');
    expect(navigationItems.length).toBe(6);
    expect(navigationItems[0].querySelector('mat-icon').innerText).toBe('check');
    expect(navigationItems[0].querySelector('button.mat-primary')).toBeTruthy();
    expect(navigationItems[0].querySelector('button').disabled).toBeFalsy();

    expect(navigationItems[1].querySelector('mat-icon').innerText).toBe('check');
    expect(navigationItems[1].querySelector('button.mat-primary')).toBeTruthy();
    expect(navigationItems[1].querySelector('button').disabled).toBeFalsy();

    expect(navigationItems[2].querySelector('mat-icon').innerText).toBe('priority_high');
    expect(navigationItems[2].querySelector('button.mat-primary')).toBeTruthy();
    expect(navigationItems[2].querySelector('button').disabled).toBeFalsy();

    expect(navigationItems[3].querySelector('mat-icon').innerText).toBe('priority_high');
    expect(navigationItems[3].querySelector('button.mat-primary')).toBeTruthy();
    expect(navigationItems[3].querySelector('button').disabled).toBeFalsy();

    expect(navigationItems[4].querySelector('mat-icon').innerText).toBe('priority_high');
    expect(navigationItems[4].querySelector('button.mat-primary')).toBeTruthy();
    expect(navigationItems[4].querySelector('button').disabled).toBeTruthy();

    expect(navigationItems[5].querySelector('mat-icon')).toBeFalsy();
    expect(navigationItems[5].querySelector('button.mat-primary')).toBeFalsy();
    expect(navigationItems[5].querySelector('button').disabled).toBeFalsy();
  });

  it('should set the correct states', () => {
    const buttons = fixture.debugElement.queryAll(By.directive(NavigationItemComponent))
    .map(item => item.componentInstance) as NavigationItemComponent[];
    expect(fixture.componentInstance.buttons.length).toBe(6);
    expect(buttons.length).toBe(6);
    expect(buttons[0].state).toBe('complete');
    expect(buttons[1].state).toBe('complete');
    expect(buttons[2].state).toBe('incomplete');
    expect(buttons[3].state).toBe('incomplete');
    expect(buttons[4].state).toBe('incomplete');
    expect(buttons[5].state).toBeUndefined();
  });

});

function createButton(caption: string, state?: 'complete' | 'incomplete', isActive?: boolean, isBlocked?: boolean): ButtonTemplate {
  return ButtonTemplate.create().caption(caption).properties({
    'status': state,
    'active': isActive,
    'blocked': isBlocked,
  });
}
