import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared.module';
import { TranslateModule } from '@ngx-translate/core';


import { RouterModule, Routes } from '@angular/router';
import { BulkVerificationComponent } from './bulk-verification.component';
import { BulkVericationDashboardComponent } from './bulk-verication-dashboard/bulk-verication-dashboard.component';
import { BulkVericationRecordComponent } from './bulk-verication-record/bulk-verication-record.component';
import { DateFormatPipe } from 'src/app/date-format-pipe.pipe';
import { VerifyUsersComponent } from './verify-users/verify-users.component';
import { ProgressComponent } from './progress/progress.component';
import { VerifyUsersResultComponent } from './verify-users-result/verify-users-result.component';
import { BulkDetailComponent } from './bulk-detail/bulk-detail.component';
import { PrivilageGuard } from '../../privilage.guard';



const routes: Routes = [
  {
    path: '', component: BulkVerificationComponent, children: [
      { path: '', component: BulkVericationDashboardComponent, pathMatch: 'full' },
      { path: 'bulk-record/:id', component: BulkVericationRecordComponent, pathMatch: 'full' },
      { path: 'verify-users', component: VerifyUsersComponent, pathMatch: 'full', canActivate: [PrivilageGuard], data: {type: ['USE_BULK']} },
      { path: 'verify-users/result', component: VerifyUsersResultComponent, pathMatch: 'full', canActivate: [PrivilageGuard], data: {type: ['USE_BULK']} }
    ]
  },
];

@NgModule({
  declarations: [
        BulkVerificationComponent,
        BulkVericationDashboardComponent,
        BulkVericationRecordComponent,
        VerifyUsersComponent,
        ProgressComponent,
        VerifyUsersResultComponent,
        BulkDetailComponent,
      ],
  
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MaterialModule,
    SharedModule,
    TranslateModule,
    FormsModule,
  ],
 
})
export class BulkVerificationModule { }
