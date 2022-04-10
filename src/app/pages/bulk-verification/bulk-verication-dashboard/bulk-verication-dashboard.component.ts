import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConst } from 'src/app/app.constant';
import { ElementBulkVerificationDashboard } from 'src/app/models/bulk-verification-dashboard.model';
import { WrapperServiceService } from 'src/app/services/wrapper-services/wrapper-service.service';
import { Bulk_verifications } from '../../../models/enums.model';
import { StorageService } from '../../../services/storage.service';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';

@Component({
  selector: 'app-bulk-verication-dashboard',
  templateUrl: './bulk-verication-dashboard.component.html',
  styleUrls: ['./bulk-verication-dashboard.component.scss']
})

export class BulkVericationDashboardComponent implements OnInit {
  page: any = 1;
  length: any;
  limit: any = AppConst.pageSize;
  index: number;
  toalOnGoingVerification = 0;
  totalCount = 0;
  mostUsedService: string;
  displayedColumns: string[] = ['no', 'UserName', 'BulkVerificationid', 'noverification', 'dateinitiated', 'datecomleted', 'status'];
  dataSource: ElementBulkVerificationDashboard[];
  searchValue: any;
  searchData: string;
  bulkStatus: any;
  bulk: any;
  bulkVerifications = Bulk_verifications;
  userdata: any;
  useBulk: any;
  constructor(public router: Router, public wrapperService: WrapperServiceService,
              private storageService: StorageService,public globalFunctionsService: GlobalFunctionsService
  ) { }

  ngOnInit(): void {
    this.useBulk = this.globalFunctionsService.checkPrivilages(AppConst.PRIVILAGE_CONSATNT.USE_BULK)
    this.userdata = this.storageService.getUserUserCredential();
    this.globalFunctionsService.exitIntroJS();
    this.getAllBulkVerification();
    // console.log(this.useBulk,'use bulk');
  }


  /* get All Bulk Verification */
  getAllBulkVerification() {
    const params = new HttpParams()
      .set('page', this.page)
      .set('limit', this.limit);

    const bodyData = {
      baseuserid: this.userdata.user.id,
      search: this.searchData,
      status: this.bulkStatus
    };

    this.wrapperService.getAllBulkVerification(params, bodyData).subscribe(result => {
      this.dataSource = result.bulkVerificationData.bulkVerifications;
      result.bulkVerificationData.mostUsedService.filter(a => this.mostUsedService = a.serviceName);
      this.totalCount = result.bulkVerificationData.totalCount;
      this.toalOnGoingVerification = result.bulkVerificationData.totalOnGoingVerifications;
      let tourRunning = false;
      const isTourRunning = StorageService.getItem('isTourRunning');
      if (isTourRunning !== undefined && isTourRunning == 'true') {
        tourRunning = true;
      }
      if (tourRunning === true) {
          setTimeout(() => {
            this.globalFunctionsService.initIntro();
            this.globalFunctionsService.goToStep(15);
          }, 1000)
      }
    });
  }

  /* search using click */
  searchClick(searchKey: any) {
    if (this.searchData !== searchKey) {
      this.searchData = searchKey;
    }
    this.getAllBulkVerification();
  }

  /* search using Keydown  */
  search(searchKey: any) {
    if (this.searchData !== searchKey) {
      this.searchData = searchKey;
    }
    this.getAllBulkVerification();
  }

  /* Bulk Job Status */
  bulkJobStatus(bulkStatus: any) {
    this.bulkStatus = bulkStatus;
    this.getAllBulkVerification();
  }

  /* Scroll to click */
  onBulkScroll() {
    let element = document.getElementById('bulkscroll');
    element.scrollIntoView(true);
  }

  /* get Bulk ID */
  getBulkID(id: any) {
    localStorage.setItem('bulkId', id);
    this.wrapperService.bulkJobId.next(id);
    this.router.navigate(['/bulk-verification/bulk-record', id]);
  }

  /* Get Object Key */
  getKeys(obj: any) {
    return Object.keys(obj);
  }
}
