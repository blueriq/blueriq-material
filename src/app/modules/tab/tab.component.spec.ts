import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqComponents } from '@blueriq/angular';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { ContainerTemplate } from '@blueriq/core/testing';
import { BqContentStyles } from '../BqContentStyles';
import { ContainerComponent } from '../container/container.component';
import { HorizontalFlexChildDirective } from '../container/horizontal-flex-child.directive';
import { TabComponent } from './tab.component';
import { TabModule } from './tabs.module';

describe('TabComponent', () => {

  let tabTemplate: ContainerTemplate;
  let session: BlueriqTestSession;
  let tabFixture: ComponentFixture<TabComponent>;
  let tabComponent: TabComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContainerComponent, HorizontalFlexChildDirective],
      providers: [BlueriqComponents.register([ContainerComponent])],
      imports: [
        NoopAnimationsModule,
        BlueriqTestingModule,
        TabModule
      ]
    });
    tabTemplate = ContainerTemplate.create('someTab')
    .contentStyle(BqContentStyles.TAB)
    .displayName('Tweakers')
    .children(
      ContainerTemplate.create('tab1').displayName('News'),
      ContainerTemplate.create('tab2').displayName('Reviews'),
      ContainerTemplate.create('tab3').displayName('Pricewatch'),
      ContainerTemplate.create('tab4')
    );
    session = BlueriqSessionTemplate.create().build(tabTemplate);
    tabFixture = session.get(TabComponent);
    tabComponent = tabFixture.componentInstance;

  });

  it('should display the displayname', () => {
    expect(tabFixture.nativeElement.querySelector('h2').innerHTML).toBe('Tweakers');
  });

  it('should display the correct tab headers', () => {
    const matHeaderLabels = tabFixture.nativeElement.querySelectorAll('.mat-tab-label');

    expect(matHeaderLabels.length).toBe(4);
    expect(matHeaderLabels[0].innerText).toEqual('News'); // mat-tab-label-content
    expect(matHeaderLabels[1].innerText).toEqual('Reviews');
    expect(matHeaderLabels[2].innerText).toEqual('Pricewatch');
    expect(matHeaderLabels[3].innerText).toEqual('tab4');
  });

  it('should have 4 containers rendered', () => {
    const tabBodies = tabFixture.nativeElement.querySelectorAll('mat-tab-body');

    expect(tabBodies.length).toBe(4);
    expect(tabBodies[0].querySelector('bq-container')).toBeTruthy('The first container should be displayed');
  });
});
