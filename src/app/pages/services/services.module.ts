import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ServicesComponent } from './services.component';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared.module';
import { ServiceDetailsPopupComponent } from './service-details-popup/service-details-popup.component';
import { GoLivePopupComponent } from './go-live-popup/go-live-popup.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { DateFormatPipe } from 'src/app/date-format-pipe.pipe';
import { UserServicePopupComponent } from './user-service-popup/user-service-popup.component';
import { SfxFormPreviewModule } from 'sfx-form-capture';
import { VerifyServiceComponent } from './verify-service/verify-service.component';
import { ServiceDashboardComponent } from './service-dashboard.component';
import { ClientVerifyNotificationPopupComponent } from './client-verify-notification-popup/client-verify-notification-popup.component';

const routes: Routes = [
  { path: '', component: ServiceDashboardComponent, children: [
    { path: '', component: ServicesComponent, pathMatch: 'full' },
    { path: 'verify-service', component: VerifyServiceComponent, pathMatch: 'full' },
  ] }
];

@NgModule({
  declarations: [
    ServicesComponent,
    ServiceDetailsPopupComponent,
    GoLivePopupComponent,
    DateFormatPipe,
    UserServicePopupComponent,
    VerifyServiceComponent,
    ServiceDashboardComponent,
    ClientVerifyNotificationPopupComponent
  ],
  schemas:[NO_ERRORS_SCHEMA],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MaterialModule,
    SharedModule,
    TranslateModule,
    FormsModule,
    SfxFormPreviewModule
  ]
})
export class ServicesModule { }
