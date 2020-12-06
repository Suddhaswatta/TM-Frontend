import { ErrorComponent } from './../error/error.component';
import { takeUntil } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RegisterDiagComponent } from '../register-diag/register-diag.component';
import { LoginService } from '../login.service';
import { Subject } from 'rxjs';
import { User } from '../user';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css']
})
export class SignComponent implements OnInit {


  notify = new Subject();
  hide: boolean = true;


  id: any;
  password: any;
  role: string;
  lastname: string;
  firstname: string;
  isRole: boolean = true;

  constructor(private router: Router, private dialog: MatDialog, private loginservice: LoginService) { }
  isUserLoggedIn$ = this.loginservice.isUserLoggedIn();
  ngOnInit(): void {

  }


  handleLogin(){


  this.loginservice.login$(this.id, this.password).subscribe(x =>
    {
      console.log(x);
      this.router.navigate(['dashboard']);
    }, error => {
      console.log(error);
      this.dialog.open(
        ErrorComponent,
        // tslint:disable-next-line: max-line-length
        {data: 'Wrong user ID or password '});
    }
    );

  }

  checkFirstname(){
    if(this.firstname !== undefined && this.firstname.length >= 3){
      return true;
    }
    return false;
  }
  checkRole(){
    if(this.role !== undefined){
      this.isRole = true;
      return true;
    }
      else{
      this.isRole = false;
      }
    return false;
  }


  handleRegister(){

    console.log({role: this.role, firstname: this.firstname, lastname: this.lastname});

    if ( this.checkFirstname() && this.checkRole()){
    const dialogRef = this.dialog.open(RegisterDiagComponent,
      {
        panelClass: 'custom',
        disableClose: true,
        data: { role: this.role, firstname: this.firstname, lastname: this.lastname}
      });

    }

  }

}
