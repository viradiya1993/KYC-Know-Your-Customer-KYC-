import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { ChartModule } from 'angular-highcharts';

import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { DashboardComponent } from './dashboard.component';


const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      { path: '', component: MainDashboardComponent, pathMatch: 'full' },
    ]
  },
];

@NgModule({
  declarations: [
    MainDashboardComponent,
    DashboardComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MaterialModule,
    SharedModule,
    TranslateModule,
    FormsModule,
    ChartsModule,
    ChartModule
  ]
})
export class DashboardModule { }
