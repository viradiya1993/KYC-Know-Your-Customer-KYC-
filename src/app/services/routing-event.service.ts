import { Injectable } from '@angular/core';
import { LINKTYPES } from '../models/enums.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RoutingEventService {
  constructor(public router: Router) {}

  goto(type: LINKTYPES) {
    // Switch on each case and route
    switch (type) {
      case LINKTYPES.FORGET_PASSOWRD:
        this.router.navigateByUrl('/forget-password');
        return;
      case LINKTYPES.ROLE:
        this.router.navigateByUrl('/role');
        return;
        case LINKTYPES.RESET_ON_LOGIN:
        this.router.navigateByUrl("/reset-on-login-page");
        return;

      case LINKTYPES.RESET_PASSOWRD:
        this.router.navigateByUrl('/reset-password');
        return;

      case LINKTYPES.ADMIN_PANEL:
        this.router.navigateByUrl('/admin-panel');
        return;
      case LINKTYPES.ONBOARDING:
        this.router.navigateByUrl('/onboarding');
        return;

      case LINKTYPES.ONBOARDING:
        this.router.navigateByUrl('/onboarding');
        return;

      case LINKTYPES.DASHBOARD:
        this.router.navigateByUrl('/dashboard');
        return;

      case LINKTYPES.OTP:
        this.router.navigateByUrl('/login/2fa');
        return;

      case LINKTYPES.LOGIN:
      case LINKTYPES.HOMEPAGE:
        this.router.navigateByUrl('/login');
        return;
      case LINKTYPES.SIGNUP:
        this.router.navigateByUrl('/signup');
        return;
      case LINKTYPES.GUEST_VERIFICATION:
        this.router.navigateByUrl('/guest');
        return;
      default:
        return;
    }
  }
}
