import { CommService } from './../comm.service';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {LoginService} from '../login.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-register-diag',
  templateUrl: './register-diag.component.html',
  styleUrls: ['./register-diag.component.css']
})
export class RegisterDiagComponent implements OnInit, OnDestroy {

  constructor(@Inject(MAT_DIALOG_DATA)public data: any,
              private loginservice: LoginService,
              private comm: CommService) { }

  id;
  password;
  notify = new Subject();

  ngOnInit(): void {
    console.log('Registration data :'  + JSON.stringify(this.data));
    this.assignID(this.data.firstname, this.data.lastname);
    this.generatePassword();
  }

  handleAccept(){

    const object =
    {firstname: this.data.firstname,
      lastname: this.data.lastname,
      id: this.id,
      password: this.password,
      role: this.data.role
    };

    this.loginservice.register$(object).pipe(takeUntil(this.notify)).subscribe((res) => {
      this.comm.setAction(true);
      console.log('Register' + JSON.stringify(res));
      this.comm.setAction(false);

    }, (error) => {

      console.log(error);


    });

  }

  assignID(firstname, lastname){

    if ( firstname !== undefined){
      firstname = firstname.toLowerCase();
    }

    if ( lastname !== undefined){
      lastname = lastname.toLowerCase();
    }


    let generatedId = this.generateId(firstname, lastname);
    let i = 0;
    let duplicate = this.ifAlreadyExist(generatedId);
    while(duplicate){
      //generate ID again
      generatedId = this.generateId(firstname, lastname);
      duplicate = this.ifAlreadyExist(generatedId);
      if(i === 5){
        return;//Avoid Inf loop
      }
      i++;

    }

    this.id = generatedId;

  }

  generatePassword(){
    this.password = this.generatePattern('012345789ABCDEFGHIJKLMNOPQRST!@#$&*%abcdefghijklmnopqrstuvwxyz',14)
  }

  generateId(firstname, lastname){
    let alpha = '';
    let f = '';
    let l = '';
    let generatedID = '';
    if ( lastname !== undefined && lastname.length > 0){
      l = lastname.charAt(0)
      f = firstname.charAt(0)
      alpha = f + l;
      generatedID = alpha + this.generatePattern('0123456789', 6);
      return generatedID;
    }else{
      l = firstname.charAt(1);
      f = firstname.charAt(0);
      alpha = f + l;
      generatedID = alpha + this.generatePattern('0123456789', 6);
      return generatedID;

    }


  }
  generatePattern(pattern, size){

    let i = 0;
    let generatedValue = '';
    while (i < size){

      const index = Math.floor(Math.random() * pattern.length);
      generatedValue = generatedValue + pattern.charAt(index);

      i++;

    }
    return generatedValue;
  }
  ifAlreadyExist(id){
    //Make Api call
    //if null return true
    //else return false
    return false;
  }

  ngOnDestroy(): void {
    this.notify.next();
    this.notify.complete();
    console.log('Destroyed');

  }

}
