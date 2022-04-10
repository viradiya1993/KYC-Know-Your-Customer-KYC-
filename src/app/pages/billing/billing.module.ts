import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { BillingComponent } from './billing.component';
import { SharedModule } from 'src/app/shared.module';
import { MaterialModule } from 'src/app/material.module';
import { RequestModal } from './modal.component';
import { WalletComponent } from './wallet/wallet.component';
import { BillingDashboardComponent } from './billing-dashboard/billing-dashboard.component';
import { BalanceAlertModal } from './wallet/set-bal-alert-modal';
import { ChartsComponent } from 'src/app/components/charts/charts.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { WalletTopupComponent } from './wallet-topup/wallet-topup.component';

const routes: Routes = [
  {
    path: '', component: BillingComponent, children: [
      { path: '', component: BillingDashboardComponent, pathMatch: 'full' },
      { path: 'wallet', component: WalletComponent, pathMatch: 'full' },
      { path: 'topup', component: WalletTopupComponent, pathMatch:'full' }
    ]
  },
];

@NgModule({
  declarations: [
    BillingComponent,
    RequestModal,
    BalanceAlertModal,
    WalletComponent,
    ChartsComponent,
    WalletTopupComponent,
    BillingDashboardComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    MaterialModule,
    TranslateModule,
    NgxChartsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class BillingModule { }
