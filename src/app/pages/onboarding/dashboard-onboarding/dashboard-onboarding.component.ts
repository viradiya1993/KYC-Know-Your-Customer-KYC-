import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { result } from 'cypress/types/lodash';
import { StorageService } from 'src/app/services/storage.service';
import { WrapperServiceService } from 'src/app/services/wrapper-services/wrapper-service.service';
import { UserActions } from 'src/app/models/enums.model';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConst } from 'src/app/app.constant';
import { UserServicePopupComponent } from '../../services/user-service-popup/user-service-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/components/error-dialog/error-dialog.component';
import { TransactionsResultComponent } from '../../transactions/transactions-result/transactions-result.component';

@Component({
  selector: 'app-dashboard-onboarding',
  templateUrl: './dashboard-onboarding.component.html',
  styleUrls: ['./dashboard-onboarding.component.scss']
})
export class DashboardOnboardingComponent implements OnInit, OnDestroy {
  onBorading: UserActions;
  onBoradingOrgData: any;
  isOnborading: boolean = false;
  userdata: any;
  userId: string;
  apiDocUrl: any = AppConst.apiUrl;
  adminApiKey: string;
  adminUserId: string;
  constructor(
    private http: HttpClient,
    private router: Router,
    private storageService: StorageService,
    private wrapperService: WrapperServiceService,
    private globalFunctionsService: GlobalFunctionsService,
    private dialog: MatDialog
  ) { }
  loggedIn: boolean = false;
  ngOnInit(): void {
    // this.apiDocUrl = AppConst.apiUrl
    this.userdata = this.storageService.getUserUserCredential();
    this.globalFunctionsService.exitIntroJS();
    this.userId = StorageService.getItem('userid');
    const params = new HttpParams();
    let body = {
      baseuserid: this.userdata.user.id
    };
    const baseOrgData = this.globalFunctionsService.getOrgBaseDetails();
    for (const key in baseOrgData) {
      if (baseOrgData.hasOwnProperty(key)) {
        const element = baseOrgData[key];
        body[key] = element;
      }
    }
    this.wrapperService.getOnboardingUserSteps(params, body).subscribe((result: any) => {
      /*  this.wrapperService.Onboarding.next(result.userid);
       window.localStorage.setItem("userid", result.userid) */
      this.onBorading = result.userActions;
      this.onBoradingOrgData = result.userActions;
      this.adminApiKey = result.adminApiKey;
      this.adminUserId = result.adminUserId;
      const isLoggedIn = StorageService.getItem('loggedIn');
      const isTourRunning = StorageService.getItem('isTourRunning');
      const isVerifyCompany = StorageService.getItem('fromVerifyCompany');
      StorageService.removeItem('fromVerifyCompany');
      if (isVerifyCompany !== undefined && isVerifyCompany === 'true') {
        this.openRCVerification();
      }
      if (isTourRunning != undefined && isTourRunning == 'true') {
        this.loggedIn = true;
        setTimeout(() => {
          if (this.globalFunctionsService.startedIntro == true) {
            this.globalFunctionsService.initIntro();
            this.globalFunctionsService.goToStep(7);
            this.globalFunctionsService.startedIntro = false;
          } else {
            this.globalFunctionsService.initIntro();
            this.globalFunctionsService.modalOpen = true;
          }
        }, 500);
      }
      if (isLoggedIn !== undefined && isLoggedIn == 'true' && isTourRunning == undefined) {
        StorageService.removeItem('loggedIn');
        for (const key in this.onBorading) {
          if (this.onBorading[key] === false) {
            this.isOnborading = true;
            break;
          }
        }
        if (this.isOnborading === false) {
          this.router.navigate(['/dashboard']);
        }
      }
    });

    this.globalFunctionsService.isdismissed.subscribe(result => {
      const isAlreadyDismissed = StorageService.getItem('is_dismissed_tour');
      if (isAlreadyDismissed === undefined || isAlreadyDismissed === 'false') {
        const params = new HttpParams();
        let body = {
          baseuserid: this.userdata.user.id
        };
        this.wrapperService.isTourDismiss(params, body).subscribe(result => {
          if (result.code === 0) {
            StorageService.setItem('is_dismissed_tour', 'true');
          }
        });
      }
    });
  }
  gotoTour() {
    StorageService.setItem('isTourRunning', 'true');
    this.globalFunctionsService.modalOpen = true;
    // this.router.navigate(['onboarding']);
    window.location.reload();
  }
  ngOnDestroy(): void {
  }
  openRCVerification(): void {
    if (this.onBoradingOrgData.clientDetails?.freeRcVerificationEligibility === true) {
      this.openModel(true);
    } else {
      if (this.onBoradingOrgData.clinetkeys !== undefined && this.onBoradingOrgData.clinetkeys?.clientkeys_key) {
        this.openModel(false);
      } else {
        const params = new HttpParams();
        let bodyData = {
          'baseuserid': this.userdata.user.id,
          'wrapperfk': this.onBoradingOrgData.wrapperDetails.pk
        };
        this.wrapperService.changeToLiveOrTestMode(params, bodyData).subscribe(result => {
          this.onBoradingOrgData.clinetkeys = {};
          this.onBoradingOrgData.clinetkeys.clientkeys_key = result.testLiveData.clientKeys.key;
          this.onBoradingOrgData.clinetkeys.clientkeys_pk = result.testLiveData.clientKeys.pk;
          this.onBoradingOrgData.clinetkeys.is_live = result.testLiveData.clientKeys.is_live;
          this.openModel(false);
        });
      }
    }
  }
  openModel(isFreeRCVerification: boolean): void {
    // console.log("this.onBoradingOrgData ", this.onBoradingOrgData);
    let service: any = this.onBoradingOrgData.wrapperDetails;
    service['isRC'] = true;
    const dialogRef = this.dialog.open(UserServicePopupComponent, {
      panelClass: 'service-detail-popup',
      data: { wrapperService: service },
      hasBackdrop: false
    });
    dialogRef.afterClosed().subscribe((formData: any) => {
      if (formData) {
        const endPoint = service.wrapperDetails.live_mode_endpoint;
        const params = new HttpParams();
        let bodyParms: any = {};
        bodyParms['verificationType'] = service.verification_type;
        for (const key in formData) {
          if (formData.hasOwnProperty(key)) {
            bodyParms[key] = formData[key];
          }
        }
        let headerParams = {
          apiKey: this.onBoradingOrgData.clinetkeys?.clientkeys_key,
          userId: this.userId
        };
        if (isFreeRCVerification === true) {
          headerParams = {
            apiKey: this.adminApiKey,
            userId: this.adminUserId
          };
          bodyParms['clientUserid'] = this.userId;
        }
        let isLive = false;
        isLive = this.onBoradingOrgData.clinetkeys?.is_live;
        this.wrapperService.callThirdPartyAPI(endPoint, params, bodyParms, headerParams, isLive).subscribe(result => {
          if (result.responseCode === '00' || result.responseCode === '11' ||
            result.responseCode === '18' || result.responseCode === '19') {
            const rcResponse = {
              responseData: result
            };
            const dialogRef = this.dialog.open(TransactionsResultComponent, {
              panelClass: 'transactions-result-popup',
              data: { transactionResult: rcResponse },
              hasBackdrop: false
            });
            dialogRef.afterClosed().subscribe((resultPopup: any) => {
              const params = new HttpParams();
              let body = {
                baseuserid: this.userdata.user.id
              };
              const baseOrgData = this.globalFunctionsService.getOrgBaseDetails();
              for (const key in baseOrgData) {
                if (baseOrgData.hasOwnProperty(key)) {
                  const element = baseOrgData[key];
                  body[key] = element;
                }
              }
              this.wrapperService.getOnboardingUserSteps(params, body).subscribe((resultOnboarding: any) => {
                this.onBorading = resultOnboarding.userActions;
                this.onBoradingOrgData = resultOnboarding.userActions;
                this.adminApiKey = resultOnboarding.adminApiKey;
                this.adminUserId = resultOnboarding.adminUserId;
              });
            });
          } else {
            let errorMsg = [];
            let msg: string;
            msg = result.responseCode.description;
            errorMsg.push(msg);
            const dialogRef = this.dialog.open(ErrorDialogComponent, {
              width: "400px",
              data: errorMsg,
            });
            dialogRef.afterClosed().subscribe((result) => {
            });
          }

        });
      }
    });
  }
}
