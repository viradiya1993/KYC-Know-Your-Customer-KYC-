import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AppConst } from 'src/app/app.constant';
import { WrapperServiceService } from 'src/app/services/wrapper-services/wrapper-service.service';
import { filter } from 'rxjs/operators';
import { PeriodicElementTransaction } from '../../../models/transaction.model';
import { CsvBuilder } from 'filefy';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { TDateFormatPipe } from 'src/app/t-date-format.pipe';
import { TransactionDetailComponent } from '../transaction-detail/transaction-detail.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TransactionsResultComponent } from '../transactions-result/transactions-result.component';
import { element } from 'protractor';
import { StorageService } from '../../../services/storage.service';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';

@Component({
  selector: 'app-all-transactions',
  templateUrl: './all-transactions.component.html',
  styleUrls: ['./all-transactions.component.scss']
})
export class AllTransactionsComponent implements OnInit {

  displayedColumns: string[] = [
    'pkmobile',
    'userName',
    'transactionId',
    'serviceMobile',
    'mode',
    'transactionType',
    'bulkId',
    'verificationStatus',
    'amountMobile',
    'transactionStatus',
    'paymentTime',
    'responseTime',
    'failureReason'
  ];
  dataSource: PeriodicElementTransaction[];
  docDataSource: PeriodicElementTransaction[];

  searchKey: any = null;
  userdata: any;
  serviceListing: any[];
  page: any = 1;
  length: any;
  limit: any = AppConst.pageSize;
  filterLimit: any;
  index: number;
  filterTransaction: any = { paymentStatus: '', verificationStatus: '', transactionType: '', mode: '', fromDate: null, toDate: null, search: '', serviceName: '', pageSizeLimit: this.limit };
  servicesUsed: any;
  pageLimit: any;
  constructor(public http: HttpClient, public wrapperService: WrapperServiceService,public globalFunctionsService: GlobalFunctionsService, private router: Router, private tDateFormatPipe: TDateFormatPipe, public dialog: MatDialog, private storageService: StorageService) { }

  ngOnInit(): void {
    this.userdata = this.storageService.getUserUserCredential();
    this.globalFunctionsService.exitIntroJS();
    this.getAllTrasactionFilter();
  }

  /* Chnage All trasaction filter */
  changeTransactionFilter(data: any): void {
    
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        switch (key) {
          case 'filterByPaymentStatus':
            this.setPaymentStatus(data[key]);
            break;

          case 'filterByVerificationStatus':
            this.setVerificationStatus(data[key]);
            break;

          case 'filterByTrasactionType':
            this.setTransactionType(data[key]);
            break;

          case 'filterByMode':  
            this.setTrasactionsMode(data[key])
            break
              
          case 'filterbySearchText':
            if (data[key] !== undefined) {
              this.filterTransaction.search = data[key];
            }
            break;
          case 'filterByService':
            if (data[key] !== undefined) {
              this.filterTransaction.serviceName = data[key];
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

          case 'pageSizeLimit':
            if (data[key] !== undefined) {
              this.filterLimit = data[key];
            }
        }
      }
    }

    if (this.filterLimit != AppConst.pageSize) {
      this.limit = this.filterLimit;
    } else {
      this.limit = AppConst.pageSize;
    }

