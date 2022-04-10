import { Injectable } from '@angular/core';
import { AppConst } from 'src/app/app.constant';
import {
    Router,
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
} from '@angular/router';
import { StorageService } from './services/storage.service';
import { GlobalFunctionsService } from './services/global-functions.service';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';
const { PRIVILAGE_CONSATNT: { VIEW_DASHBOARD } } = AppConst
@Injectable({ providedIn: 'root' })
export class PrivilageGuard implements CanActivate {
    constructor(private router: Router, private storageService: StorageService, private globalFunctionsService: GlobalFunctionsService,
        private dialogRef: MatDialog
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const type = route.data.type as Array<string>;
        const userdata: any = this.storageService.getUserUserCredential();
        const contextData: any = this.storageService.getContextData();
        if ((userdata && contextData.privileges)) {
            let hasPrivilage = false;
            hasPrivilage = this.globalFunctionsService.checkPrivilages(type[0]);
            if (!hasPrivilage) {
                this.router.navigate(['/onboarding']);
                const privilege_error = 'You don\'t have the ' + type[0] + ' required privileges to perform this action';
                let errorMsg = [];

                if (type[0] === VIEW_DASHBOARD) {
                    this.router.navigateByUrl('/no-permission')
                    return false
                }

                errorMsg.push(privilege_error);
                const dialogRef = this.dialogRef.open(ErrorDialogComponent, {
                    width: "400px",
                    data: errorMsg,
                });
                dialogRef.afterClosed().subscribe((result) => {
                });

                return false;
            } else {
                return true;
            }
        } else {
            this.router.navigate(['/onboarding']);
            return false;
        }
    }
}

