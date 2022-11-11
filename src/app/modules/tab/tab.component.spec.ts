import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { ContainerTemplate, FieldTemplate } from '@blueriq/core/testing';
import { BqContainerDirective } from '@shared/directive/container/bq-container.directive';
import { SharedModule } from '@shared/shared.module';
import { BqContentStyles } from '../BqContentStyles';
import { ContainerModule } from '../container/container.module';
import { TabComponent } from './tab.component';
import { TabModule } from './tabs.module';

describe('TabComponent', () => {

  let tabTemplate: ContainerTemplate;
  let session: BlueriqTestSession;
  let tabFixture: ComponentFixture<TabComponent>;
  let extraTab: ContainerTemplate;
  let tabField: FieldTemplate;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        BlueriqTestingModule,
        SharedModule,
        TabModule,
        ContainerModule,
      ],
    }).compileComponents();
    tabField = FieldTemplate.text('field');
    extraTab = ContainerTemplate.create().name('tab4').children(tabField);
    tabTemplate = ContainerTemplate.create('someTab')
    .contentStyle(BqContentStyles.TAB)
    .displayName('Tweakers')
    .children(
      ContainerTemplate.create('tab1').displayName('News'),
      ContainerTemplate.create('tab2').displayName('Reviews'),
      ContainerTemplate.create('tab3').displayName('Pricewatch'),
      extraTab,
    );
    session = BlueriqSessionTemplate.create().build(tabTemplate);
    tabFixture = session.get(TabComponent);
  });

  it('should display the correct tab headers', () => {
    const matHeaderLabels = tabFixture.nativeElement.querySelectorAll('.mat-tab-label');

    expect(matHeaderLabels.length).toBe(4);
    expect(matHeaderLabels[0].innerText).toEqual('News'); // mat-tab-label-content
    expect(matHeaderLabels[1].innerText).toEqual('Reviews');
    expect(matHeaderLabels[2].innerText).toEqual('Pricewatch');
    expect(matHeaderLabels[3].innerText).toEqual('[tab4]');
  });

  it('should have 4 containers rendered', () => {
    const tabBodies = tabFixture.nativeElement.querySelectorAll('mat-tab-body');

    expect(tabBodies.length).toBe(4);
    expect(tabBodies[0].querySelector('bq-container')).withContext('The first container should be displayed').toBeTruthy();
    const activeLabel = tabFixture.nativeElement.querySelector('.mat-tab-label-active');
    expect(activeLabel.innerText).withContext('First tab should be selected').toEqual('News', );
  });

  it('should use the bqContainer directive', () => {
    // Verify
    expect(tabFixture.debugElement.query(By.directive(BqContainerDirective))).toBeTruthy();
  });

  it('should use the bq-heading to display header', () => {
    // Verify
    expect(tabFixture.nativeElement.querySelector('bq-heading')).toBeTruthy();
  });

  it('should not show bq-heading within a mat-tab-group', () => {
    // init
    const tabBody = tabFixture.nativeElement.querySelector('.mat-tab-body');
    const tabBodyHeading = tabBody.querySelector('bq-heading');

    // Verify
    expect(tabBodyHeading).toBeFalsy();
  });

});
