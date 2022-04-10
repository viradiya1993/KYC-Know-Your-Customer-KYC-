import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuestVerificationComponent } from './guest-verification.component';
import { GuestVerificationComponentRoutingModule } from './guest-verification-routing.module';
import { SharedModule } from 'src/app/shared.module';



@NgModule({
  declarations: [
    GuestVerificationComponent
  ],
  schemas: [NO_ERRORS_SCHEMA],
  imports: [
    CommonModule,
    GuestVerificationComponentRoutingModule,
    SharedModule,
  ]
})
export class GuestVerificationModule { }
