import { Observable, throwError as observableThrowError, throwError } from 'rxjs';

import { catchError, map, timeout, retry } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Properties } from '../app-config/properties';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  constructor(private http: HttpClient) {}

  getProductFormType(productId, formType): Observable<any> {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }),
    };

    return this.http
      .get(
        `${Properties.GET_CONFIG_BY_TYPE_ENDPOINT}?formType=${formType}&productId=${productId}`,options
      )
      .pipe(
        retry(1),
        catchError((e) => {
          return throwError(e);
        })
      );
  }

  getAllProductForm(productId: string): Observable<any> {
    return this.http.get(`${Properties.GET_ALL_PRODUCT_FORM_TYPE_ENDPOINT}?productId=${productId}`).pipe(
      timeout(50000),
      map((response: Response) => {
        return response;
      }),
      catchError((e) => {
        return observableThrowError(new Error(`${e.status}`));
      })
    );
  }
}
