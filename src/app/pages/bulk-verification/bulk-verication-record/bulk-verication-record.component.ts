import { HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AppConst } from 'src/app/app.constant';
import { ElementBulkVerificationTrasactions } from 'src/app/models/bulk-verification-transaction.model';
import { WrapperServiceService } from 'src/app/services/wrapper-services/wrapper-service.service';
import { Bulk_verification_record, Bulk_verifications_status } from '../../../models/enums.model';

import { CsvBuilder } from 'filefy';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { TDateFormatPipe } from 'src/app/t-date-format.pipe';
import { StorageService } from '../../../services/storage.service';
import { BulkDetailComponent } from '../bulk-detail/bulk-detail.component';


@Component({
  selector: 'app-bulk-verication-record',
  templateUrl: './bulk-verication-record.component.html',
  styleUrls: ['./bulk-verication-record.component.scss']
})

export class BulkVericationRecordComponent implements OnInit, OnDestroy {
  page: any = 1;
  length: any;
  limit: any = AppConst.pageSize;
  index: number;
  searchValue: any;
  bulkrecord: any;
  bulkStatus: any;
  searchData: any;
  invocationStatus: any;
  verificationStatus: any;
  filterLimit: any;
  pageLimit: any;
  bulkVerificationRecord = Bulk_verification_record;
  bulkVerificationStatus = Bulk_verifications_status;
  displayedColumns: string[] = ['no', 'Verificationid', 'Seriviceused', 'Trasactiondate', 'verificationStatus', 'Amount', 'Status', 'Timecompleted', 'Failurereson'];
  dataSource: ElementBulkVerificationTrasactions[];
  docDataSource: ElementBulkVerificationTrasactions[];
  bulkVerificationID: any;
  pendingCount: any;
  totalCount: any;
  totalPercentage: any;
  userdata: any;

  constructor(private route: ActivatedRoute, public wrapperService: WrapperServiceService, private tDateFormatPipe: TDateFormatPipe, public dialog: MatDialog,
              private storageService: StorageService
  ) {
    this.bulkVerificationID = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.userdata = this.storageService.getUserUserCredential();
    this.getAllBulkTransaction();
    this.getAllBulkCardStatic();
  }

  /* Get ALL Bulk Trasactions */
  getAllBulkTransaction(callback?) {
    this.pageLimit = this.limit;

    const params = new HttpParams()
      .set('page', this.page)
      .set('limit', this.limit);

    const bodyData = {
      baseuserid: this.userdata.user.id,
      bulkId: this.bulkVerificationID,
      search: this.searchData,
      invocationStatus: this.invocationStatus,
      verificationStatus: this.verificationStatus
    };

    this.wrapperService.getAllBulkTransaction(params, bodyData).subscribe(result => {
      if (callback) {
        callback(result.bulkWiseTransaction.bulkVerifications);
      } else {
        this.dataSource = result.bulkWiseTransaction.bulkVerifications;
      }
      this.length = result.bulkWiseTransaction.totalCount;
    });
  }

  /* Get all Bulk card Bulkcard static */
  getAllBulkCardStatic() {
    const params = new HttpParams();
    const bodyData = {
      bulkId: this.bulkVerificationID
    };
    this.wrapperService.getAllBulkCardStatic(params, bodyData).subscribe(result => {
      this.totalCount = result.bulkWiseTransaction;
      this.totalPercentage = result.bulkWiseTransaction;
    });
  }

  /* Search by Click */
  searchClick(searchKey: any) {
    if (this.searchData !== searchKey) {
      this.searchData = searchKey;
    }
    this.limit = AppConst.pageSize;
    this.page = 1;
    this.getAllBulkTransaction();
  }

  /* Search by keydown */
  search(searchKey: any) {
    if (this.searchData !== searchKey) {
      this.searchData = searchKey;
    }
    this.limit = AppConst.pageSize;
    this.page = 1;
    this.getAllBulkTransaction();

  }

  /* Bulk Status chnage */
  bulkStatusChange(event: any) {
    this.verificationStatus = event;
    this.getAllBulkTransaction();
  }


  /* Bulk Record chnage */
  bulkRecordChnage(event: any) {
    this.invocationStatus = event;
    this.getAllBulkTransaction();
  }

