import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { WrapperServiceService } from 'src/app/services/wrapper-services/wrapper-service.service';
import { MatDialog } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { ServiceDetailsPopupComponent } from './service-details-popup/service-details-popup.component';
import { GoLivePopupComponent } from './go-live-popup/go-live-popup.component';
import { UserServicePopupComponent } from './user-service-popup/user-service-popup.component';
import { AppConst } from 'src/app/app.constant';
import { HttpParams } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { is } from 'cypress/types/bluebird';
import { StorageService } from '../../services/storage.service';
import { ErrorDialogComponent } from 'src/app/components/error-dialog/error-dialog.component';
import { ClientVerifyNotificationPopupComponent } from './client-verify-notification-popup/client-verify-notification-popup.component';


@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  searchKey: any = null;
  serviceListing: any[];

  page: any = 1;
  length: any;
  limit: any = AppConst.pageSize;
  index: number;

  bioMetricValue = [];
  serviceType: string;
  seriveProvider: any;
  serviceProviderId = [];
  dialogValue: any;
  sendValue: string = 'Bvm service';
  userid;
  userdata: any;
  introValue = false;
  isLoggedIn: boolean = false;
  activation_status: string;
  testMode: any;
  liveMode: any;
  verificationTypes: any;


  constructor(public wrapperService: WrapperServiceService, public dialog: MatDialog, public overlay: Overlay, public http: HttpClient,
    private router: Router, public globalFunctionsService: GlobalFunctionsService, public storageService: StorageService) { }

  ngOnInit(): void {
    this.verificationTypes = AppConst.VERIFICATIONRTYPES;
    this.userdata = this.storageService.getUserUserCredential();
    this.globalFunctionsService.exitIntroJS()
    this.getAllidProviders();
  }

  /* get all Id provider */
  getAllidProviders() {
    this.wrapperService.getallIdProvider().subscribe(result => {
      this.seriveProvider = result.verificationservice;
      this.getAllServices();
    });
  }

  /* get all wrapper services */
  getAllServices() {
    const params = new HttpParams()
      .set('page', this.page)
      .set('limit', this.limit);

    const bodyData = {
      serviceType: this.serviceType,
      name: this.searchKey,
      baseuserid: this.userdata.user.id,
      verificationServiceProviderId: this.serviceProviderId
    };

    this.wrapperService.getAllWrapperServices(params, bodyData).subscribe(result => {
      this.activation_status = result.activation_status;
      this.serviceListing = result.services;
      for (const key in this.serviceListing) {
        if (this.serviceListing.hasOwnProperty(key)) {
          this.serviceListing[key].thumb = '';
          this.serviceListing[key].useButtonError = '';
          this.serviceListing[key].useLiveToggleError = '';
          this.serviceListing[key].biometricEnabled = false;
          if (this.serviceListing[key]?.wrapperServiceProviders[0]?.serviceProviderFk2?.logo) {
            this.serviceListing[key].thumb = this.serviceListing[key].wrapperServiceProviders[0].serviceProviderFk2.logo;
          }
          this.serviceListing[key].isLive = false;
          this.serviceListing[key].apiKey = '';

          if (this.serviceListing[key].clientKeys !== undefined && this.serviceListing[key].clientKeys[0] !== undefined
            && this.serviceListing[key].clientKeys[0]['key'] !== undefined
            &&
            (this.serviceListing[key].clientKeys[0]['isLive'] === false || this.serviceListing[key].clientKeys[0]['isLive'] === true)) {
            this.serviceListing[key].apiKey = this.serviceListing[key].clientKeys[0]['key'];

            if (this.serviceListing[key].clientKeys[0]['isLive'] === true) {
              this.serviceListing[key].isLive = true;
            }
          }
          if (this.serviceListing[key].service_type === AppConst.ServiceType.BIOMETRICS) {
            this.serviceListing[key].biometricEnabled = true;
          }
        }
      }
      this.length = result.totalCount;
      this.userid = result.userid;
      let tourRunning = false;

      const isTourRunning = StorageService.getItem('isTourRunning')
      if (isTourRunning !== undefined && isTourRunning == 'true') {
        tourRunning = true;
      }
      if (tourRunning === true) {
        if (this.introValue === false) {
          setTimeout(() => {
            this.globalFunctionsService.initIntro();
            this.globalFunctionsService.goToStep(4);
            this.globalFunctionsService.startedIntro = true;
            this.introValue = true;
          }, 100);
        }
      }

    });
  }

  /* get Pagination index */
  receiveMessage(event: any) {
    this.limit = event.pageSize;
    this.page = event.pageIndex + 1;
    this.getAllServices();
  }

  changeService(event: any): void {
    this.serviceType = event;
    this.getAllServices();
  }

  /* service details model */
  openDetailsDialog(): void {
    const dialogRef = this.dialog.open(ServiceDetailsPopupComponent, {
      panelClass: 'service-detail-popup',
    });
  }

  /* test live model */
  openGoLiveDialog(): void {
    const dialogRef = this.dialog.open(GoLivePopupComponent, {
      panelClass: 'sm-popup',
    });
  }
  // open company not verified popup
  openClientVerificationPopup(): void {
    const dialogRef = this.dialog.open(ClientVerifyNotificationPopupComponent, {
      panelClass: 'sm-popup',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        StorageService.setItem('fromVerifyCompany', 'true');
        this.router.navigateByUrl('/onboarding');
      }
    });
  }

  hasPrivilages(service: any): boolean {
    if (service.published === true && service?.wrapperDetails?.form_json !== undefined && service?.wrapperDetails?.form_json !== null) {
      if (service.isLive === true) {
        this.testMode = !this.globalFunctionsService.checkPrivilages(AppConst.PRIVILAGE_CONSATNT.USE_SERVICE_LIVE)
        if (this.testMode === false) {
          service.useButtonError = 'You don\'t use service live privilege!';
          return this.testMode;
        }
        return !this.globalFunctionsService.checkPrivilages(AppConst.PRIVILAGE_CONSATNT.USE_SERVICE_LIVE);
      } else {
        this.liveMode = !this.globalFunctionsService.checkPrivilages(AppConst.PRIVILAGE_CONSATNT.USE_SERVICE_TEST);
        if (this.liveMode === false) {
          service.useButtonError = 'You don\'t use service test privilege!';
          return this.liveMode;
        }

        return !this.globalFunctionsService.checkPrivilages(AppConst.PRIVILAGE_CONSATNT.USE_SERVICE_TEST);
      }
    }

    if (service.published === false) {
      service.useButtonError = 'This service is currently not available for portal use!';
    } else if (service?.wrapperDetails?.form_json === undefined || service?.wrapperDetails?.form_json === null) {
      service.useButtonError = 'This service is currently not available for portal use!';
    }

    return true;

  }

  /* user service model */
  openUseServiceDialog(service: any): void {
    let AllowUseService = false;
    if (service.isLive === true) {
      AllowUseService = this.globalFunctionsService.checkPrivilages(AppConst.PRIVILAGE_CONSATNT.USE_SERVICE_LIVE);
    } else {
      AllowUseService = this.globalFunctionsService.checkPrivilages(AppConst.PRIVILAGE_CONSATNT.USE_SERVICE_TEST);
    }
    if (AllowUseService) {
      const dialogRef = this.dialog.open(UserServicePopupComponent, {
        panelClass: 'service-detail-popup',
        data: { wrapperService: service }
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          let tmpEndpoint = '';
          tmpEndpoint = service.wrapperDetails.live_mode_endpoint;
          /* if (service.isLive === true) {
            tmpEndpoint = service.wrapperDetails.live_mode_endpoint;
          } else {
            tmpEndpoint = service.wrapperDetails.test_mode_endpoint;
          } */
          const wrapperData = {
            wrapperId: service.pk,
            name: service.name,
            api_key: service.apiKey,
            endpoint: tmpEndpoint,
            isLive: service.isLive,
            formdata: result,
            wrapperref: service.wrapperRef,
            verificationType: service.verification_type
          };

          this.thirdPartyAPICall(wrapperData);
        }
      });
    } else {
      this.openGoLiveDialog();
    }
  }

  convertDateFormat(date): string {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(date, 'yyyy-MM-dd');
  }

  convertDateFormatBvnVerification(date): string {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(date, 'dd-MMM-yyyy');
  }

  thirdPartyAPICall(wrapperData: any): void {
    const params = new HttpParams();
    let bodyParms = {};
    bodyParms['verificationType'] = wrapperData.verificationType;
    for (const key in wrapperData.formdata) {
      if (wrapperData.formdata.hasOwnProperty(key)) {
        if (key === 'dob' && wrapperData.verificationType !== this.verificationTypes.BVN_BOOLEAN_MATCH) {
          bodyParms[key] = this.convertDateFormat(wrapperData.formdata[key]);
        } else if (key === 'dob' && wrapperData.verificationType === this.verificationTypes.BVN_BOOLEAN_MATCH) {
          bodyParms[key] = this.convertDateFormatBvnVerification(wrapperData.formdata[key]);
        } else if (key === 'phone') {
          let value = wrapperData.formdata[key];
          bodyParms[key] = value.replace(/\+/g, '');
        } else if (key === 'biometricImage') {
          const base64textString = btoa(wrapperData.formdata[key]);
          bodyParms[key] = base64textString;
        } else if (key === 'gender') {
          let value = wrapperData.formdata[key];
          if (value === 'Male') {
            bodyParms[key] = 'm';
          } else {
            bodyParms[key] = 'f';
          }
        } else {
          bodyParms[key] = wrapperData.formdata[key];
        }
      }
    }
    const headerParams = {
      apiKey: wrapperData.api_key,
      userId: this.userid
    };
    this.wrapperService.callThirdPartyAPI(wrapperData.endpoint, params, bodyParms, headerParams, wrapperData.isLive).subscribe(result => {
      if (result.responseCode === '00' || result.responseCode === '11') {
        const repsonseCardData = {
          requestData: {
            'bodyData': bodyParms,
            'headerData': headerParams,
            'wrapperData': wrapperData,
          },
          responseData: result,
          keyfrom: 'service'
        };
        localStorage.setItem('responseData', JSON.stringify(repsonseCardData));
        this.router.navigate(['/services/verify-service']);
      } else {
        let errorMsg = [];
        let msg: string;
        switch (result.responseCode) {
          case '01':
            msg = result.responseCode.description;
            break;
          case '12':
            msg = 'Insufficient Balance';
            break;
          case '13':
            msg = 'Invalid Credentials';
            break;
          case '14':
            msg = 'User is deactivated';
            break;
          case '15':
            msg = 'Third Party System is Unavailable';
            break;
          case '16':
            msg = 'Missing Required parameters';
            break;
          case '17':
            msg = 'Transaction Reference is invalid';
            break;
          default:
            msg = 'Something went wrong Please try after some time';
            break;
        }
        errorMsg.push(msg);
        const dialogRef = this.dialog.open(ErrorDialogComponent, {
          width: "400px",
          data: errorMsg,
        });
        dialogRef.afterClosed().subscribe((result) => {
        });
      }
    });
    /* this.http.get('assets/json/data.json').subscribe(result => {
      const repsonse: any = result;
      let localResponse: any;
      switch (wrapperData.wrapperId) {
        case '123':
          localResponse = repsonse.response.bvnBooleanFaceMatch;
          break;
        case '940':
          localResponse = repsonse.response.bvnFullDetails;
          break;
        case '960':
          localResponse = repsonse.response.bvnBoolean;
          break;
        case '990':
        case '1003':
          localResponse = repsonse.response.ninFullDetail;
          break;
      }
      if (localResponse.responseData.responseCode === '00' || localResponse.responseData.responseCode === '11') {
        localStorage.setItem('responseData', JSON.stringify(localResponse));
        this.router.navigate(['/services/verify-service']);
      } else {
        let errorMsg = [];
        let msg: string;
        switch (localResponse.responseData.responseCode) {
          case '12':
            msg = 'Insufficient Balance';
            break;
          case '13':
            msg = 'Invalid Credentials';
            break;
          case '14':
            msg = 'User is deactivated';
            break;
          case '15':
            msg = 'Third Party System is Unavailable';
            break;
          case '16':
            msg = 'Missing Required parameters';
            break;
          case '17':
            msg = 'Transaction Reference is invalid';
            break;
          default:
            msg = 'Something went wrong Please try after some time';
            break;
        }
        errorMsg.push(msg);
        const dialogRef = this.dialog.open(ErrorDialogComponent, {
          width: "400px",
          data: errorMsg,
        });
        dialogRef.afterClosed().subscribe((result) => {
        });
      }

    }); */
  }

  /* copy API key */
  copyText(val: string): void {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  /** Biometric chnage events*/
  receiveBioMetric(event: any) {
    this.bioMetricValue = event;
    this.getAllServices();
  }

  /* ID Provider chnages */
  receiveIdprovider(serviceId: any) {
    // this.bioMetricValue = true;
    this.bioMetricValue = []
    this.serviceProviderId = serviceId;
    this.getAllServices();
  }

  /* reviceve search value */
  receiveSearchValue(searchKey: any) {
    if (this.searchKey !== searchKey) {
      // this.bioMetricValue = true;
      this.searchKey = searchKey;
      this.limit = AppConst.pageSize;
      this.page = 1;
      this.getAllServices();
    }
  }
  changeAPICallModeFromMenu(service: any): void {
    if (service.isLive === false) {
      service.isLive = true;
    } else {
      service.isLive = false;
    }
    this.changeAPICallMode(service);
  }
  changeAPICallMode(service: any): void {
    if (service.isLive === true) {
      // we need to check some condition for the live mode
      if (this.globalFunctionsService.checkPrivilages(AppConst.PRIVILAGE_CONSATNT.SWITCH_TO_LIVE)
        && this.activation_status === AppConst.ActivicationStatus.APPROVED) {
        service.isLive = true;
        this.changeApiKeyIsLive(service, true);
      } else {
        setTimeout(() => {
          service.isLive = false;
        }, 100);
        // this.openGoLiveDialog();
        this.openClientVerificationPopup();
      }
    } else {
      service.isLive = false;
      this.changeApiKeyIsLive(service, false);
    }
  }
  hasLivePrivilage(service: any): boolean {
    if (service !== undefined && service.isLive === false) {
      if (!this.globalFunctionsService.checkPrivilages(AppConst.PRIVILAGE_CONSATNT.SWITCH_TO_LIVE)) {
        service.useLiveToggleError = 'You don\'t have the ' + AppConst.PRIVILAGE_CONSATNT.SWITCH_TO_LIVE + ' required privileges to perform this action'
        return true;
      }
      service.useLiveToggleError = '';
    }
    return false;
  }
  changeApiKeyIsLive(service, isLive: boolean): void {
    /* const params = new HttpParams();
    const bodyData = {
      pk: service.clientkeys[0].pk,
      is_live: isLive
    };
    this.wrapperService.changeToLiveOrTestMode(params, bodyData).subscribe(result => {
      service.clientkeys[0].isLive = isLive;
    }); */
    let bodyData = {};
    if (service.clientKeys !== undefined && service.clientKeys[0] !== undefined) {
      bodyData['pk'] = service.clientKeys[0].pk;
    }
    bodyData['is_live'] = isLive;
    this.createAPIKEY(service, bodyData, 'liveToggle');
  }

  copyAPIKEY(service): void {
    if (service.clientKeys === undefined || (service.clientKeys !== undefined && service.clientKeys[0] === undefined)) {
      this.createAPIKEY(service, {}, 'copyAPI');
    } else {
      this.copyText(service.apiKey);
    }
  }

  useService(service): void {
    if (service.clientKeys === undefined || (service.clientKeys !== undefined && service.clientKeys[0] === undefined)) {
      this.createAPIKEY(service, {}, 'useService');
    } else {
      this.openUseServiceDialog(service);
    }
  }

  createAPIKEY(service, bodyDataParam, from): void {
    const params = new HttpParams();
    const bodyData = bodyDataParam;
    bodyData['baseuserid'] = this.userdata.user.id;
    bodyData['wrapperfk'] = service.pk;
    // console.log(bodyData);
    this.wrapperService.changeToLiveOrTestMode(params, bodyData).subscribe(result => {
      if (result.code == 0) {
        if (bodyData.pk !== undefined) {
          service.clientKeys[0].isLive = bodyData.is_live;
          service.isLive = bodyData.is_live;
        } else {
          service.clientKeys = [];
          service.clientKeys.push(result.testLiveData.clientKeys);
          service.isLive = service.clientKeys[0]['isLive'];
          service.apiKey = service.clientKeys[0]['key'];
          if (from === 'copyAPI') {
            this.copyText(service.apiKey);
          } else if (from === 'useService') {
            this.openUseServiceDialog(service);
          }
        }
      }
    });
  }

}
