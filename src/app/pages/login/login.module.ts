import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from 'src/app/shared.module';
import { LoginComponent } from './login.component';

const routes: Routes = [
  { path: "", component: LoginComponent }
]

@NgModule({
  declarations: [LoginComponent],
  schemas:[NO_ERRORS_SCHEMA],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class LoginModule { }
