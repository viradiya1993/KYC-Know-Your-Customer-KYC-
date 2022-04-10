import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { WrapperServiceService } from 'src/app/services/wrapper-services/wrapper-service.service';
import { MatDialog } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { TransactionDetailComponent } from '../transaction-detail/transaction-detail.component';
import { ChartType, ChartOptions } from 'chart.js';
import { MultiDataSet, Label, SingleDataSet } from 'ng2-charts';
// import 'chartjs-plugin-labels';
import { PeriodicElementTransaction } from '../../../models/transaction.model';
import { AppConst } from 'src/app/app.constant';
import * as moment from 'moment';
import { Router } from '@angular/router';
import * as highCharts from 'angular-highcharts';
import { StorageService } from '../../../services/storage.service';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';

export interface PeriodicElement {
  pk: number;
  transactionId: string | null;
  serviceUsed: string | null;
  transactionType: string | null;
  bulkId: string | null;
  verificationStatus: string | null;
  amount: number;
  transactionStatus: string | null;
  paymentTime: string | null;
  userName: string | null;
}


@Component({
  selector: 'app-transactions-dashboard',
  templateUrl: './transactions-dashboard.component.html',
  styleUrls: ['./transactions-dashboard.component.scss']
})
export class TransactionsDashboardComponent implements OnInit {

  displayedColumns: string[] = [
    'pkmobile',
    'transactionId',
    'serviceMobile',
    'verificationStatus',
    'amountMobile',
    'transactionStatus',
    'paymentTime'
  ];


  

  page: any = 1;
  length: any;
  limit: any = AppConst.pageSize;
  index: number;
  totalSucessCalls = 0;
  totalCount = 0;
  searchKey: any = null;
  dataSource: PeriodicElementTransaction[];
  public doughnutChartLabels: Label[] = [];
  public doughnutChartData: SingleDataSet[] = [];
  public doughnutChartType: ChartType;
  public doughnutChartOptions: ChartOptions;

  filterTransaction: any = {fromDate: null,  toDate: null, search: ''};
  columnChart: any;
  donutChart: any;
  dataseries: any = [];
  userdata: any;
 

  

  constructor(public wrapperService: WrapperServiceService, public dialog: MatDialog, public overlay: Overlay,
    private storageService: StorageService,public globalFunctionsService: GlobalFunctionsService
    ) { }

  ngOnInit(): void {
    this.userdata = this.storageService.getUserUserCredential();
    this.globalFunctionsService.exitIntroJS();
    this.getAllTransactions();
  }

  /* Get All Transactions */
  getAllTransactions(): void {
    const params = new HttpParams()
      .set('page', this.page)
      .set('limit', this.limit);
    const bodyData = {
      baseuserid: this.userdata.user.id,
      fromDate: this.filterTransaction.fromDate,
      toDate:  this.filterTransaction.toDate,
      search: this.filterTransaction.search
    };

    this.wrapperService.getAllTrasactions(params, bodyData).subscribe(result => {
      this.dataSource = result.transactions.transactions;
      this.totalSucessCalls = result.transactions.totalSuccessCount;
      this.totalCount = result.transactions.totalCount;
      const tmpserviceAnalytics: any = result.transactions.serviceAnalytics;
      this.doughnutChartLabels = [];
      this.doughnutChartData = [];
      for (const index in tmpserviceAnalytics) {
        this.doughnutChartLabels.push(tmpserviceAnalytics[index].serviceUsed);
        this.doughnutChartData.push(tmpserviceAnalytics[index].count);
        this.dataseries.push({
          name: tmpserviceAnalytics[index].serviceUsed,
          y: +tmpserviceAnalytics[index].count
        })
      }
      this.doughnutChartType = 'doughnut';
      const donut = new highCharts.Chart({
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: 0,
          plotShadow: false
        },
        title: {
          text: '<strong>Expenses distribution</strong>',
          align: 'center',
          verticalAlign: 'top',
          y: 10
        },
        tooltip: {
          pointFormat: '<b>: {point.y}</b>'
          // pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        credits: {
          enabled: false
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              distance: -50,
              style: {
                fontWeight: 'bold',
                color: 'black'
              }
            },
            startAngle: 0,
            endAngle: -180,
            center: ['50%', '50%'],
            size: '90%',
            showInLegend: true,
          }
        },
        legend: {
          itemWidth: 200,
          symbolRadius:1,
        },
        series: [
          {
            name: 'Browsers',
            data: this.dataseries,
            type: 'pie',
            showInLegend: true,
            innerSize: '90%',
            dataLabels: {
              formatter: function (format) {
                return this.point.percentage.toFixed(2) + '%'
              },
              distance: 10
            },

          }]
      });
      this.donutChart = donut;
      let tourRunning = false;
      const isTourRunning = StorageService.getItem('isTourRunning');
      if (isTourRunning !== undefined && isTourRunning == 'true') {
        tourRunning = true;
      }
      if (tourRunning === true) {
          setTimeout(() => {
            this.globalFunctionsService.initIntro();
            this.globalFunctionsService.goToStep(17);
          }, 1000)
      }
      /* By baseChart */
      // this.doughnutChartOptions = {
      //   cutoutPercentage: 90,
      //   responsive: true,
      //   maintainAspectRatio: true,
      //   title: {
      //     display: true,
      //     text: 'Expense Distribution',
      //     position: 'bottom',
      //     fontSize: 15
      //   },
      //   legend: {
      //     align: 'start',
      //     position: 'bottom',
      //     display: true,
      //     fullWidth: false,
      //     labels: {
      //       padding: 10,
      //       fontSize: 13,
      //       usePointStyle: false,
      //       fontColor: 'rgb(143, 142, 142)',
      //       boxWidth: 30,
      //     }
      //   },
      //   plugins: {
      //     labels: {
      //       render: 'percentage',
      //       precision: 2,
      //       position: 'outside'
      //     }
      //   },
      // };
      /*End  By baseChart */
    });
  }

  
  /* Chnage filter */
  changeTransactionFilter(data: any): void {
  
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        switch (key) {
          case 'filterbySearchText':
            if (data[key] !== undefined) {
              this.filterTransaction.search = data[key];
            }
           break;

          case 'from':
            if (data[key] !== undefined) {
              this.filterTransaction.fromDate = data[key];
            }
            break;
          case 'to':
            if (data[key] !== undefined) {
              this.filterTransaction.toDate = data[key];
            }
          break;
        }
      }
    }
    this.page = 1;
    this.getAllTransactions();
  }

  

  openDetailsDialog(trasactionsData: any): void {
    const dialogRef = this.dialog.open(TransactionDetailComponent, {
      panelClass: 'mobile-detail-popup',
      data: { trasactionsData: trasactionsData }
    });
  }
}
