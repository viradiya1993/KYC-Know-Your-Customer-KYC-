import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { WrapperServiceService } from 'src/app/services/wrapper-services/wrapper-service.service';
import { StorageService } from 'src/app/services/storage.service';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { LanguageService } from '../../services/language.service';
import { result } from 'cypress/types/lodash';
import french from 'src/assets/templates/french';
import english from 'src/assets/templates/english';




@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  heading: string;
  whichPage: string;
  headingInstant: any = {};
  sessionData = JSON.parse(sessionStorage.getItem('responseData'));
  seriveceName: any;
  bulkId: any;
  organisationName: any
  currentOrgName: any;
  userId: any;
  preferLn: string;
  constructor(private router: Router, private location: Location, public translateService: TranslateService, public wrapperService: WrapperServiceService,
    private storageService: StorageService,
    private globalFunctionsService: GlobalFunctionsService,
    private languageService: LanguageService
    ) {

      /* translateService.addLangs(['en', 'fr']);
      translateService.setDefaultLang('en');

      const browserLang = translateService.getBrowserLang();
      translateService.use(browserLang.match(/en|fr/) ? browserLang : 'en'); */

     
  }

  setHeading(url): void {
    const currentURL: string = url;
    switch (currentURL) {
      case '/':

      case '/onboarding':
        this.heading = this.headingInstant.Onboarding;
        this.whichPage = 'onboarding';
        break;

      case '/dashboard':
        this.heading = this.headingInstant.Dashboard
        this.whichPage = 'dashboard';
        break;

      case '/services':
        this.heading = this.headingInstant.Services;
        this.whichPage = 'services';
        break;

      case '/users':
        this.heading = this.headingInstant.Users;
        this.whichPage = 'users';
        break;

      case '/billing':
        this.heading = this.headingInstant.Billing;
        this.whichPage = 'billing';
        break;

      case '/billing/wallet':
        this.heading = this.headingInstant.Wallet;
        break;

      case '/billing/topup':
        this.heading = this.headingInstant.Wallet;
        this.whichPage = 'Wallet';
        break;

      case '/transactions':
        this.heading = this.headingInstant.Transactions;
        this.whichPage = 'transactions';
        break;

      case '/transactions/all':
        this.heading = this.headingInstant.Transactions_history;
        this.whichPage = 'transactions-all';
        break;

      case '/bulk-verification':
        this.heading = this.headingInstant.Bulk_verifications;
        this.whichPage = 'bulk-verification';
        break;

      case '/bulk-verification/bulk-record/' + this.bulkId:
        this.heading = this.headingInstant.Bulk_verifications;
        this.whichPage = 'bulk-verification-record';
        break;

      case '/admin_billing':
        this.heading = this.headingInstant.Admin_billing;
        this.whichPage = 'admin_billing';
        break;

      case '/services/verify-service':
        // this.heading = this.headingInstant.Verifications_service;
        this.whichPage = 'services_verify_service';
        if (this.sessionData !== null) {
          this.heading = this.sessionData.requestData.wrapperData.name;
        }
        break;
      case '/bulk-verification/verify-users':
        this.heading = this.headingInstant.Bulk_verifications;
        this.whichPage = 'bulk-verification-verify-user';
        break;

      case '/role':
          this.heading = this.headingInstant.role;
          this.whichPage = 'role';
          break;  
    }
  }

  ngOnInit(): void {
    this.preferLn = StorageService.getItem('prefered-language')
    this.organisationName = JSON.parse(window.localStorage.getItem("current-category"))
    this.currentOrgName = this.organisationName.name;
    this.translateService.get(['']).subscribe(translations => {
      this.headingInstant.Onboarding = this.translateService.instant('Onboarding');
      this.headingInstant.Dashboard = this.translateService.instant('Dashboard')
      this.headingInstant.Services = this.translateService.instant('Services');
      this.headingInstant.Users = this.translateService.instant('Users');
      this.headingInstant.Billing = this.translateService.instant('Billing');
      this.headingInstant.Wallet = this.translateService.instant("Wallet");
      this.headingInstant.Transactions = this.translateService.instant('Transactions');
      this.headingInstant.Transactions_history = this.translateService.instant('Transactions_history');
      this.headingInstant.Bulk_verifications = this.translateService.instant('Bulk Verifications');
      this.headingInstant.Admin_billing = this.translateService.instant('Admin Billing');
      this.headingInstant.role = this.translateService.instant('Role');
    });
    this.setHeading(this.router.url);
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.setHeading(e.url);
      }
    });
    this.bulkId = localStorage.getItem('bulkId');
    this.userId = localStorage.getItem("userid");
    this.assignServiceData();
  }

  /* Show service Data name */
  assignServiceData(): void {
    this.wrapperService.currentService.subscribe(result => {
      this.heading = result;
    });
    this.wrapperService.bulkJobId.subscribe(result => {
      this.bulkId = result;
    });
    this.wrapperService.Onboarding.subscribe(result => {
      this.userId = result;
    });
  }

  onBack() {
    this.location.back();
  }

  // menu toggle JS
  toggleMenu() {
    var element = document.getElementById("menu-Main");
    element.classList.toggle("menu-open");
    document.body.classList.toggle("main-menu");
  }

  logOut(): void {
    this.wrapperService.logOut().subscribe(result => {

    });
    this.globalFunctionsService.isloggedIn.next(false);
    /* this.wrapperService.currentService.unsubscribe();
    this.wrapperService.bulkJobId.unsubscribe();
    this.wrapperService.Onboarding.unsubscribe(); */
    this.storageService.logOut();
    this.router.navigateByUrl('/login')
  }

 
  onChangeLang(): void {
    // this.translateService.use(event);
    //this.languageService.changeLanguage(event);
    this.languageService.changeLanguage(this.preferLn)
  }

}
