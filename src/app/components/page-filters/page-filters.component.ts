import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { filter } from 'rxjs/operators';
import { AppConst } from 'src/app/app.constant';
import { BiometricType, TransactionStatus, VerificationStatus, TransactionType, TransactionMode, ExportType, Bulk_verifications, ServiceType } from '../../models/enums.model';

@Component({
  selector: 'app-page-filters',
  templateUrl: './page-filters.component.html',
  styleUrls: ['./page-filters.component.scss']
})
export class PageFiltersComponent implements OnInit, OnChanges {

  @Output() bioMetricEvent = new EventEmitter<any>();
  @Output() serviceTypeEvent = new EventEmitter<any>();
  @Output() idProviderEvent = new EventEmitter<any>();
  @Output() billingVerificationStatusEvent = new EventEmitter<any>();
  @Output() searchEvent = new EventEmitter<any>();
  @Output() messageEvent: EventEmitter<any> = new EventEmitter();
  @Output() TransactionFilterEvent: EventEmitter<any> = new EventEmitter();
  @Output() ExportFile: EventEmitter<any> = new EventEmitter();

  @Input() serviceProvider: any;
  @Input() billingServiceWrappers: any;
  @Input() servicesUsed: any;
  @Input() childMessage: number;
  @Input() index: number;

  biometricTypes = BiometricType;
  serviceTypes = ServiceType;
  exportTypes = ExportType;
  transactionStatus = TransactionStatus;
  verificationStatus = VerificationStatus;
  transactionType = TransactionType;
  transactionMode = TransactionMode;
  bulkverification = Bulk_verifications;
  searchValue: any = '';
  bioMetric: any;
  serviceType: string;
  serviceId: any;
  billService: any;
  serviceTitle: string;
  transactionFilter: any = {};
  transactionFile: any;

  // MatPaginator Inputs
  @ViewChild(MatPaginator) paginator: MatPaginator;
  length: any;
  pageSize = AppConst.pageSize;
  pageLimits = AppConst.PageLimits.Limits;
  pageEvent: PageEvent;
  offSet: any = 1;
  whichPage: string;
  serviceTitleInstant: any = {};
  bulkId: any;




  constructor(private cdr: ChangeDetectorRef, private route: ActivatedRoute, private router: Router, private translateService: TranslateService) {
    this.bulkId = this.route.snapshot.paramMap.get("id");
  }



  /* Set Dyanamic All service title */
  setHeading(url): void {
    const currentURL: string = url;
    switch (currentURL) {
      case '/':
      case '/services':
        this.serviceTitle = this.serviceTitleInstant.Services;
        this.whichPage = 'services';
        break;
      case '/billing':
        this.serviceTitle = this.serviceTitleInstant.Billing_details;
        this.whichPage = 'billing';
        break;
      case '/transactions/all':
        this.serviceTitle = this.serviceTitleInstant.Transactions;
        this.whichPage = 'transactions-all';
        break;

      case '/bulk-verification':
        this.serviceTitle = this.serviceTitleInstant.Bulk_verifications;
        this.whichPage = 'bulk-verification';
        break;

      case '/bulk-verification/bulk-record/' + this.bulkId:
        this.serviceTitle = this.serviceTitleInstant.Bulk_verifications;
        this.whichPage = 'bulk-verification-record';
        break;

      case '/admin_billing':
        this.serviceTitle = this.serviceTitleInstant.Admin_billing;
        this.whichPage = 'admin_billing';
        break;
    }
  }

  ngOnInit(): void {
    this.translateService.get(['']).subscribe(translations => {
      this.serviceTitleInstant.Services = this.translateService.instant('All_services');
      this.serviceTitleInstant.Billing_details = this.translateService.instant('Billing_details');
      this.serviceTitleInstant.Transactions = this.translateService.instant('Transactions');
      this.serviceTitleInstant.Bulk_verifications = this.translateService.instant('Bulk Verifications');
      this.serviceTitleInstant.Bulk_verifications = this.translateService.instant('Verifications');
      this.serviceTitleInstant.Admin_billing = this.translateService.instant('Admin Billing');
    });

    /* this.pageSize =  */
    this.setHeading(this.router.url);
    this.clearFilter();
  }

  /* Clear Filter */
  clearFilter(): void {
    this.clearTransactionFilter();
  }

  /* Clear trasaction object */
  clearTransactionFilter(): void {
    this.transactionFilter = Object.assign({
      filterByPaymentStatus: '',
      filterByVerificationStatus: '',
      filterByTrasactionType: '',
      from: '',
      to: '',
      filterbySearchText: '',
      filterByService: '',
      filterByMode: '',
      pageSizeLimit: this.pageSize
    });
  }


  /* Date Filter chnage */

  dateFilter(data: any): void {
    this.transactionFilter.from = data.from;
    this.transactionFilter.to = data.to;
    this.transactionFilterChange();
  }

  /* Page index set trasaction  */
  transactionFilterChange(): void {
    this.cdr.detectChanges();
    this.paginator.pageIndex = this.index;
    this.pageSize = this.transactionFilter.pageSizeLimit;
    this.TransactionFilterEvent.emit(this.transactionFilter);
  }


  /* Change PageIndex */
  ngOnChanges() {
    this.cdr.detectChanges();
    this.paginator.pageIndex = this.index;
  }

  /* change export File */
  transactionFileChange() {
    const exportData = { fileType: this.transactionFile, limit: this.transactionFilter.pageSizeLimit, page: this.paginator.pageIndex };
    this.ExportFile.emit(exportData);
    this.transactionFile = '';
  }

  /* get next page event */
  getNext($event) {
    if (this.childMessage > 10) {
      this.messageEvent.emit($event);
    }
  }

  /* Biometric change */
  bioChange(event: any): void {
    this.bioMetricEvent.emit(event);
  }

  serviceTypeChange(event: any): void {
    this.serviceTypeEvent.emit(event);
  }
  /* ID Provider chnage */
  idProvider(event: any) {
    this.idProviderEvent.emit(event);
  }

  billingVerificationStatus(event: any) {
    this.billingVerificationStatusEvent.emit(event)
  }


  /* Key Enter OR Click Search */
  search(value: any) {
    if (value === null) {
      value = '';
    }
    this.searchEvent.emit(value);
  }

  /* Get all key from object */
  getKeys(obj: any) {
    return Object.keys(obj);
  }
}
