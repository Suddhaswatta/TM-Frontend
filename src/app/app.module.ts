import { InterceptorService } from './interceptor.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { SignComponent } from './sign/sign.component';
import { AppMaterialModule } from './app-material/app-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { RegisterDiagComponent } from './register-diag/register-diag.component';
import { CreateDialogComponent } from './create-dialog/create-dialog.component';
import { TaskListComponent } from './task-list/task-list.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { LoadingComponent } from './loading/loading.component';
import { AssignComponent } from './assign/assign.component';
import { ErrorComponent } from './error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignComponent,
    DashboardComponent,
    RegisterDiagComponent,
    CreateDialogComponent,
    TaskListComponent,
    LoadingComponent,
    AssignComponent,
    ErrorComponent
  ],
  imports: [
    FormsModule,
    FlexLayoutModule,
    AppMaterialModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS , useClass: InterceptorService, multi: true},
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
