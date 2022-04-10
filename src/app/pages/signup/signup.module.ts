import { NgModule,NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { SignupComponent } from './signup.component';
import { SharedModule } from 'src/app/shared.module';

const routes: Routes = [
  { path: "", component: SignupComponent }
]


@NgModule({
  declarations: [
    SignupComponent
  ],
  schemas:[NO_ERRORS_SCHEMA],
  imports: [
    CommonModule,
    SharedModule,
    MatProgressSpinnerModule,
    RouterModule.forChild(routes)
  ]
})
export class SignupModule { }
