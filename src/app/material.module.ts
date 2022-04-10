import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatRippleModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';

const materialModules = [
  MatInputModule,
  MatCardModule,
  MatCheckboxModule,
  MatSlideToggleModule,
  MatFormFieldModule,
  MatButtonModule,
  MatBadgeModule,
  MatRippleModule,
  MatMenuModule,
  MatProgressBarModule,
  MatTableModule,
  MatSelectModule,
  MatRadioModule,
  MatTabsModule,
  MatSortModule,
  MatButtonToggleModule,
  MatChipsModule,
  MatExpansionModule,
  MatTooltipModule,
  MatDialogModule,
  DragDropModule,
  MatIconModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatSnackBarModule,
  CdkTreeModule,
  MatGridListModule,
];

@NgModule({
  imports: [
    materialModules
  ],
  exports: [
    materialModules
  ]
})
export class MaterialModule { }
