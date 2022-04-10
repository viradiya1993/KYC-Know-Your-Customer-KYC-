import { Observable, throwError as observableThrowError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, timeout } from 'rxjs/operators';
import { Properties } from '../app-config/properties';
// import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor(
    private http: HttpClient,
  ) { }


  getTranslation(filename: string) {
    return this.http
      .get(`${Properties.GET_CONFIG_API_ENDPOINT}${filename}.json`, {
        responseType: 'text' as 'text',
      })
      .pipe(
        timeout(50000),
        map((response: any) => {
          const res: any = JSON.parse(response);
          if (res.metadata) {
            return res;
          }
        }),
        catchError((e) => {
          return observableThrowError(new Error(`${e.status} ${e.statusText}`));
        })
      );
  }

  getComponentConfig(filename: string) {
    return this.http
      .get(`${Properties.GET_CONFIG_API_ENDPOINT}${filename}.json`, {
        responseType: 'text' as 'text',
      })
      .pipe(
        timeout(50000),
        map((response: any) => {
          const res: any = JSON.parse(response);
          if (res.code == 0) {
            return res;
          }
        }),
        catchError((e) => {
          return observableThrowError(new Error(`${e.status} ${e.statusText}`));
        })
      );
  }


  getComponentSettings(
    productId: string,
    componentName: string
  ): Observable<any> {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http
      .get(
        `${Properties.GET_COMPONENT_SETTING_ENDPOINT}?componentName=${componentName}&productId=${productId}`,
        options
      )
      .pipe(
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
