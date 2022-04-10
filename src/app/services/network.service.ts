

import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseBody } from './response-body';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/internal/operators/map';
import { environment } from 'src/environments/environment';
import { GlobalFunctionsService } from './global-functions.service';


@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  apiHost: string;
  testModeBaseURL: string;
  liveModeBaseURL: string;
  constructor(private http: HttpClient, private globalFunctionsService: GlobalFunctionsService) {
    this.apiHost = environment.apiHost;
    this.testModeBaseURL = environment.NODE_URL_SERVICES;
    this.liveModeBaseURL = environment.NODE_URL_SERVICES;
  }

  basicPost(apiEndPoint: string, params?: HttpParams, bodyParams?: any): Observable<any> {
    const headersData = this.globalFunctionsService.getAcessTokenHeaders();
    return this.http
      .post<ResponseBody>(
        this.apiHost + '/' + apiEndPoint, JSON.stringify(bodyParams),
        {
          headers: headersData,
          observe: 'response',
          params: params,
        }
      )
      .pipe(
        map(response => {
          if (response.status === 200 || response.status === 201) {
            return response.body;
          }
          if (response.status === 204) {
            return null;
          } else {
            response.body
          }
        })
      );
  }

  basicGet(apiEndPoint: string, params?: HttpParams): Observable<any> {
    const headersData = this.globalFunctionsService.getAcessTokenHeaders();
    return this.http
      .get<ResponseBody>(
        this.apiHost + '/' + apiEndPoint,
        {
          headers: headersData,
          observe: 'response',
          params: params,
        }
      )
      .pipe(
        map(response => {
          if (response.status === 200 || response.status === 201) {
            return response.body;
          }
          if (response.status === 204) {
            return null;
          }
        })
      );
  }
  basicPostThirdParty(apiEndPoint: string, params?: HttpParams, bodyParams?: any, headersData?: any, isLive?: boolean): Observable<any> {
    let baseUrl = this.testModeBaseURL;
    if (isLive !== undefined && isLive === true) {
      baseUrl = this.liveModeBaseURL;
    }
    const headersDataNew = this.globalFunctionsService.getIdServicesHeaders(headersData);
    return this.http
      .post<ResponseBody>(
        baseUrl + apiEndPoint, JSON.stringify(bodyParams),
        {
          // headers: { "Content-Type": "application/json", "apiKey": headersData.apiKey, "userid": headersData.userId, 'Access-Control-Allow-Origin': '*' },
          headers: headersDataNew,
          observe: 'response',
          params: params,
        }
      )
      .pipe(
        map(response => {
          if (response.status === 200 || response.status === 201) {
            return response.body;
          }
          if (response.status === 204) {
            return null;
          }
        })
      );
  }

}
