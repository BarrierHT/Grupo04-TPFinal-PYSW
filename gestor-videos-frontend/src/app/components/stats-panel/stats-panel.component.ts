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

  stats1: ChartOptions = {
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

  stats2:ChartOptions = {
    series : [{
      name: 'Series 1',
      data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
    }],
    chart: {
      type: 'line'
    },
    plotOptions: {
    },
    dataLabels: {
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
    }
  };

  constructor() {
  }
}