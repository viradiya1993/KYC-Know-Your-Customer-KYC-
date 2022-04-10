import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';
import { HttpParams } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import * as Highcharts from 'highcharts';
import { WrapperServiceService } from 'src/app/services/wrapper-services/wrapper-service.service';
import { result } from 'cypress/types/lodash';
import { count } from 'rxjs/operators';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.scss']
})

export class MainDashboardComponent implements OnInit {
  dashboardData: any = {};
  columnChart: any;
  columnChartData: Subject<any> = new Subject();
  pieChartData: Subject<any> = new Subject();
  completedProgressData: Subject<any> = new Subject();
  ongoingProgressData: Subject<any> = new Subject();

  // public columnChartType: ChartType = 'bar';
  // public columnChartOptions: ChartOptions;
  public columnChartLabels: Label[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  public tmpColumnChartData: any[] = [];
  public yeartemplChartData: any[] = [];
  // public pieChartType: ChartType = 'pie';
  // public pieChartOptions: ChartOptions;
  public pieChartLabels: Label[] = ['Successful Request', 'Failed Request'];
  public tmpPieChartData: any[] = [];
  smallcards: any;
  bigcards: any;
  columnchart: any;
  piechart: any;
  progressCharts: any;
  allYears: any = [];
  colorarray = ['#48B971', '#3476E0']
  yearFilter: any;
  selectYear: any;
  userdata: any;
  isLoggedIn: boolean = false;

  constructor(private http: HttpClient, public wrapperService: WrapperServiceService, private globalFunctionsService: GlobalFunctionsService, public storageService: StorageService, private router: Router) { }

  ngOnInit(): void {
    this.userdata = this.storageService.getUserUserCredential();
    this.selectYear = '';
    this.userdata = this.storageService.getUserUserCredential();

    this.getDashboardCard();

    var currentYear = (new Date()).getFullYear();
    for (var i = 2019; i <= currentYear; i++) {
      this.allYears.push(i);
    }
  }

  /* Get All Dashboard  */
  getDashboardCard() {

    this.tmpColumnChartData = [];
    this.tmpPieChartData = [];

    const params = new HttpParams()

    const bodyData = {
      dashboardRef: 'dashboard_request_parameter',
      baseuserid: this.userdata.user.id
    };

    this.wrapperService.getDashboardCard(params, bodyData).subscribe(result => {
      this.smallcards = result.dashboardResponse.smallCards;
      this.bigcards = result.dashboardResponse.bigCards;
      this.progressCharts = result.dashboardResponse.progressCharts;

      for (const index in this.progressCharts) {
        if (this.progressCharts[index]['isShowProgress'] === true) {
          let valueInPer = this.progressCharts[index]['valueInPer']
          let valuename: string = this.progressCharts[index]['chartLabel'];
          let nameLength: number = valuename.length;
          for (let i: number = 0; i < nameLength; i++) {
            valuename = valuename.replace(' ', '<br/>');
          }
          this.progressCharts[index]['completedProgressData'] = {
            data: valueInPer,
            name: valuename,
            color: this.colorarray[index]
          };
        }
      }

      this.piechart = result.dashboardResponse.pieChart
      this.tmpPieChartData = this.piechart[0]['counts']
      this.pieChartData.next(this.tmpPieChartData);



      this.columnchart = result.dashboardResponse.barChart[0]['services']
      const toNumbers = arr => arr.map(Number);
      for (const index in this.columnchart) {
        this.tmpColumnChartData.push({
          type: 'column',
          name: this.columnchart[index].name,
          data: toNumbers(this.columnchart[index].count)
        })
      }
      if (this.userdata != undefined && this.userdata.user != undefined) {
        this.yeartemplChartData = [];
        this.columnChartData.next(this.tmpColumnChartData);
      }

    });

  }

  /* Get Dashborad filter by year */
  getDashboardCardFilter() {
    const params = new HttpParams()
    const bodyData = {
      dashboardRef: "dashboard_request_parameter",
      baseuserid: this.userdata.user.id,
      filterByYear: this.yearFilter
    };

    this.wrapperService.getDashboardCardFilter(params, bodyData).subscribe(result => {
      this.columnchart = result.dashboardResponse.barChart[0]['services']
      const toNumbers = arr => arr.map(Number);
      for (const index in this.columnchart) {
        this.yeartemplChartData.push({
          type: 'column',
          name: this.columnchart[index].name,
          data: toNumbers(this.columnchart[index].count)
        })
      }
      this.tmpColumnChartData = [];
      this.columnChartData.next(this.yeartemplChartData);
    });
    this.yeartemplChartData = [];

  }

  /* Year Chnage */
  yearChnage(yearValue: any) {
    if (this.yearFilter !== yearValue) {
      this.yearFilter = yearValue
    }
    this.getDashboardCardFilter();
  }

  bigCardsNavigation(link: string): void {
    const walletDetails: any = StorageService.getObject('walletDetails');
    if (walletDetails !== undefined && walletDetails?.userid !== undefined) {
      this.router.navigate(['/billing/topup']);
    } else {
      const params = new HttpParams();
      const bodyData = {
        baseuserid: this.userdata.user.id,
      };
      this.wrapperService.getWalletData(params, bodyData).subscribe(result => {
        const walletDetailstmp = result.walletDetails;
        StorageService.setObject('walletDetails', walletDetailstmp);
        this.router.navigate(['/billing/topup']);
      });
    }
  }
}