  /* get Pagination index */
  receiveMessage(event: any) {
    // console.log(event, 'event page');
    this.limit = event.pageSize;
    this.page = event.pageIndex + 1;
    this.getAllBulkTransaction();
  }

  /* Chnage All trasaction filter */
  changeTransactionFilter(data: any): void {
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        switch (key) {
          case 'pageSizeLimit':
            if (data[key] !== undefined) {
              this.filterLimit = data[key];
            }
            break;
        }
      }
    }
    if (this.filterLimit != AppConst.pageSize) {
      this.limit = this.filterLimit;
    } else {
      this.limit = AppConst.pageSize;
    }

    this.page = 1;
    this.getAllBulkTransaction();
  }

  /* Export file */
  changeExportFile(exportData: any) {
    const file = exportData.fileType;
    this.page = exportData.page + 1;
    this.limit = exportData.limit;
    this.getAllBulkTransaction((result: any) => {
      this.docDataSource = result;
      let csvBuilder: CsvBuilder;
      const date = new Date();
      const fileName = date.toISOString() + '-bulk-transaction';
      if (file !== undefined) {
        if (file == 'Excel') {
          csvBuilder = new CsvBuilder(fileName + '.xls');
          let index = 1;
          csvBuilder.setColumns(['#', 'VERIFICATION ID', 'SERVICE USED', 'TRASACTION DATE', 'VERIFICATION STATUS', 'AMOUNT', 'VERIFICATION STATUS', 'AMOUNT', 'STATUS', 'TIME COMPLETED', 'FAILURERESON']);
          this.docDataSource.forEach((result: any) => {
            // console.log(result, 'result of excel');
            const trasactionsDate = this.tDateFormatPipe.transform(result.transactionDate);
            const timecompleted = this.tDateFormatPipe.transform(result.responseTime);
            csvBuilder.addRow([index++, result.verificationId, result.serviceUsed, trasactionsDate, result.verificationStatus, result.amount, result.transactionStatus, timecompleted, result.transactionStatus, timecompleted, result.failureReason]);
          });
          csvBuilder.exportFile();
        } else if (file == 'Docx') {
          csvBuilder = new CsvBuilder(fileName + '.docx');
          let index = 1;
          csvBuilder.setColumns(['#', 'VERIFICATION ID', 'SERVICE USED', 'TRASACTION DATE', 'VERIFICATION STATUS', 'AMOUNT', 'VERIFICATION STATUS', 'AMOUNT', 'STATUS', 'TIME COMPLETED', 'FAILURERESON']);
          this.docDataSource.forEach((result: any) => {
            const trasactionsDate = this.tDateFormatPipe.transform(result.transactionDate);
            const timecompleted = this.tDateFormatPipe.transform(result.responseTime);
            csvBuilder.addRow([index++, result.verificationId, result.serviceUsed, trasactionsDate, result.verificationStatus, result.amount, result.transactionStatus, timecompleted, result.transactionStatus, timecompleted, result.failureReason]);
          });
          csvBuilder.exportFile();
        } else if (file == 'Pdf') {
          let doc = new jsPDF('landscape', 'pt', 'a4', true);
          let col = ['#', 'VERIFICATION ID', 'SERVICE USED', 'TRASACTION DATE', 'VERIFICATION STATUS', 'AMOUNT', 'VERIFICATION STATUS', 'AMOUNT', 'STATUS', 'TIME COMPLETED', 'FAILURERESON'];
          let rows = [];
          let index = 1;
          this.docDataSource.forEach((result: any) => {
            const trasactionsDate = this.tDateFormatPipe.transform(result.transactionDate);
            const timecompleted = this.tDateFormatPipe.transform(result.responseTime);
            let newRow = [index++, result.verificationId, result.serviceUsed, trasactionsDate, result.verificationStatus, result.amount, result.transactionStatus, timecompleted, result.transactionStatus, timecompleted, result.failureReason];
            rows.push(newRow);
          });
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
          });
          doc.save(fileName + '.pdf');
        }
      }
    });
  }

  ngOnDestroy(): void {
    localStorage.removeItem('bulkId');
  }

  getKeys(obj: any) {
    return Object.keys(obj);
  }

  openDetailsDialog(bulkData: any): void {
    const dialogRef = this.dialog.open(BulkDetailComponent, {
      panelClass: 'mobile-detail-popup',
      data: { bulkData: bulkData }
    });
  }
}
