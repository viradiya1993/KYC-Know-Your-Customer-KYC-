import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Properties } from '../app-config/properties';
import pSBC from 'shade-blend-color';
import { catchError, map, retry } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { StorageService } from './storage.service';
import { DOCUMENT } from '@angular/common';
import { AppConst } from '../app.constant';

@Injectable({
  providedIn: 'root'
})
export class CustomizationService implements Resolve<any> {

  defaultTheme:any=AppConst.DEFAULT_THEME;
  constructor(
    private http: HttpClient,
    private storageService:StorageService,
    @Inject(DOCUMENT) private _document: HTMLDocument
  ) { }


  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | boolean {
     this.storageService.setDefaultTheme(this.defaultTheme);
     this.setDefaultThemes();
     return
  }

  getTheme(){
    return this.http.get(Properties.RETRIEVE_WHITE_LABEL).pipe(
      catchError((e) => {
        return throwError(e);
      })
    );
  }

  setDefaultThemes(){
       let themes = this.storageService.getDefaultTheme();
       if(!themes){
         themes = this.defaultTheme;
       }
       Object.keys(themes).map(key=>{
        if(key =='primary-color' || key =='base-font'){
          document.documentElement.style.setProperty(
            `--${key}`,
           themes[key]
          );
          if(key == 'primary-color'){
            this.setVariantPrimaryColors(themes[key]);
          }
        }
        if(key == 'favicon'){        
          this._document.getElementById('appFavicon').setAttribute('href', "data:image/jpeg;base64,"+themes[key]);
        }
       });
  }

   setDocStyle(selectorType,color){
    document.documentElement.style.setProperty(
      selectorType,
      color
    );
   }
  setVariantPrimaryColors(primaryColor){
    this.setDocStyle('--light-primary-color',pSBC ( 0.4, primaryColor ));
    this.setDocStyle('--lighter-primary-color',"#F5FFF8");
    this.setDocStyle('--lightest-primary-color',pSBC ( 0.9, primaryColor ));
  }
}


