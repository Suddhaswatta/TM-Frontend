import { CommService } from './../comm.service';
import { Observable } from 'rxjs';
import { TaskService } from './../task.service';
import { Component, OnInit, Inject } from '@angular/core';
import { User } from '../user';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from '../task';

@Component({
  selector: 'app-assign',
  templateUrl: './assign.component.html',
  styleUrls: ['./assign.component.css']
})
export class AssignComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA)public data: Task,
              private taskservice: TaskService,
              private comm: CommService) {}

  useroptions: any;
  selectuser ;

  ngOnInit(): void {

    this.useroptions = this.taskservice.getUserOptions();

  }
    handleOk(){

      this.taskservice.changeAssignment(this.selectuser, this.data).subscribe(x =>{
        console.log(`${JSON.stringify(x)} is task assigned to ${this.selectuser}`);
        this.comm.setAction('update');

      });
      console.log(this.selectuser);


  }

  select(event){
    console.log(event.target.value);

  }

}
