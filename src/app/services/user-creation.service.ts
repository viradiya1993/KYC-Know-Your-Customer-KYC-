import {
  Observable,
  throwError as observableThrowError,
  throwError,
} from 'rxjs';

import { catchError, map, timeout } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Properties } from '../app-config/properties';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserCreationService {
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) { }
  defaultHeader = this.storageService.getFormCaptureExternalLinkHeaders()
  /**
   * A method that signs user up
   * @param {Object} user An object of user details required to sign up user for the first time
   * @param {String} productId The product id for the particular product
   * @returns [Observable] 
   */
   createUser(user: {}, productId: string): Observable<any> {
    let body = {
      ...user,
      productId,
    };

    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${this.storageService.getAuthUserToken()}`,
        ...this.defaultHeader
      }),
    };

    return this.http.post(Properties.CREATE_USER_ENDPOINT, body, options).pipe(
      timeout(50000),
      map((response: Response) => response),
      catchError((e) => {
        return observableThrowError(new Error(`${e.status}`));
      })
    );
  }

  updateUser(user: {}, userId: string, productId: string): Observable<any> {
    let body = {
      ...user,
      productId,
      userId,
    };

    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        ...this.defaultHeader
      }),
    };

    return this.http.post(Properties.EDIT_USER_ENDPOINT, body, options).pipe(
      timeout(50000),
      map((response: Response) => response),
      catchError((e) => {
        return observableThrowError(new Error(`${e.status}`));
      })
    );
  }

  updateUserProfile(user: {}, userId: string, productId: string): Observable<any> {
    let body = {
      ...user,
      productId,
      userId,
    };

    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        ...this.defaultHeader
      }),
    };

    return this.http.post(Properties.EDIT_USER_PROFILE_ENDPOINT, body, options).pipe(
      timeout(50000),
      map((response: Response) => response),
      catchError((e) => {
        return observableThrowError(new Error(`${e.status}`));
      })
    );
  }


  signup(user: {}, productId: string): Observable<any> {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http
      .post(Properties.SIGNUP_ENDPOINT, { ...user, productId }, options)
      .pipe(
        timeout(50000),
        map((response: Response) => response),
        catchError((e) => {
          return throwError(e);
        })
      );
  }

  organisationSignup(data): Observable<any> {
    return this.http.post(Properties.ORGANISATION_SIGNUP_ENDPOINT, data).pipe(
      timeout(50000),
      map((response: Response) => response),
      catchError((e) => {
        return throwError(e);
      })
    );
  }

  updatedOrganisationSignup(data):Observable<any>{

    let options = {
      headers: new HttpHeaders({
        'base-sign-up-channel': 'WEB',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        ...this.defaultHeader
      }),
    };
    return this.http.post(Properties.ORGANISATION_SIGNUP_UPDATED, data, options).pipe(
      timeout(50000),
      map((response: Response) => response),
      catchError((e) => {
        return throwError(e);
      })
    );
  }
  verifyOrganisation(data): Observable<any> {
    let options = {
      headers: new HttpHeaders({
        'api-key': 'IANI5uXuqI9InqlNTO3',
        userid: '106401f1-3ba8-493e-8112-7e83a8e6212e',
      }),
    };
    return this.http
      .post(Properties.VERIFY_ORGANISATION_ENDPOINT, data, options)
      .pipe(
        timeout(50000),
        map((response: Response) => response),
        catchError((e) => {
          return throwError(e);
        })
      );
  }

  createOrganisation(data): Observable<any> {
    return this.http.post(Properties.CREATE_ORGANISATION_ENDPOINT, data).pipe(
      timeout(50000),
      map((response: Response) => response),
      catchError((e) => {
        return throwError(e);
      })
    );
  }

  updateOrganisation(data): Observable<any> {
    return this.http.post(Properties.UPDATE_ORGANISATION_ENDPOINT, data).pipe(
      timeout(50000),
      map((response: Response) => response),
      catchError((e) => {
        return throwError(e);
      })
    );
  }

  updateOrganisationProfile(data): Observable<any> {
    return this.http.post(Properties.UPDATE_ORGANISATION_PROFILE_ENDPOINT, data).pipe(
      timeout(50000),
      map((response: Response) => response),
      catchError((e) => {
        return throwError(e);
      })
    );
  }

  getAllOrgs(): Observable<any> {
    
    return this.http
      .get(Properties.ORGANISATION_LIST_ENDPOINT + '?active=true',{
        headers: {
          ...this.defaultHeader
        }
      })
      .pipe(
        timeout(50000),
        catchError((e) => {
          return throwError(e);
        })
      );
  }

  getOrgBranch(orgId): Observable<any> {
    return this.http.get(Properties.BRANCH_LIST_ENDPOINT + `/${orgId}`, {
      headers:{
        ...this.defaultHeader
      }
    }).pipe(
      timeout(50000),
      catchError((e) => {
        return throwError(e);
      })
    );
  }

  getAuthHeader() {
    var header = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.storageService.getAuthUserToken()}`
      ),
    };

    return header;
  }

  getUserOrgProfile(orgId: string): Observable<any> {
    return this.http.get(Properties.GET_USER_ORG_PROFILE + `/${orgId}`, {
      headers:{
        ...this.defaultHeader
      }
    }).pipe(
      timeout(50000),
      catchError((e) => {
        return throwError(e);
      })
    );
  }

  getUserProfile(): Observable<any> {
    return this.http.get(Properties.GET_USER_PROFILE).pipe(
      timeout(50000),
      catchError((e) => {
        return throwError(e);
      })
    )
  }


  checkUsersForUniqueness(data):Observable<any>{
    return this.http.post(Properties.CHECK_USERS_FOR_UNIQUENESS, data).pipe(
      timeout(50000),
      map((response: Response) => response),
      catchError((e) => {
        return throwError(e);
      })
    );
  }

  checkOrganisationsForUniqueness(data):Observable<any>{
    return this.http.post(Properties.CHECK_ORGANIZATIONS_FOR_UNIQUENESS, data).pipe(
      timeout(50000),
      map((response: Response) => response),
      catchError((e) => {
        return throwError(e);
      })
    );
  }
}
