import { RouteGuardService } from './route-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignComponent } from './sign/sign.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
  {path: '', redirectTo : 'login', pathMatch : 'full'},
  {path: 'login' , component: SignComponent},
  {path: 'dashboard' , component: DashboardComponent, canActivate: [RouteGuardService]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
