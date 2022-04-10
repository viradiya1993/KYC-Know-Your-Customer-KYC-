import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { OnboardingComponent } from './onboarding.component';
import { DashboardOnboardingComponent } from './dashboard-onboarding/dashboard-onboarding.component';



const routes: Routes = [
  {
    path: '', component: OnboardingComponent, children: [
      { path: '', component: DashboardOnboardingComponent, pathMatch: 'full' },
    ]
  },
];
@NgModule({
  declarations: [OnboardingComponent, DashboardOnboardingComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    SharedModule,
    TranslateModule,
    FormsModule
  ],
})
export class OnboardingModule { }
