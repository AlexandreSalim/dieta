import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';
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
  title: ApexTitleSubtitle;        // <-- adicionado
  subtitle: ApexTitleSubtitle;
};

@Component({
  selector: 'app-daily-chart',
  templateUrl: './daily-chart.component.html',
  styleUrls: ['./daily-chart.component.scss'],
  imports: [NgApexchartsModule, CommonModule]
})
export class DailyChartComponent implements OnChanges {
  sem = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab']
  @Input() days: string[] = [];     // ex: ['30','31','01','02','03','04','05']
  @Input() values: number[] = [];   // ex: [5,5,6,6,3,0,0]
  @Input() highlightIndex?: number; // ex: 4 para “03”
  @Input() title: string = '';
  

  public chartOptions!: ChartOptions;

  ngOnChanges() {
    // cores: barras não selecionadas em cinza-claro, a selecionada em teal
    const colors = this.values.map((_, i) =>
      i === this.highlightIndex ? '#3ec9c9' : '#3ec9c9'
    );

   // ...
this.chartOptions = {
  series: [{ data: this.values }],
  chart: { type: 'bar', height: 320, toolbar: { show: false }, },
  title: {
    text: 'Meu desempenho',
    align: 'left',
    margin: 20,
    style: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#333'
    }
  },
  subtitle: {
    offsetX: 0,
    offsetY: 13,
    text: 'último',
    align: 'right',
    style: {
      fontSize: '14px',
      color: '#3ec9c9'
    }
  },
  plotOptions: {
    bar: { distributed: false, columnWidth: '40px', borderRadius: 15, borderRadiusApplication: 'end' }
  },
  dataLabels: { enabled: false },
  xaxis: {
    categories: this.days,
    labels: { show: false },
    axisBorder: { show: false },
    axisTicks:  { show: false }
  },
  tooltip: { y: { formatter: v => `${v}` } },
  fill: { colors },
};

  }
}
