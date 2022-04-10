import { Injectable } from '@angular/core';
import { API } from 'src/app/services/end-points';
import { NetworkService } from 'src/app/services/network.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpParams, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const base_url = environment.apiHost;

@Injectable({
  providedIn: 'root'
})
export class WrapperServiceService {
  currentService: Subject<any> = new Subject();
  Onboarding: Subject<any> = new Subject();
  bulkJobId: Subject<any> = new Subject();
  tryAgainResponse: Subject<any> = new Subject();
  constructor(public networkService: NetworkService, public httpClient: HttpClient) { }

  /* Get all wrapper service */
  getAllWrapperServices(params?: HttpParams, bodyParams?: any): Observable<any> {
    return this.networkService.basicPost(API.WRAPPERSERVICES.Listing, params, bodyParams);
  }

  /* Get all service provider */
  getallIdProvider(params?: HttpParams): Observable<any> {
    return this.networkService.basicGet(API.WRAPPERSERVICES.AllProviders, params);
  }

  /* Get all trasactions */
  getAllTrasactions(params?: HttpParams, bodyParams?: any): Observable<any> {
    return this.networkService.basicPost(API.TRASACTIONS.Listing, params, bodyParams);
  }

  /* Get all trasactions Filter service */
  getAllTrasactionFilterService(params?: HttpParams, bodyParams?: any): Observable<any> {
    return this.networkService.basicPost(API.TRASACTIONS.ServiceFilter, params, bodyParams);
  }

  /* Get all bulk verification */
  getAllBulkVerification(params?: HttpParams, bodyParams?: any): Observable<any> {
    return this.networkService.basicPost(API.BULKVERIFICATION.Listing, params, bodyParams);
  }

  /* Get all bulk verification trasaction */
  getAllBulkTransaction(params?: HttpParams, bodyParams?: any): Observable<any> {
    return this.networkService.basicPost(API.BULKVERIFICATION.BulkTrasaction, params, bodyParams);
  }

  /* Get all bulk card Static */
  getAllBulkCardStatic(params?: HttpParams, bodyParams?: any): Observable<any> {
    return this.networkService.basicPost(API.BULKVERIFICATION.BulkCardStatistics, params, bodyParams);
  }

  callThirdPartyAPI(apiEndPoint: string, params?: HttpParams, bodyParams?: any, headerData?: any, isLive?: boolean): Observable<any> {
    return this.networkService.basicPostThirdParty(apiEndPoint, params, bodyParams, headerData, isLive);
  }

  /* Get all bulk card Static */
  getAllBulkWraperServices(params?: HttpParams, bodyParams?: any): Observable<any> {
    return this.networkService.basicPost(API.BULKVERIFICATION.BulkWrapperServices, params, bodyParams);
  }

  getBulkTemplate(params?: HttpParams, bodyParams?: any): Observable<any> {
    return this.networkService.basicPost(API.BULKVERIFICATION.DownloadTemplate, params, bodyParams);
  }

  changeToLiveOrTestMode(params?: HttpParams, bodyParams?: any): Observable<any> {
    return this.networkService.basicPost(API.WRAPPERSERVICES.ChangeLiveOrTestMode, params, bodyParams);
  }

  /* Get Dashboard card */
  getDashboardCard(params?: HttpParams, bodyParams?: any): Observable<any> {
    return this.networkService.basicPost(API.DASHBOARD.Listing, params, bodyParams);
  }

  /* get Dashboard bar card */
  getDashboardCardFilter(params?: HttpParams, bodyParams?: any): Observable<any> {
    return this.networkService.basicPost(API.DASHBOARD.Barcard, params, bodyParams);
  }

  /* get On Boarding users steps */
  getOnboardingUserSteps(params?: HttpParams, bodyParams?: any): Observable<any> {
    return this.networkService.basicPost(API.DASHBOARD.Onboarding, params, bodyParams);
  }

  s3DownloadRequestResponse(params?: HttpParams, bodyParams?: any): Observable<any> {
    return this.networkService.basicPost(API.TRASACTIONS.s3DownloadReqRes, params, bodyParams);
  }
  /* Logout */
  logOut(params?: HttpParams, bodyParams?: any): Observable<any> {
    return this.networkService.basicGet(API.AUTH.Logout, params);
  }

  verifyBulkRecords(params?: HttpParams, bodyParams?: any): Observable<any> {
    return this.networkService.basicPost(API.BULKVERIFICATION.UploadBulk, params, bodyParams);
  }

  getBillingCardDetails(params?: HttpParams, bodyParams?: any): Observable<any> {
    return this.networkService.basicPost(API.BILLING.Listing, params, bodyParams);
  }

  getBillingTableDetails(params?: HttpParams, bodyParams?: any): Observable<any> {
    return this.networkService.basicPost(API.BILLING.Details, params, bodyParams);
  }

  getBillingBandDetails(params?: HttpParams, bodyParams?: any): Observable<any> {
    return this.networkService.basicPost(API.BILLING.BandDetails, params, bodyParams);
  }
  getBillingWrapperservice(params?: HttpParams, bodyParams?: any): Observable<any> {
    return this.networkService.basicPost(API.BILLING.WrapperService, params, bodyParams);
  }

  // Create Wallet if the user has not exist
  walletCreation(params?: HttpParams, bodyParams?: any): Observable<any> {
    return this.networkService.basicPost(API.Wallet.Creation, params, bodyParams);
  }

  // Wallet component realted data
  getWalletData(params?: HttpParams, bodyParams?: any): Observable<any> {
    return this.networkService.basicPost(API.Wallet.WalletDetails, params, bodyParams);
  }

  // get user details
  getUserDetails(params?: HttpParams, bodyParams?: any): Observable<any> {
    return this.networkService.basicPost(API.AUTH.UserDetails, params, bodyParams);
  }

  //TourDismiss
  isTourDismiss(params?: HttpParams, bodyParams?: any): Observable<any> {
    return this.networkService.basicPost(API.TourDismiss.dismisstour, params, bodyParams);
  }


}
