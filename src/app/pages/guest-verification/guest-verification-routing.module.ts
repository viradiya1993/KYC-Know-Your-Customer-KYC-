import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuestVerificationComponent } from './guest-verification.component';

const routes: Routes = [
  {
    path:'',
    component:GuestVerificationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuestVerificationComponentRoutingModule { }
