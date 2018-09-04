import { AfterViewInit, Component, ElementRef, Host, Renderer2, ViewChild } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { Statistics } from '@blueriq/angular/statistics';
import { Container } from '@blueriq/core';
import { Chart } from 'chart.js';
import { BqPresentationStyles } from '../../BqPresentationStyles';

@Component({
  templateUrl: './statistic.component.html',
  providers: [Statistics]
})
@BlueriqComponent({
  type: Container,
  selector: 'visualization'
})
export class StatisticComponent implements AfterViewInit {

  @ViewChild('canvas')
  canvas: ElementRef;

  @ViewChild('chart')
  chartDiv: ElementRef;

  hasData = false;
  chart: Chart = [];

  // These colors are based on the color palette from our theme, but transparent
  colors: string[] = [
    'rgba(0, 119, 229, 0.65)', 'rgba(120,59,149, 0.65)', 'rgba(120,55,215, 0.65)',
    'rgba(0,120,130, 0.65)', 'rgba(0,164,130, 0.65)', 'rgba(42,191,173, 0.65)',
    'rgba(220,66,80, 0.65)', 'rgba(248,121, 0.65)', 'rgba(248,193,75, 0.65)'
  ];

  constructor(@Host() public container: Container,
              public statistics: Statistics,
              private renderer: Renderer2) {
  }

  ngAfterViewInit(): void {
    this.chart = new Chart(this.canvas.nativeElement.getContext('2d'), {
      type: this.mapPresentationStyleToChartType(),
      data: this.getData([], []),
      options: this.getOptions()
    });

    this.statistics.statistics$.subscribe(stats => {
      const l = stats.map(stat => stat.label);
      const d = stats.map(stat => stat.data);
      this.chart.data = this.getData(l, d);
      this.hasData = d.some(x => +x !== 0);
      if (!this.hasData) {
        const div = this.renderer.createElement('div');
        this.renderer.appendChild(div, this.renderer.createText('No data'));
        this.renderer.appendChild(this.chartDiv.nativeElement, div);
        this.canvas.nativeElement.remove();
      }
      this.chart.update();
    });
  }

  getData(labels, data) {
    const chartData: any = {
      datasets: [{
        data: data,
        backgroundColor: this.colors
      }],
      labels: labels
    };
    if (this.container.styles.hasAny(BqPresentationStyles.STATISTICRADAR,
      BqPresentationStyles.DEPRECATED_STATISTIC_RADAR)) {
      chartData.datasets[0].backgroundColor = this.colors[0];
      chartData.datasets[0].borderColor = this.colors[0];
    } else if (this.container.styles.hasAny(BqPresentationStyles.STATISTICLINE,
      BqPresentationStyles.DEPRECATED_STATISTIC_LINE)) {
      chartData.datasets[0].backgroundColor = this.colors[0];
      chartData.datasets[0].borderColor = this.colors[0];
      chartData.datasets[0].fill = false;
    }
    return chartData;
  }

  getOptions(): {} {
    const options: any = {
      responsive: true,
      legend: {
        position: 'bottom',
        display: this.container.styles.hasAny(
          BqPresentationStyles.STATISTICPIE, BqPresentationStyles.DEPRECATED_STATISTIC_PIE,
          BqPresentationStyles.STATISTICDOUGHNUT, BqPresentationStyles.DEPRECATED_STATISTIC_DOUGHNUT,
          BqPresentationStyles.STATISTICPOLAR, BqPresentationStyles.DEPRECATED_STATISTIC_POLAR
        ),
        labels: {
          boxWidth: 10,
          fontSize: 10,
          fontColor: '#666',
          padding: 5
        }
      },
      animation: this.container.styles.hasAny(BqPresentationStyles.ANIMATION, BqPresentationStyles.ANIMATE)
    };
    if (this.container.styles.hasAny(
      BqPresentationStyles.STATISTICBAR, BqPresentationStyles.DEPRECATED_STATISTIC_BAR,
      BqPresentationStyles.STATISTICLINE, BqPresentationStyles.DEPRECATED_STATISTIC_LINE)) {
      options.scales = {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      };
    } else if (this.container.styles.hasAny(BqPresentationStyles.STATISTICRADAR,
      BqPresentationStyles.DEPRECATED_STATISTIC_RADAR)) {
      options.scale = {
        ticks: {
          beginAtZero: true
        }
      };
    }
    return options;
  }

  mapPresentationStyleToChartType(): string {
    const chartPresentationStyle = this.container.styles.only(
      BqPresentationStyles.STATISTICPIE, BqPresentationStyles.DEPRECATED_STATISTIC_PIE,
      BqPresentationStyles.STATISTICBAR, BqPresentationStyles.DEPRECATED_STATISTIC_BAR,
      BqPresentationStyles.STATISTICDOUGHNUT, BqPresentationStyles.DEPRECATED_STATISTIC_DOUGHNUT,
      BqPresentationStyles.STATISTICRADAR, BqPresentationStyles.DEPRECATED_STATISTIC_RADAR,
      BqPresentationStyles.STATISTICLINE, BqPresentationStyles.DEPRECATED_STATISTIC_LINE,
      BqPresentationStyles.STATISTICPOLAR, BqPresentationStyles.DEPRECATED_STATISTIC_POLAR
    );
    if (!chartPresentationStyle || chartPresentationStyle.count === 0) {
      return 'doughnut';
    }
    let chart: string = chartPresentationStyle.all()[0];
    if (chart === BqPresentationStyles.STATISTICPOLAR || chart === BqPresentationStyles.DEPRECATED_STATISTIC_POLAR) {
      return 'polarArea';
    }
    chart = chart.toLowerCase().replace('statistic', '');
    return chart;
  }

}
