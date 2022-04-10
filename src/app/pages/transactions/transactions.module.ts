import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { ChartsModule } from 'ng2-charts';


import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import * as moment from 'moment';

import { TransactionsComponent } from './transactions.component';
import { AllTransactionsComponent } from './all-transactions/all-transactions.component';
import { TransactionsDashboardComponent } from './transactions-dashboard/transactions-dashboard.component';
import { TransactionDetailComponent } from './transaction-detail/transaction-detail.component';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'angular-highcharts';
import { PrivilageGuard } from '../../privilage.guard';

const routes: Routes = [
  {
    path: '', component: TransactionsComponent, children: [
      { path: '', component: TransactionsDashboardComponent, pathMatch: 'full' },
      { path: 'all', component: AllTransactionsComponent, pathMatch: 'full'},
    ]
  },
];


@NgModule({
  declarations: [
    TransactionsComponent,
    AllTransactionsComponent,
    TransactionsDashboardComponent,
    TransactionDetailComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MaterialModule,
    SharedModule,
    TranslateModule,
    ChartsModule,
    ChartModule,
    FormsModule,
    NgxDaterangepickerMd.forRoot({

    })
  ]
})
export class TransactionsModule { }