    this.page = 1;
    this.getAllTrasactionsHistory();
  }

  /* Export file */
  changeExportFile(exportData: any) {
    const file = exportData.fileType;
    this.page = exportData.page + 1;
    this.limit = exportData.limit;
    this.getAllTrasactionsHistory((result) => {
      this.docDataSource = result;
      let csvBuilder: CsvBuilder;
      let date = new Date();
      let fileName = date.toISOString() + "-transaction";
      if (file !== undefined) {
        if (file == "Excel") {
          csvBuilder = new CsvBuilder(fileName + ".xls")
          let index = 1;
          csvBuilder.setColumns(["#", "USER NAME", "TRANSACTION ID", "SERVICE USED", "TRANSACTION TYPE", "BULK ID", "VERIFICATION STATUS", "AMOUNT", "TRANSACTION STATUS", "PAYMENT TIME", "RESPONSE TIME", "FAILURE"])
          this.docDataSource.forEach(result => {
            let paymentTime = this.tDateFormatPipe.transform(result.paymentTime);
            let responseTime = this.tDateFormatPipe.transform(result.responseTime);
            csvBuilder.addRow([index++, result.userName, result.transactionId, result.serviceUsed, result.transactionType, result.bulkId, result.verificationStatus, result.amount, result.transactionStatus, paymentTime, responseTime, result.failureReason])
          })
          csvBuilder.exportFile();
        } else if (file == "Docx") {
          csvBuilder = new CsvBuilder(fileName + ".docx")
          let index = 1;
          csvBuilder.setColumns(["#", "USER NAME", "TRANSACTION ID", "SERVICE USED", "TRANSACTION TYPE", "BULK ID", "VERIFICATION STATUS", "AMOUNT", "TRANSACTION STATUS", "PAYMENT TIME", "RESPONSE TIME", "FAILURE"])
          this.docDataSource.forEach(result => {
            let paymentTime = this.tDateFormatPipe.transform(result.paymentTime);
            let responseTime = this.tDateFormatPipe.transform(result.responseTime);
            csvBuilder.addRow([index++, result.userName, result.transactionId, result.serviceUsed, result.transactionType, result.bulkId, result.verificationStatus, result.amount, result.transactionStatus, paymentTime, responseTime, result.failureReason])
          })
          csvBuilder.exportFile();
        } else if (file == "Pdf") {
          var doc = new jsPDF('landscape', 'pt', 'a4', true);
          var col = ["#", "USER NAME", "TRANSACTION ID", "SERVICE USED", "TRANSACTION TYPE", "BULK ID", "VERIFICATION STATUS", "AMOUNT", "TRANSACTION STATUS", "PAYMENT TIME", "RESPONSE TIME", "FAILURE"];
          var rows = []
          let index = 1;
          this.docDataSource.forEach(result => {
            let paymentTime = this.tDateFormatPipe.transform(result.paymentTime);
            let responseTime = this.tDateFormatPipe.transform(result.responseTime);
            var newRow = [index++, result.userName, result.transactionId, result.serviceUsed, result.transactionType, result.bulkId, result.verificationStatus, result.amount, result.transactionStatus, paymentTime, responseTime, result.failureReason];
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

  /* Set trasactions status */
  setPaymentStatus(which): void {
    this.filterTransaction.paymentStatus = ''
    if (which !== undefined) {
      if (which === 'Successful') {
        this.filterTransaction.paymentStatus = 'SUCCESSFUL';
      } else if (which === 'Refund') {
        this.filterTransaction.paymentStatus = 'REFUND';
      } else if (which === 'Failed') {
        this.filterTransaction.paymentStatus = 'FAILED';
      }
    }
  }

  /* Set trasaction verified status */
  setVerificationStatus(which): void {
    this.filterTransaction.verificationStatus = '';
    if (which !== undefined) {
      if (which === 'Pending') {
        this.filterTransaction.verificationStatus = 'PENDING';
      } else if (which === 'Verified') {
        this.filterTransaction.verificationStatus = 'VERIFIED';
      } else if (which === 'NotVerified') {
        this.filterTransaction.verificationStatus = 'NOT VERIFIED';
      }
    }
  }

  /* Set trasactions type */
  setTransactionType(which): void {
    this.filterTransaction.transactionType = '';
    if (which !== undefined) {
      this.filterTransaction.transactionType = which;
    }
  }

  /* set trasactions mode */
  setTrasactionsMode(which): void {
    this.filterTransaction.mode = '';
    if (which !== undefined) {
      this.filterTransaction.mode = which;
    }
  }

  /* Get All Trasactions History */
  getAllTrasactionsHistory(callback?) {
    this.pageLimit = this.limit;
    let params = new HttpParams()
      .set("page", this.page)
      .set("limit", this.pageLimit)

    const bodyData = {
      baseuserid: this.userdata.user.id,
      verificationStatus: this.filterTransaction.verificationStatus,
      transactionStatus: this.filterTransaction.paymentStatus,
      transactionType: this.filterTransaction.transactionType,
      serviceUsed: this.filterTransaction.serviceName,
      fromDate: this.filterTransaction.fromDate,
      toDate: this.filterTransaction.toDate,
      search: this.filterTransaction.search,
      mode: this.filterTransaction.mode
    };
    
    this.wrapperService.getAllTrasactions(params, bodyData).subscribe(result => {
      if (callback) {
        callback(result.transactions.transactions)
      } else {
        this.dataSource = result.transactions.transactions;
      }
      this.length = result.transactions.totalCount;
      let tourRunning = false;
      const isTourRunning = StorageService.getItem('isTourRunning');
      if (isTourRunning !== undefined && isTourRunning == 'true') {
        tourRunning = true;
      }
      if (tourRunning === true) {
          setTimeout(() => {
            this.globalFunctionsService.initIntro();
            this.globalFunctionsService.goToStep(19);
          }, 2000)
      }
    });
  }

  /* Get All Trasactions service Filter */
  getAllTrasactionFilter() {
    let params = new HttpParams()
    let bodyData = {
     baseuserid: this.userdata.user.id,
    }
    this.wrapperService.getAllTrasactionFilterService(params, bodyData).subscribe(result => {
      this.servicesUsed = result.transactionService;
      this.getAllTrasactionsHistory();
    });
  }

  /* get Pagination index */
  receiveMessage(event: any) {
    this.limit = event.pageSize;
    this.page = event.pageIndex + 1;
    this.getAllTrasactionsHistory();
  }

  openDetailsDialog(trasactionsData: any): void {
    const dialogRef = this.dialog.open(TransactionDetailComponent, {
      panelClass: 'mobile-detail-popup',
      data: { trasactionsData: trasactionsData }
    });
  }

  openResultBreakDownDialog(trasactionsData: any): void {
    const params = new HttpParams();
    if (trasactionsData.bulkId) {
      this.router.navigate(["/bulk-verification/bulk-record", trasactionsData.bulkId]);
    } else {
      const bodyData = {
        // transactionRef: "VERNG|SFX|BADDR|1615578683500"
        transactionRef: trasactionsData.transactionId
      };
      this.wrapperService.s3DownloadRequestResponse(params, bodyData).subscribe(result => {
        const dialogRef = this.dialog.open(TransactionsResultComponent, {
          panelClass: 'transactions-result-popup',
          data: { transactionResult: result }
        });
      });
    }
  }
}
