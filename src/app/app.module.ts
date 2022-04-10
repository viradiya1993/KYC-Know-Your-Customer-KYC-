import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MaterialModule } from './material.module';
import { SharedModule } from './shared.module';
import { SimplebarAngularModule } from 'simplebar-angular';
import { HeaderComponent } from './components/header/header.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ActiveAccountNotificationComponent } from './components/active-account-notification/active-account-notification.component';
import { HttpInterceptorService } from './interceptor';
import { NetworkService } from './services/network.service';
import { WrapperServiceService } from './services/wrapper-services/wrapper-service.service';
import { ScrolltopService } from './services/scrolltop.service';
import { FormsModule } from '@angular/forms';
import { TDateFormatPipe } from './t-date-format.pipe';
import { DndDirective } from './dnd.directive';


import { ChartModule } from 'angular-highcharts';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { ResetLinkComponent } from './pages/reset-link/reset-link.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { ReseOnLoginComponent } from './pages/reset-on-login/reset-on-login.component';

import { NgIdleKeepaliveModule } from '@ng-idle/keepalive'; // this includes the core NgIdleModule but includes keepalive providers for easy wireup
import { MomentModule } from 'angular2-moment'; // optional, provides moment-style pipes for date formatting

import { ModalModule } from 'ngx-bootstrap/modal';
import { NoPermissionComponent } from './pages/no-permission/no-permission.component';

// tslint:disable-next-line: typedef
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/templates/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavComponent,
    ActiveAccountNotificationComponent,
    DndDirective,
    ForgetPasswordComponent,
    ResetLinkComponent,
    ResetPasswordComponent,
    ReseOnLoginComponent,
    NoPermissionComponent
   ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    NgIdleKeepaliveModule.forRoot(),
    MomentModule,
    AppRoutingModule,
    HttpClientModule,
    ModalModule.forRoot(),
    MaterialModule,
    SharedModule,
    SimplebarAngularModule,
    ChartModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient],
      },
  }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    },
    NetworkService,
    WrapperServiceService,
    ScrolltopService,
    TDateFormatPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
