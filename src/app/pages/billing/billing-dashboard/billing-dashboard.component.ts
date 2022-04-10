
import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import "base-frontend-components/dist/src/table/bfc-table"
import { MatDialog } from '@angular/material/dialog';

import { TABLEDATA, REQUEST_DATA } from '../billing.constants'
import { RequestModal } from '../modal.component';
import { WrapperServiceService } from 'src/app/services/wrapper-services/wrapper-service.service';
import { MostUsedService, RecentlyUserService, TotalRequest } from 'src/app/models/billing';
import { StorageService } from 'src/app/services/storage.service';
import { BalanceAlertModal } from '../wallet/set-bal-alert-modal';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { Router } from '@angular/router';
import { CsvBuilder } from 'filefy';
import autoTable from 'jspdf-autotable'
import jsPDF from 'jspdf'

import { AppConst } from 'src/app/app.constant';
@Component({
  selector: 'app-billing-dashboard',
  templateUrl: './billing-dashboard.component.html',
  styleUrls: ['./billing-dashboard.component.scss']
})
export class BillingDashboardComponent implements OnInit {
  serviceType: any;
  serviceName: any = null;
  index: number;
  verified_service_provider_id: any
  searchKey: any = null;
  seriveStatus: any;
  serviceNameValues: any;
  tableData: any = {}
  totalCount: number = 0
  mostUsedService: MostUsedService;
  recentlyUserService: RecentlyUserService;
  totalRequest: TotalRequest;
  showAll: boolean = true;
  cardsDetails: any;
  params = new HttpParams();
  page: any = 1;
  limit: any = 10;
  countentLoaded: boolean = false;
  userData: any;
  param = new HttpParams()
  wapperId: any = null;
  fromDate: any
  toDate: any
  walletBalance: number;
  displayedColumns: string[] = [
    'serialNumber',
    'serviceName',
    'service_type',
    'description',
    'bandLimit',
    'unitCost',
    'extraInfo',
  ];
  docDataSource: any;
  invocation_time: { date: string; time: string; };

  constructor(public dialog: MatDialog, public router: Router, private wrapperService: WrapperServiceService, public globalFunctionsService: GlobalFunctionsService, private storageService: StorageService) { }

  ngOnInit(): void {
    this.globalFunctionsService.exitIntroJS();
    this.userData = this.storageService.getUserUserCredential();
    this.createBaseWallet();
  }

  createBaseWallet(): void {
    const param = new HttpParams();
    const body = {
      baseuserid: this.userData.user.id
    };
    const baseOrgData = this.globalFunctionsService.getOrgBaseDetails();
    for (const key in baseOrgData) {
      if (baseOrgData.hasOwnProperty(key)) {
        const element = baseOrgData[key];
        body[key] = element;
      }
    }

    this.wrapperService.walletCreation(param, body).subscribe(result => {
      this.getBillingTableDetails();
      this.wrapperService.getBillingCardDetails(this.param, { baseuserid: this.userData.user.id }).subscribe(res => {
        if (res.code === 0) {
          this.mostUsedService = res.billingCardData.mostUsedService[0]
          this.recentlyUserService = res.billingCardData.recentlyUserService[0]
          this.invocation_time = {date:new Date(this.recentlyUserService.invocation_time).toLocaleDateString(), time: new Date(this.recentlyUserService.invocation_time).toLocaleTimeString()}
          this.totalRequest = res.billingCardData.totalRequest[0]
          this.countentLoaded = true;
          this.walletBalance = res.billingCardData.walletAmount;
        }
        /* let tourRunning = false;
        const isTourRunning = StorageService.getItem('isTourRunning');
        if (isTourRunning !== undefined && isTourRunning == 'true') {
          tourRunning = true;
        }
        if (tourRunning === true) {
          setTimeout(() => {
            this.globalFunctionsService.initIntro();
            this.globalFunctionsService.goToStep(9);
          }, 1000)
        } */
      });
    });
  }

  getBillingTableDetails(callback?) {
    const params = new HttpParams()
      .set('page', this.page)
      .set('limit', this.limit);

    const bodyParams = {
      baseuserid: this.userData.user.id,
      serviceType: this.serviceType,
      wrapperId: this.wapperId,
      // verificationStatus: this.seriveStatus,
      // from: this.fromDate,
      // to: this.toDate
    }

    this.wrapperService.getBillingTableDetails(params, bodyParams).subscribe(res => {
      this.getAllServices();
      if (res.code === 0) {
        if (callback) {
          callback(res.customerbilling)
        }

        this.tableData = res.customerbilling
        this.totalCount = res.totalCount
        let tourRunning = false;
        const isTourRunning = StorageService.getItem('isTourRunning');
        if (isTourRunning !== undefined && isTourRunning == 'true') {
          tourRunning = true;
        }
        if (tourRunning === true) {
          setTimeout(() => {
            this.globalFunctionsService.initIntro();
            this.globalFunctionsService.goToStep(9);
          }, 1000)
        }
      }
    })
  }

  openDialog(rowData: any, wrapper_name: string): void {
    const dialogRef = this.dialog.open(RequestModal, {
      width: '550px',
      data: [...rowData, wrapper_name]
    });
  }

  openBalanceAlertDialog(rowData: any): void {
    const dialogRef = this.dialog.open(BalanceAlertModal, {
      width: '550px',
      data: [{ name: "eric", age: 20 }]
    });

  }

