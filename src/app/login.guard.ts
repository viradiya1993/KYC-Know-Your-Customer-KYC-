import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { UserCategoryEnum } from './models/config';
import { StorageService } from './services/storage.service';

@Injectable({ providedIn: 'root' })
export class LoginGuard implements CanActivate {
  constructor(private router: Router, private storageService: StorageService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const userdata = this.storageService.getUserUserCredential();
    const isGuest = this.storageService.getProductUserCategoryName()?.toUpperCase() === UserCategoryEnum.GUEST
    // if(isGuest) {
    //   this.router.navigate(['/guest']);
    // }else 
    
    if (userdata && userdata.user) {
      return false;
    } else {
      return true;
    }
  }
}
