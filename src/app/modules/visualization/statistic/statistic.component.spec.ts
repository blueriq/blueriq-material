import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { ContainerTemplate } from '@blueriq/core/testing';
import { BqContainerDirective } from '@shared/directive/container/bq-container.directive';
import { BqPresentationStyles } from '../../BqPresentationStyles';
import { VisualizationModule } from '../visualization.module';
import { StatisticComponent } from './statistic.component';

describe('StatisticComponent', () => {

  let container: ContainerTemplate;
  let component: ComponentFixture<StatisticComponent>;
  let session: BlueriqTestSession;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        BlueriqTestingModule,
        VisualizationModule,
      ],
    });
  }));

  describe('basic tests', () => {
    beforeEach(() => {
      container = createVisualizationContainer();
      session = BlueriqSessionTemplate.create().build(container);
      component = session.get(StatisticComponent);
    });

    it('chart should have a default type Doughnut', () => {
      expect(component.componentInstance.chart.config.type).toBe('doughnut');
    });

    it('chart should have the correct data', () => {
      // Init
      const datasets: any[] = component.componentInstance.chart.data.datasets;
      const data: string[] = datasets[0].data;

      // Verify
      expect(datasets.length).toBe(1);
      expect(data[0]).toBe('2');
      expect(data[1]).toBe('19');
      expect(data[2]).toBe('8');
      expect(data[3]).toBe('1');
    });

    it('chart should have the correct labels', () => {
      // Init
      const labels: string[] = component.componentInstance.chart.data.labels;

      // Verify
      expect(labels.length).toBe(4);
      expect(labels[0]).toBe('Age between 0-20');
      expect(labels[1]).toBe('Age between 20-40');
      expect(labels[2]).toBe('Age between 40-60');
      expect(labels[3]).toBe('Age greater than 60');
    });
  });

  it('should have a pie chart type when the pie presentation style is set', () => {
    container = createVisualizationContainer(BqPresentationStyles.STATISTICPIE);
    session = BlueriqSessionTemplate.create().build(container);
    component = session.get(StatisticComponent);
    expect(component.componentInstance.chart.config.type).toBe('pie');
  });

  it('should have a bar chart type when the bar presentation style is set', () => {
    container = createVisualizationContainer(BqPresentationStyles.STATISTICBAR);
    session = BlueriqSessionTemplate.create().build(container);
    component = session.get(StatisticComponent);
    expect(component.componentInstance.chart.config.type).toBe('bar');
  });

  it('should have a doughnut chart type when the doughnut presentation style is set', () => {
    container = createVisualizationContainer(BqPresentationStyles.STATISTICDOUGHNUT);
    session = BlueriqSessionTemplate.create().build(container);
    component = session.get(StatisticComponent);
    expect(component.componentInstance.chart.config.type).toBe('doughnut');
  });

  it('should have a radar chart type when the radar presentation style is set', () => {
    container = createVisualizationContainer(BqPresentationStyles.STATISTICRADAR);
    session = BlueriqSessionTemplate.create().build(container);
    component = session.get(StatisticComponent);
    expect(component.componentInstance.chart.config.type).toBe('radar');
  });

  it('should have a line chart type when the line presentation style is set', () => {
    container = createVisualizationContainer(BqPresentationStyles.STATISTICLINE);
    session = BlueriqSessionTemplate.create().build(container);
    component = session.get(StatisticComponent);
    expect(component.componentInstance.chart.config.type).toBe('line');
  });

  it('should have a polar chart type when the polar presentation style is set', () => {
    container = createVisualizationContainer(BqPresentationStyles.STATISTICPOLAR);
    session = BlueriqSessionTemplate.create().build(container);
    component = session.get(StatisticComponent);
    expect(component.componentInstance.chart.config.type).toBe('polarArea');
  });

  it('should use the bqContainer directive', () => {
    // Verify
    container = createVisualizationContainer(BqPresentationStyles.STATISTICPOLAR);
    session = BlueriqSessionTemplate.create().build(container);
    component = session.get(StatisticComponent);
    expect(component.debugElement.query(By.directive(BqContainerDirective))).toBeTruthy();
  });

  it('should use the bq-heading to display header', () => {
    // Verify
    container = createVisualizationContainer(BqPresentationStyles.STATISTICPOLAR);
    session = BlueriqSessionTemplate.create().build(container);
    component = session.get(StatisticComponent);
    expect(component.nativeElement.querySelector('bq-heading')).toBeTruthy();
  });

  function createVisualizationContainer(presentationStyle?: string) {
    const visualizationContainer = ContainerTemplate.create('myStatistics').contentStyle('visualization').children(
      createStatisticContainer('Age between 0-20', '2'), // In the sentence: 2 people are between 0-20
      createStatisticContainer('Age between 20-40', '19'),
      createStatisticContainer('Age between 40-60', '8'),
      createStatisticContainer('Age greater than 60', '1'),
    );
    if (presentationStyle) {
      visualizationContainer.styles(presentationStyle);
    }
    return visualizationContainer;
  }

  function createStatisticContainer(label, data) {
    return ContainerTemplate.create('s1')
    .contentStyle('statistic')
    .properties({ 'value': data })
    .displayName(label);
  }
});
