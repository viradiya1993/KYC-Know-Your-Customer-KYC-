import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { TranslateModule } from '@ngx-translate/core';
import { PageFiltersComponent } from 'src/app/components/page-filters/page-filters.component';
import { MobileFiltersComponent } from 'src/app/components/mobile-filters/mobile-filters.component';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from './components/loader/loader.component';
import { SfxFormPreviewModule } from 'sfx-form-capture';
import { ChartsModule } from 'ng2-charts';
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import more from 'highcharts/highcharts-more.src';
import solidGauge from 'highcharts/modules/solid-gauge.src';

import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import * as moment from 'moment';
import { DateRangesComponent } from './components/date-ranges/date-ranges.component';
import { TDateFormatPipe } from './t-date-format.pipe';
import { ResponseCardComponent } from './components/response-card/response-card.component';
import { ProgressBarChartComponent } from './components/progress-bar-chart/progress-bar-chart.component'
import { ColumnChartComponent } from './components/column-chart/column-chart.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { UserIdelComponent } from './components/user-idel/user-idel.component';
import { TransactionsResultComponent } from './pages/transactions/transactions-result/transactions-result.component';

export function highchartsModules() {
  // apply Highcharts Modules to this array
  return [more, solidGauge];
}

@NgModule({
  declarations: [
    PageFiltersComponent,
    LoaderComponent,
    DateRangesComponent,
    TDateFormatPipe,
    MobileFiltersComponent,
    ResponseCardComponent,
    ProgressBarChartComponent,
    ColumnChartComponent,
    PieChartComponent,
    ErrorDialogComponent,
    UserIdelComponent,
    TransactionsResultComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    MaterialModule,
    TranslateModule,
    SfxFormPreviewModule,
    FormsModule,
    ChartsModule,
    ChartModule,
    NgxDaterangepickerMd.forRoot({

    })
  ],
  exports: [
    PageFiltersComponent,
    LoaderComponent,
    DateRangesComponent,
    TDateFormatPipe,
    ResponseCardComponent,
    SfxFormPreviewModule,
    MobileFiltersComponent,
    ProgressBarChartComponent,
    ColumnChartComponent,
    PieChartComponent,
    ErrorDialogComponent,
    UserIdelComponent,
    TransactionsResultComponent
  ],
  providers:[
    { provide: HIGHCHARTS_MODULES, useFactory: highchartsModules }
  ]
})

export class SharedModule { }
