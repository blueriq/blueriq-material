import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { ContainerTemplate } from '@blueriq/core/testing';
import { BqContentStyles } from '../BqContentStyles';
import { ExpansionComponent } from './expansion.component';
import { provideContainerComponents } from '../container/container.providers';
import { provideExpansionComponents } from './expansion.providers';

describe('ExpansionComponent', () => {

  let containerTemplate: ContainerTemplate;
  let session: BlueriqTestSession;
  let containerFixture: ComponentFixture<ExpansionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideContainerComponents(), provideExpansionComponents()],
      imports: [
        NoopAnimationsModule,
        BlueriqTestingModule,
      ],
    }).compileComponents();
    containerTemplate = ContainerTemplate.create('Main')
      .contentStyle(BqContentStyles.EXPANSION)
      .displayName('Main')
      .children(
        ContainerTemplate.create('hello1').displayName('Hello 1'),
        ContainerTemplate.create('hello2').displayName('Hello 2'),
        ContainerTemplate.create('hello3').displayName('Hello 3'),
      );
    session = BlueriqSessionTemplate.create().build(containerTemplate);
    containerFixture = session.get(ExpansionComponent);
  });

  it('should display the correct panel titles', () => {
    const matHeaderTitles = containerFixture.nativeElement.querySelectorAll('mat-panel-title');

    expect(matHeaderTitles.length).toBe(3);
    expect(matHeaderTitles[0].textContent).toEqual('Hello 1');
    expect(matHeaderTitles[1].textContent).toEqual('Hello 2');
    expect(matHeaderTitles[2].textContent).toEqual('Hello 3');
  });

  it('should have 3 panels rendered', () => {
    const containerPanels = containerFixture.nativeElement.querySelectorAll('mat-expansion-panel');

    expect(containerPanels.length).toBe(3);
  });

});
