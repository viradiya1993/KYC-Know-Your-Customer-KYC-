import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { LINKTYPES } from '../../models/enums.model';
import { loginConfig } from '../../app-config/signup-config';
import { RoutingEventService } from 'src/app/services/routing-event.service';
import { LandingPageConfig, IInput } from '../../models/config';
import { SettingsService } from 'src/app/services/settings.service';
import { CustomizationService } from 'src/app/services/customization.service';
import { PRODUCT_ID, LOGO } from '../../util/constants';
import { StorageService } from 'src/app/services/storage.service';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';

import 'base-frontend/build-dist/lib/config-module/base-config';
import 'base-frontend/build-dist/lib/auth-module/login/login-as-module';
import "base-frontend-components/dist/src/loaders/lazy-loader";
import french from 'src/assets/templates/french';
import english from 'src/assets/templates/english';
import { WrapperServiceService } from 'src/app/services/wrapper-services/wrapper-service.service';
import { HttpParams } from '@angular/common/http';
import { Route } from '@angular/compiler/src/core';
import { ErrorDialogComponent } from 'src/app/components/error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { UserIdelComponent } from 'src/app/components/user-idel/user-idel.component';
import { AppConst } from 'src/app/app.constant';
import { id } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isForgotPassword: boolean = false;
  isSignIn: boolean = true;
  translation = {};
  loginInputs: Array<IInput> = loginConfig.fieldProperties;
  langingPageConfig: LandingPageConfig = {
    images: loginConfig.carouselImages,
    headers: loginConfig.carouselHeader,
    texts: loginConfig.carouselText,
  };
  socialButtons = loginConfig.social;
  loginButtonText = loginConfig.loginButtonText;
  returnUrl: string;
  productId = PRODUCT_ID;
  loginConfigData: any
  countryImagesList: any
  isAvaliable: boolean = false;
  showLazyloader: boolean = false;
  logo: string = LOGO;
  @ViewChild('baseConfigRef', { static: true }) baseConfig: any;
  logoUrl: any;
  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;
  isOpenModel =  false;

  constructor(
    private routeEvent: RoutingEventService,
    private router: Router,
    private storageService: StorageService,
    private settingsService: SettingsService,
    private route: ActivatedRoute,
    public translate: TranslateService,
    private customizationService: CustomizationService,
    private globalFunctionsService: GlobalFunctionsService,
    private wrapperService: WrapperServiceService,
    private dialogRef: MatDialog,
    private idle: Idle,
    private keepalive: Keepalive,
  ) {
  }

  ngOnInit(): void {
    this.customizationService.setDefaultThemes();
    this.initializeConfig();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.storageService.setReturnUrl(this.returnUrl);
    if (this.logoUrl) {
      this.logo = null;
    }
    this.globalFunctionsService.isloggedIn.subscribe(value => {
      if (value === false) {
        this.idle.stop();
      }
    });
  }

  initializeConfig(): void {
    this.translation = english;
    this.translate.use('en');
    this.baseConfig.nativeElement.mainAppJson(this.translation);

    this.settingsService.getComponentConfig('baselogin').subscribe((result) => {
      if (result) {
        this.isAvaliable = true;
        this.loginConfigData = result;
        this.countryImagesList = result.countriesList;
        // this.langingPageConfig = {
        //   images: result.carouselImages,
        //   headers: result.carouselHeader,
        //   texts: result.carouselText,
        // };
        this.socialButtons = result.social;
        this.loginButtonText = result.loginButtonText;
      }
    });
  }

  updateTranslation(filename: string): void {

    this.settingsService.getTranslation(filename).subscribe((result) => {
      if (result) {
        this.translation = result;
        this.baseConfig.nativeElement.mainAppJson(result);
      }
    });
  }

  async handleComponentRoute({ detail }: { detail: { type: LINKTYPES } }): Promise<void> {
    let type = detail.type;

    const currentContext = JSON.parse(localStorage.getItem('current-context'))
    const isSFU = currentContext?.productUserCategoryBaseCode === 'PAM'

    if (isSFU && currentContext) {
      return this.routeEvent.goto(LINKTYPES.ADMIN_PANEL)
    }


    if (type !== LINKTYPES.DASHBOARD) {
      return this.routeEvent.goto(type)
    }

    const userdata = this.storageService.getUserUserCredential();
    const param = new HttpParams();
    const body = {
      baseuserid: userdata?.user?.id
    };

    console.log(userdata, detail, "=======================>");
    

    if (userdata && !isSFU) {
      if (!userdata.user.emailVerified) {
        return this.routeEvent.goto(LINKTYPES.GUEST_VERIFICATION)
      }
      this.wrapperService.getUserDetails(param, body).subscribe(result => {
        if (result.userDetails !== undefined && result.userDetails.userid !== undefined) {
          StorageService.setItem('userid', result.userDetails.userid);
          StorageService.setItem('is_dismissed_tour', result.userDetails.is_dismissed_tour)
          this.wrapperService.Onboarding.next(result.userid);
          if (userdata && userdata.user) {
            this.globalFunctionsService.isloggedIn.next(true);
            this.setUpIdeal(result.userDetails);
          } else {
            this.globalFunctionsService.isloggedIn.next(false);
          }
          if (type === LINKTYPES.DASHBOARD) {
            StorageService.setItem('loggedIn', 'true');
            if (result.userDetails.is_dismissed_tour === false) {
              StorageService.setItem('isTourRunning', 'true');
            }
            return this.routeEvent.goto(LINKTYPES.ONBOARDING);
          } else {
            this.routeEvent.goto(type);
          }
        } else {
          const errorMsg = ['User not found'];
          const dialogRef = this.dialogRef.open(ErrorDialogComponent, {
            width: "400px",
            data: errorMsg,
          });
          dialogRef.afterClosed().subscribe((result) => {
            window.location.reload();
          });
          this.storageService.logOut();
          this.globalFunctionsService.isloggedIn.next(false);
          this.router.navigate(['login']);
        }
      });
    }

  }

  languageChangeEvent({ detail }: { detail: { language: string } }): void {

    if (detail.language.toLowerCase() === 'french') {
      this.translation = french;
      this.translate.use('fr');
    } else if (detail.language.toLowerCase() === 'english') {
      this.translation = english;
      this.translate.use('en');
    }
    this.baseConfig.nativeElement.mainAppJson(this.translation);
  }

  setUpIdeal(obj: any): void {
    const sessionTimeOut: number = +obj.sessionTimeout;
    const sessionInterval: number = +obj.sessionInterval;
    this.idle.setIdle(sessionTimeOut);

    this.idle.setTimeout(sessionInterval);

    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    this.idle.onIdleEnd.subscribe(() => {
      /* if (this.timedOut === false) {
        this.reset();
        this.dialogRef.closeAll();
      } */
    });

    this.idle.onTimeout.subscribe(() => {
      this.idleState = 'Timed out!';
      this.timedOut = true;
      this.logout();
      this.dialogRef.closeAll();
    });

    this.idle.onIdleStart.subscribe(() => {
      console.log("onIdleStart");
      if (this.isOpenModel === false) {
        this.isOpenModel = true;
        this.openModel(sessionInterval);
      }
    });

    this.idle.onTimeoutWarning.subscribe((countdown) => {
    });

    // sets the ping interval to 15 seconds

    this.keepalive.interval(sessionInterval);

    this.keepalive.onPing.subscribe(() => this.lastPing = new Date());
    this.idle.watch();
    this.timedOut = false;
  }

  reset(): void {
    this.idle.watch();
    this.timedOut = false;
  }

  stay(): void {
    this.reset();
  }

  logout(): void {
    this.idle.stop();
    this.globalFunctionsService.isloggedIn.next(false);
    this.wrapperService.logOut();
    this.storageService.logOut()
    StorageService.removeItem('loggedIn');
    this.router.navigateByUrl('/login');
  }

  openModel(interval: number): void {
    this.idle.stop();
    const dialogRef = this.dialogRef.open(UserIdelComponent, {
      width: "400px",
      data: { 'interval': interval },
      hasBackdrop: false
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.isOpenModel = false;
      this.dialogRef.closeAll();
      if (result === 'stay') {
        this.stay();
      } else if (result === 'logout') {
        this.logout();
      }
    });
  }
}