  toogleViewAll() {
    this.showAll = !this.showAll
    this.wapperId = null
    this.serviceType = null
    this.getBillingTableDetails()
  }

  /* get all Id provider */
  getAllServices() {
    this.wrapperService.getBillingWrapperservice(this.param, { baseuserid: this.userData.user.id }).subscribe(result => {

      this.serviceNameValues = result.wrapperService;
    });
  }

  getDetailEvent(rowElement): void {
    this.wrapperService.getBillingBandDetails(this.param, {
      wrapperid: rowElement.wrapper_id,
      band_pk: rowElement.band_pk,
      baseuserid: this.userData.user.id,
    }).subscribe(res => {
      if (res.code === 0) {
        const data = res.bandsDetails
           
        this.openDialog(data, rowElement.wrapper_name)
      }
    })
  }

  gotoWallet() {
    this.router.navigateByUrl('/topup')
  }

  /* Chnage All trasaction filter */
  onChangeFilter(data: any): void {

    let filterLimit
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        switch (key) {

          case 'from':
            if (data[key] !== undefined) {
              this.fromDate = data[key];
            }
            break;
          case 'to':
            if (data[key] !== undefined) {
              this.toDate = data[key];
            }
            break;

          case 'pageSizeLimit':
            if (data[key] !== undefined) {
              filterLimit = data[key];
            }
        }
      }
    }

    if (filterLimit != AppConst.pageSize) {
      this.limit = filterLimit;
    } else {
      this.limit = AppConst.pageSize;
    }

    this.page = 1;
    this.getBillingTableDetails()
  }

  getWrapperId(wrapperId: any) {
    this.wapperId = wrapperId
    this.serviceType = null
    this.getBillingTableDetails()
  }

  billingServicType(service_type: any) {
    this.serviceType = service_type
    this.seriveStatus = null
    this.getBillingTableDetails()
  }

  getBllingVerificationStatus(verificationStatus: any) {
    this.serviceType = null
    this.seriveStatus = verificationStatus
    this.getBillingTableDetails()
  }

  /* get Pagination index */
  receiveMessage(event: any) {
    this.limit = event.pageSize;
    this.page = event.pageIndex + 1;
    this.getBillingTableDetails();
  }

  goToWalletComponent(): void {
    const walletDetails: any = StorageService.getObject('walletDetails');
    if (walletDetails !== undefined && walletDetails?.userid !== undefined) {
      this.router.navigate(['/billing/topup']);
    } else {
      const params = new HttpParams();
      const bodyData = {
        baseuserid: this.userData.user.id,
      };
      this.wrapperService.getWalletData(params, bodyData).subscribe(result => {
        const walletDetailsTmp = result.walletDetails;
        StorageService.setObject('walletDetails', walletDetailsTmp);
        this.router.navigate(['/billing/topup']);
      });
    }
  }


  /* Export file */
  changeExportFile(exportData: any) {
    const file = exportData.fileType;
    this.page = exportData.page + 1;
    this.limit = exportData.limit;
    const column = ["#", "SERVICE NAME", "SERVICE TYPE ID", "DESCRIPTION", "UNIT COST", "CURRENT BAND"]
    this.getBillingTableDetails((result) => {

      this.docDataSource = result;
      let csvBuilder: CsvBuilder;
      let date = new Date();
      let fileName = date.toISOString() + "-billing";
      if (file !== undefined) {
        if (file == "Excel") {
          csvBuilder = new CsvBuilder(fileName + ".xls")
          let index = 1;
          csvBuilder.setColumns(column)
          this.docDataSource.forEach(result => {

            csvBuilder.addRow([index++, result.wrapper_name, result.service_type, result.wrapper_description, result.band_price, result.bandlimit])
          })
          csvBuilder.exportFile();
        } else if (file == "Docx") {
          csvBuilder = new CsvBuilder(fileName + ".docx")
          let index = 1;

          csvBuilder.setColumns(column)
          this.docDataSource.forEach(result => {
            csvBuilder.addRow([index++, result.wrapper_name, result.service_type, result.wrapper_description, result.band_price, result.bandlimit])
          })
          csvBuilder.exportFile();
        } else if (file == "Pdf") {
          var doc = new jsPDF('landscape', 'pt', 'a4', true);
          var col = column;
          var rows = []
          let index = 1;
          this.docDataSource.forEach(result => {
            var newRow = [index++, result.wrapper_name, result.service_type, result.wrapper_description, result.band_price, result.bandlimit];
            rows.push(newRow);
          })
          autoTable(doc, {
            head: [col],
            body: rows,
            theme: 'grid',
            styles: {
              minCellWidth: 40
            },
            columnStyles: {
              1: { minCellWidth: 50 },
              2: { minCellWidth: 85 },
              3: { minCellWidth: 55 },
              4: { minCellWidth: 85 },
              6: { minCellWidth: 85 },
              7: { minCellWidth: 55 },
              8: { minCellWidth: 85 },
              9: { minCellWidth: 60 },
              10: { minCellWidth: 70 },
              11: { minCellWidth: 65 }
            },
            headStyles: {
              halign: 'center',
              valign: 'middle'
            },
            rowPageBreak: 'avoid'
          })
          doc.save(fileName + ".pdf");
        }
      }
    });
  }
}
