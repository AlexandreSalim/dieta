import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexPlotOptions,
  ApexDataLabels,
  ApexTooltip,
  ApexFill,
  NgApexchartsModule,
  ApexTitleSubtitle,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  plotOptions: ApexPlotOptions;
  dataLabels: ApexDataLabels;
  tooltip: ApexTooltip;
  fill: ApexFill;
  title: ApexTitleSubtitle;
  subtitle: ApexTitleSubtitle;
};

@Component({
  selector: 'app-daily-chart',
  templateUrl: './daily-chart.component.html',
  styleUrls: ['./daily-chart.component.scss'],
  imports: [NgApexchartsModule, CommonModule]
})
export class DailyChartComponent implements OnInit, OnChanges {
  daily = false;
  sem = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'];

  @Input() days: string[] = [];
  @Input() values: number[] = [];
  @Input() highlightIndex?: number;
  @Input() title: string = '';

  public chartOptions!: ChartOptions;

  ngOnInit() {
    const keyMap = 'caloriesByDate';
    const map: Record<string, number> = JSON.parse(
      localStorage.getItem(keyMap) || '{}'
    );

    const dates: Date[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      dates.push(d);
    }

    this.days = dates.map(d => d.getDate().toString().padStart(2, '0'));
    this.values = dates.map(d => {
      const key = d.toISOString().slice(0, 10);
      return map[key] || 0;
    });

    this.highlightIndex = this.days.length - 1;
    this.daily = true;
  }

  ngOnChanges() {
    const colors = this.values.map((_, i) =>
      i === this.highlightIndex ? '#e0e0e0' : 'var(--laranja)'
    );

    this.chartOptions = {
      series: [{ data: this.values }],
      chart: { type: 'bar', height: 320, toolbar: { show: false }, },
      title: {
        text: this.title || 'Meu desempenho',
        align: 'left',
        margin: 20,
        style: { fontSize: '18px', fontWeight: '600', color: 'var(--letra-white)' }
      },
      subtitle: {
        offsetX: 0,
        offsetY: 13,
        text: 'último',
        align: 'right',
        style: { fontSize: '14px', color: 'var(--letra-white)' }
      },
      plotOptions: {
        bar: { distributed: false, columnWidth: '30px', borderRadius: 7, borderRadiusApplication: 'end', }
      },
      dataLabels: { enabled: false },
      xaxis: {
        categories: this.days,
        labels: { show: false },
        axisBorder: { show: false },
        axisTicks: { show: false }
      },
      tooltip: { y: { formatter: v => `${v}` } },
      fill: { colors }
    };
  }
}
