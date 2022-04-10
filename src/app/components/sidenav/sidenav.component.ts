import { Component, OnInit, AfterViewInit, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { LoaderService, LoaderState } from '../../services/loader.service';
import { Subscription } from 'rxjs';
import { AppConst } from 'src/app/app.constant';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, AfterViewChecked  {

  mainMenuItems = [
    { title: 'Onboarding', link: '/onboarding', defaultIcon: 'assets/images/ic-onbording.svg', activeIcon: 'assets/images/ic-onbording-green.svg', isavailable: true, id: 'Onbording'},
    { title: 'Dashboard', link: '/dashboard', defaultIcon: 'assets/images/ic-dashboard.svg', activeIcon: 'assets/images/ic-dashboard-green.svg', isavailable: this.globalFunctionsService.checkPrivilages(AppConst.PRIVILAGE_CONSATNT.VIEW_DASHBOARD), id: 'Dashboard' },
    { title: 'Services', link: '/services', defaultIcon: 'assets/images/ic-services.svg', activeIcon: 'assets/images/ic-services-green.svg', isavailable: this.globalFunctionsService.checkPrivilages(AppConst.PRIVILAGE_CONSATNT.VIEW_SERVICES_PAGE), id: 'Services'},
    { title: 'Billing', link: '/billing', defaultIcon: 'assets/images/ic-billing.svg', activeIcon: 'assets/images/ic-billing-green.svg', isavailable:  this.globalFunctionsService.checkPrivilages(AppConst.PRIVILAGE_CONSATNT.VIEW_BILLING_PAGE), id: 'Billing'},
    { title: 'Transactions', link: '/transactions', defaultIcon: 'assets/images/ic-transactions.svg', activeIcon: 'assets/images/ic-transactions-green.svg', isavailable:  this.globalFunctionsService.checkPrivilages(AppConst.PRIVILAGE_CONSATNT.VIEW_TRANSACTIONS_PAGE), id: 'Transactions' },
    { title: 'Bulk Verifications', link: '/bulk-verification', defaultIcon: 'assets/images/ic-bulk-verification.svg', activeIcon: 'assets/images/ic-bulk-verification-green.svg', isavailable: this.globalFunctionsService.checkPrivilages(AppConst.PRIVILAGE_CONSATNT.VIEW_BULK_VERIFICATION_PAGE), id: 'Bulk-Verifications'},
    { title: 'Users', link: '/users', defaultIcon: 'assets/images/ic-users.svg', activeIcon: 'assets/images/ic-users-green.svg', isavailable: this.globalFunctionsService.checkPrivilages(AppConst.PRIVILAGE_CONSATNT.CREATE_USERS), id: 'Users'},
    { title: 'Roles', link: '/role', defaultIcon: 'assets/images/role.svg', activeIcon: 'assets/images/role.svg', isavailable: this.globalFunctionsService.checkPrivilages(AppConst.PRIVILAGE_CONSATNT.RMM), id: 'Roles' },
  ];

  constructor(
    public globalFunctionsService: GlobalFunctionsService,
    private loaderService: LoaderService,
    private cdRef: ChangeDetectorRef
    ) { }
  private subscription: Subscription;
  isDisablePointerEvent = false;
  ngOnInit(): void {
  }
  navigate() {
    var element = document.getElementById("menu-Main");
    element.classList.toggle("menu-open");
    document.body.classList.toggle("main-menu");
  }

  ngAfterViewChecked(): void {
    this.subscription = this.loaderService.loaderState
      .subscribe((state: LoaderState) => {
        this.isDisablePointerEvent = state.show;
        this.cdRef.detectChanges();
      });
  }

}
