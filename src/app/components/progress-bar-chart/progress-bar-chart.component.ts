import { Component, OnInit, Input} from '@angular/core';
import * as Highcharts from 'angular-highcharts';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-progress-bar-chart',
  templateUrl: './progress-bar-chart.component.html',
  styleUrls: ['./progress-bar-chart.component.scss']
})
export class ProgressBarChartComponent implements OnInit {

  @Input() chartData: any;
  data:any;
  porgressbarChart: any;
  constructor() {
  }
 

  ngOnInit(): void {
    this.data = this.chartData
    this.initProgressChart()
  }

  initProgressChart() {
    const progressChart = new Highcharts.Chart({

      chart: {
        type: 'solidgauge',
      },

      title: null,
      credits: {
        enabled: false
      },
      tooltip: {
        'enabled': false
      },

      pane: {
        startAngle: 5,
        endAngle: 365,
        background: [{
          backgroundColor: '#EEE',
          innerRadius: '80%',
          outerRadius: '100%',
          borderWidth: 0
        }]
      },

      yAxis: {
        min: 0,
        max: 100,
        labels: {
          enabled: false
        },

        lineWidth: 0,
        minorTickInterval: null,
        tickPixelInterval: 400,
        tickWidth: 0
      },

      plotOptions: {
        solidgauge: {
          innerRadius: '80%'
        }
      },

      series: [{
        type: 'solidgauge',
        name: 'Verified',
        data: [{
          y : +(this.data.data),
          color: this.data.color
        }],
        dataLabels: {
          align: 'center',
          useHTML:true,
          verticalAlign:'middle',
          borderWidth: 0,
          // format: '<div style="text-align:center">' +
          //   '<span >{y}%<br/> Percentage of <br/>' + this.data.name + '<br/>verifications</span><br/>' +
          //   '</div>'

          format: '<div style="text-align:center">' +
          '<span >{y}%<br/>' + this.data.name + '<br/></span><br/>' +
          '</div>'
        },
      }]
    })
    this.porgressbarChart = progressChart;
  }
}
