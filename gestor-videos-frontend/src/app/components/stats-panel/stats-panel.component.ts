import { Component } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexPlotOptions, ApexXAxis } from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
};

@Component({
  selector: 'app-stats-panel',
  templateUrl: './stats-panel.component.html',
  styleUrls: ['./stats-panel.component.css']
})
export class StatsPanelComponent {

  chartOptions1: ChartOptions;

  constructor() {
    this.chartOptions1 = {
      series: [
        {
          name: 'Videos',
          data: [
            { x: 'grupo1', y: 3 },
            { x: 'grupo2', y: 2 },
            { x: 'grupo3', y: 2 }
          ]
        }
      ],
      chart: {
        type: 'bar',
        height: 150
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: ['grupo1', 'grupo2', 'grupo3']
      }
    };
  }
}