import { AfterViewInit, Component, ElementRef, Host, Renderer2, ViewChild } from '@angular/core';
import { BlueriqComponent } from '@blueriq/angular';
import { Statistic, Statistics } from '@blueriq/angular/statistics';
import { Container, PresentationStyles } from '@blueriq/core';
import { Chart } from 'chart.js';
import { BqPresentationStyles } from '../../BqPresentationStyles';

type ChartType = 'pie' | 'doughnut' | 'bar' | 'line' | 'radar' | 'polarArea';

interface ChartData {
  datasets: {
    data: string[],
    backgroundColor: string | string[],
    borderColor?: string,
    fill?: boolean
  }[];
  labels: string[];
}

interface ChartOptions {
  responsive: boolean;
  legend: {
    position: string,
    display: boolean,
    labels: {
      boxWidth: number,
      fontSize: number,
      fontColor: string,
      padding: number
    }
  };
  animation: {
    duration: number
  };
  scale?: {
    ticks: {
      beginAtZero: boolean
    }
  };
  scales?: {
    yAxes: {
      ticks: {
        beginAtZero: boolean
      }
    }[]
  };
}

@Component({
  templateUrl: './statistic.component.html',
  providers: [Statistics],
})
@BlueriqComponent({
  type: Container,
  selector: 'visualization',
})
export class StatisticComponent implements AfterViewInit {

  chart: Chart = [];

  @ViewChild('canvas')
  private canvas: ElementRef;
  @ViewChild('chart')
  private chartDiv: ElementRef;
  private hasData = false;
  // These colors are based on the color palette from our theme, but transparent
  private colors: string[] = [
    'rgba(0, 119, 229, 0.65)', 'rgba(120,59,149, 0.65)', 'rgba(120,55,215, 0.65)',
    'rgba(0,120,130, 0.65)', 'rgba(0,164,130, 0.65)', 'rgba(42,191,173, 0.65)',
    'rgba(220,66,80, 0.65)', 'rgba(248,121, 0.65)', 'rgba(248,193,75, 0.65)',
  ];

  private animationLength = 800;
  private boxWidth = 10;
  private fontSize = 10;
  private fontColor = '#666';
  private padding = 5;

  constructor(@Host() public container: Container,
              public statistics: Statistics,
              private renderer: Renderer2) {
  }

  ngAfterViewInit(): void {
    this.chart = new Chart(this.canvas.nativeElement.getContext('2d'), {
      type: this.presentationStylesToChartType(),
      data: this.getData([], []),
      options: this.getOptions(),
    });

    this.statistics.statistics$.subscribe((stats: Statistic[]) => {
      const labels: string[] = stats.map(stat => stat.label);
      const data: string[] = stats.map(stat => stat.data);
      this.chart.data = this.getData(labels, data);
      this.hasData = data.some(x => +x !== 0);
      if (!this.hasData) {
        const div = this.renderer.createElement('div');
        this.renderer.appendChild(div, this.renderer.createText('No data'));
        this.renderer.appendChild(this.chartDiv.nativeElement, div);
        this.renderer.removeChild(this.canvas.nativeElement.parentNode, this.canvas.nativeElement);
      }
      this.chart.update();
    });
  }

  getOptions(): ChartOptions {
    const options: any = {
      responsive: true,
      legend: {
        position: 'bottom',
        display: this.container.styles.hasAny(
          BqPresentationStyles.STATISTICPIE, BqPresentationStyles.DEPRECATED_STATISTIC_PIE,
          BqPresentationStyles.STATISTICDOUGHNUT, BqPresentationStyles.DEPRECATED_STATISTIC_DOUGHNUT,
          BqPresentationStyles.STATISTICPOLAR, BqPresentationStyles.DEPRECATED_STATISTIC_POLAR,
        ),
        labels: {
          boxWidth: this.boxWidth,
          fontSize: this.fontSize,
          fontColor: this.fontColor,
          padding: this.padding,
        },
      },
      animation: {
        duration: this.container.styles.hasAny(
          BqPresentationStyles.ANIMATION, BqPresentationStyles.DEPRECATED_ANIMATE) ? this.animationLength : 0,
      },
    };
    if (this.container.styles.hasAny(
      BqPresentationStyles.STATISTICBAR, BqPresentationStyles.DEPRECATED_STATISTIC_BAR,
      BqPresentationStyles.STATISTICLINE, BqPresentationStyles.DEPRECATED_STATISTIC_LINE)) {
      options.scales = {
        yAxes: [{
          ticks: {
            beginAtZero: true,
          },
        }],
      };
    } else if (this.container.styles.hasAny(BqPresentationStyles.STATISTICRADAR,
      BqPresentationStyles.DEPRECATED_STATISTIC_RADAR)) {
      options.scale = {
        ticks: {
          beginAtZero: true,
        },
      };
    }
    return options;
  }

  private getData(labels: string[], data: string[]): ChartData {

    if (this.container.styles.hasAny(BqPresentationStyles.STATISTICRADAR,
      BqPresentationStyles.DEPRECATED_STATISTIC_RADAR)) {

      return {
        datasets: [{
          data: data,
          backgroundColor: this.colors[0],
          borderColor: this.colors[0],
        }],
        labels: labels,
      };
    } else if (this.container.styles.hasAny(BqPresentationStyles.STATISTICLINE,
      BqPresentationStyles.DEPRECATED_STATISTIC_LINE)) {
      return {
        datasets: [{
          data: data,
          backgroundColor: this.colors[0],
          borderColor: this.colors[0],
          fill: false,
        }],
        labels: labels,
      };
    }
    return {
      datasets: [{
        data: data,
        backgroundColor: this.colors,
      }],
      labels: labels,
    };
  }

  private presentationStylesToChartType(): ChartType {
    const chartPresentationStyle: PresentationStyles = this.container.styles.only(
      BqPresentationStyles.STATISTICPIE, BqPresentationStyles.DEPRECATED_STATISTIC_PIE,
      BqPresentationStyles.STATISTICBAR, BqPresentationStyles.DEPRECATED_STATISTIC_BAR,
      BqPresentationStyles.STATISTICDOUGHNUT, BqPresentationStyles.DEPRECATED_STATISTIC_DOUGHNUT,
      BqPresentationStyles.STATISTICRADAR, BqPresentationStyles.DEPRECATED_STATISTIC_RADAR,
      BqPresentationStyles.STATISTICLINE, BqPresentationStyles.DEPRECATED_STATISTIC_LINE,
      BqPresentationStyles.STATISTICPOLAR, BqPresentationStyles.DEPRECATED_STATISTIC_POLAR,
    );
    if (chartPresentationStyle.count === 0) {
      return 'doughnut';
    }
    const chart: string = chartPresentationStyle.all()[0];
    if (chart === BqPresentationStyles.STATISTICPOLAR || chart === BqPresentationStyles.DEPRECATED_STATISTIC_POLAR) {
      return 'polarArea';
    }
    const chartType = (chart.toLowerCase().replace('statistic', ''));
    switch (chartType) {
      case 'pie':
      case 'bar':
      case 'line':
      case 'radar':
        return chartType;
      default:
        return 'doughnut';
    }
  }

}
