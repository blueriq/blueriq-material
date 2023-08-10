import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { ContainerTemplate } from '@blueriq/core/testing';
import { SharedModule } from '@shared/shared.module';
import { BqContentStyles } from '../BqContentStyles';
import { ContainerModule } from '../container/container.module';
import { ExpansionComponent } from './expansion.component';
import { ExpansionModule } from './expansion.module';

describe('ExpansionComponent', () => {

  let containerTemplate: ContainerTemplate;
  let session: BlueriqTestSession;
  let containerFixture: ComponentFixture<ExpansionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        BlueriqTestingModule,
        SharedModule,
        ExpansionModule,
        ContainerModule,
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
    expect(matHeaderTitles[0].innerText).toEqual('Hello 1');
    expect(matHeaderTitles[1].innerText).toEqual('Hello 2');
    expect(matHeaderTitles[2].innerText).toEqual('Hello 3');
  });

  it('should have 3 panels rendered', () => {
    const containerPanels = containerFixture.nativeElement.querySelectorAll('mat-expansion-panel');

    expect(containerPanels.length).toBe(3);
  });

});
