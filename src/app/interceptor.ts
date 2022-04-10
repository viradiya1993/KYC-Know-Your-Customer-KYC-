import { Injectable } from '@angular/core';
import { tap, finalize } from 'rxjs/operators';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, empty, from } from 'rxjs';
import { LoaderService } from './services/loader.service';
import { PRODUCT_ID } from './util/constants';
import { Router } from '@angular/router';
import { StorageService } from './services/storage.service';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { GlobalFunctionsService } from './services/global-functions.service';
import { WrapperServiceService } from './services/wrapper-services/wrapper-service.service'
@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  errorDes: string;
  private requests: HttpRequest<any>[] = [];
  constructor(public loaderService: LoaderService, private _router: Router, private storageService: StorageService,
    private dialogRef: MatDialog, private globalFunctionsService: GlobalFunctionsService, private wrapperService: WrapperServiceService) { }

  removeRequest(req: HttpRequest<any>) {
    const i = this.requests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1);
    }
    if (this.requests.length > 0 === false) {
      this.loaderService.hide();
    }
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.requests.push(req);

      this.loaderService.show('');


    let updatedRequest = null;
    if (req.url.includes('sign-up') || req.url.includes('organization/public/create-updated')) {
      updatedRequest = req.clone({
        headers: req.headers
          .set('Base-Product', PRODUCT_ID || '')
      });
    }

    return from(next.handle(updatedRequest || req).pipe(
      tap(
        (event) => {
          // logging the http response to browser's console in case of a success
          if (event instanceof HttpResponse) {
            // this.loaderService.hide();
            this.removeRequest(req);
          }
        },
        (error) => {
          // Hide Loader
          this.removeRequest(req);
          const errorMsg = [];
          let statusCode = 500;
          if (error !== undefined) {
            if (error !== undefined && error.error !== undefined) {
              this.errorDes = error.error.message;
              if (this.errorDes === undefined) {
                this.errorDes = error.error.description;
              }
            }
            if (this.errorDes === undefined) {
              this.errorDes = 'Something went wrong please try again after some time';
            }
            if (error.status !== undefined) {
              statusCode = error.status;
            }
            switch (error.status) {
              case 400:
                // Hide Loader
                // alert('Bad Request');
                errorMsg.push(statusCode + '- ' + this.errorDes);
                break;
              case 412:
                // Hide Loader
                // alert('Unprocessable Entity');
                errorMsg.push(statusCode + '- ' + this.errorDes);
                break;
              case 422:
                // Hide Loader
                // alert('Unprocessable Entity');
                errorMsg.push(statusCode + '- ' + this.errorDes);
                break;
              case 401:
                // Hide Loader
                // alert('Unauthorized');
                errorMsg.push(statusCode + '- ' + this.errorDes);
                break;
              case 500:
                // Hide Loader
                // alert('Internal server error');
                errorMsg.push(statusCode + '- ' + this.errorDes);
                break;
              case 503:
                // Hide Loader
                // alert('Internal server error');
                errorMsg.push(statusCode + '- ' + this.errorDes);
                break;
              default:
                // alert('Internal server error');
                errorMsg.push(statusCode + '- ' + this.errorDes);
                break;
            }
          } else {
            errorMsg.push('501' + '- ' + 'something went wrong try again some time');
            const dialogRef = this.dialogRef.open(ErrorDialogComponent, {
              width: "400px",
              data: errorMsg,
            });
            dialogRef.afterClosed().subscribe((result) => {
            });
          }

          if (error.status === 401) {
            /* const dialogRef = this.dialogRef.open(ErrorDialogComponent, {
              width: "400px",
              data: errorMsg,
            });
            dialogRef.afterClosed().subscribe((result) => {
            }); */
            this.wrapperService.logOut().subscribe(result => {

            });
            this.storageService.logOut();
            this.globalFunctionsService.isloggedIn.next(false);
            this._router.navigate(['login']);
            return;
          }
          if (error.status !== 200) {
            // open error handling dailog box or any other error handling
            const dialogRef = this.dialogRef.open(ErrorDialogComponent, {
              width: "400px",
              data: errorMsg,
            });
            dialogRef.afterClosed().subscribe((result) => {
            });
          }

          if (error instanceof HttpErrorResponse) {
            if (error.error && error.error.description === 'Unauthorise') {
              // fire login
              // this.storageService.logoutToken();
              // what im doing here is that after 2 milli-secs i wanna store the return url on LS so the user can go back to where the
              // session caught them from.. in other to make it easy to navigate
              setTimeout(() => {
                localStorage.setItem('RETURN_URL', this._router.url);
                this._router.navigate(['login']);
              }, 2);
            } else if (error.status === 403) {
              // let make the title page empty cos we going back to the home page
              this._router.navigate(['/not-found']);
            } else if (error.status === 401) {
              this.storageService.clearUserStorage();
              this._router.navigate(['login']);
            }
          }
          // logging the http response to browser's console in case of a failuer

        }
      ),
      finalize(() => {
        // this.loaderService.hide();
      })
    ));
  }
}
