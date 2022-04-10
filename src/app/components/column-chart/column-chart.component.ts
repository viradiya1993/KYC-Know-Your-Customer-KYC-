import { Component, OnInit, Input } from '@angular/core';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { Subject } from 'rxjs';
import * as Highcharts from 'angular-highcharts';

@Component({
  selector: 'app-column-chart',
  templateUrl: './column-chart.component.html',
  styleUrls: ['./column-chart.component.scss']
})
export class ColumnChartComponent implements OnInit {

  @Input() chartData: Subject<any>;
  @Input() chartLabels: Label[];
  columnChart: any;

  public columnChartLabels: any[];
  public columnChartData: any[];

  constructor() { }

  ngOnInit(): void {
    this.chartData.subscribe(value => {
      this.columnChartData = value;
      this.initColumnChart();
    })
    this.columnChartLabels = this.chartLabels;
  }

  initColumnChart() {
    const chart = new Highcharts.Chart({
      chart: {
        type: 'column',
        renderTo: 'tmpColumnChart'
      },
      title: {
        text: null
      },
      credits: {
        enabled: false
      },
      xAxis: {
        categories: this.columnChartLabels
      },
      yAxis: {
        visible: false
      },

      plotOptions: {
        series: {
          stacking: 'normal',
          showInLegend: true
        }
      },
      legend: {
        align: 'right',
        verticalAlign: 'middle',
        borderRadius: 1,
        width: 175,
        itemWidth:175
      },
      series: this.columnChartData,
      responsive: {
        rules: [{
          condition: {
            maxWidth: 375
          },
          chartOptions: {
            legend: {
              align: 'center',
              verticalAlign: 'bottom',
              borderRadius: 1,
              width: 290,
              itemWidth:145,
              // itemStyle:{
              //   fontSize:'10px'
              // }
            },
          }
        }]
      }
    });
    this.columnChart = chart
  }
}
