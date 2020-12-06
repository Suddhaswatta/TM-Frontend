import { CommService } from './../comm.service';
import { TaskService } from './../task.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from '../task';
import {TaskObject} from '../task-object';
@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.css']
})
export class CreateDialogComponent implements OnInit {

  currentDate = new Date();
  constructor(@Inject(MAT_DIALOG_DATA)public data: Task,
              private taskservice: TaskService,
              private comm: CommService,
              ) { }

  task: TaskObject;
  title: string;
  description: string;
  deadline: any;
  isDateValid = true;

  ngOnInit(): void {

    if ( this.data !== null){
    this.description = this.data.description;
    this.title = this.data.title;
    this.deadline = this.data.deadline;
    }

  }
  checkTitleValid(){

    if(this.title !== undefined && this.title.length >= 6){
      return true;
    }else{
      return false;
    }
  }

  checkDescriptionValid(){
    if(this.description !== undefined && this.description.length >= 14){
      return true;
    }else{
      return false;
    }
  }

  checkFormValid(){
    if(this.checkDescriptionValid() && this.checkTitleValid() ){
      return true;
    }
    else{
      console.log("Date Valid :" + this.isDateValid);
      return false;
    }
  }

  checkDateValid(){
    console.log('Deadline :'+this.deadline);

    if(this.deadline !== undefined && (this.deadline > new Date())){
      this.isDateValid = true;
      return true;
    }else{
      this.isDateValid = false;
      return false;
    }
  }
  dateChanged(){
    console.log(`Date Changed :${this.deadline}`);

  }
  handleSave(){


    if(this.checkFormValid()){


    if( this.data != null){

      const create = new TaskObject(this.data.id,
                                    new Date(),
                                    new Date(Date.parse(this.deadline)),
                                    this.data.assignTo,
                                    this.description,
                                    this.title,
                                    this.data.status);
      console.log('Update :' + JSON.stringify(create));

      this.taskservice.saveTask(create).
      subscribe(
        x => {
          console.log( ' Task Saved :' + JSON.stringify(x) );
          this.comm.setAction('update');
        }, e => {
          console.log(e);

        });
    }
    else {
      const task = {start: new Date(),
                    deadline: new Date(Date.parse(this.deadline)),
                    description: this.description,
                    title: this.title,
                    status : 'backlog'};
      console.log('Create :' + JSON.stringify(task));
      this
      .taskservice
      .saveTask(task)
      .subscribe(
        x => {
          console.log( ' Task Saved :' + JSON.stringify(x));
          this.comm.setAction('update');
        });
    }

    }
  }

  formatDate(date: Date){

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const dateString = `${day}/${month}/${year}`;
    console.log(dateString);

    return dateString;

  }

}
