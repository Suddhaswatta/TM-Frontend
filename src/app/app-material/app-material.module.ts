import { NgModule } from '@angular/core';
import {OverlayModule} from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDividerModule} from '@angular/material/divider';
import {MatDialogModule} from '@angular/material/dialog';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
@NgModule({
  declarations: [],
  imports: [

    MatProgressSpinnerModule,
    MatNativeDateModule,
    MatDatepickerModule,
    DragDropModule,
    ClipboardModule,
    MatDialogModule,
    MatSelectModule,
    MatTabsModule,
    MatToolbarModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatExpansionModule,
    OverlayModule


  ],

  exports:[
    OverlayModule,
    MatProgressSpinnerModule,
    MatNativeDateModule,
    MatDatepickerModule,
    DragDropModule,
    MatExpansionModule,
    ClipboardModule,
    MatDividerModule,
    MatTabsModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule

  ]
})
export class AppMaterialModule { }
