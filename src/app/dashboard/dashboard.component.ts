import { CommService } from './../comm.service';
import { map,filter } from 'rxjs/operators';
import { TaskService } from './../task.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateDialogComponent } from '../create-dialog/create-dialog.component';
import { TaskListComponent } from '../task-list/task-list.component';
import {Task} from '../task';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { User } from '../user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: User;
  tasks: Task[];
  panelOpenState: boolean;
  backlogs: Task[];
  dones: Task[];
  progresses: Task[];

  constructor(public dialog: MatDialog,
              private taskservice: TaskService,
              private comm: CommService) { }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.refresh();
    this.comm.getAction().subscribe(
      action => {
        console.log('Triggered :'+ action);
        if (action === 'update'){
          this.refresh();
        }
      });
  }



  refresh(){

  this.taskservice.getAllTasks().subscribe(
    x=> {
      this.comm.setAction(true);
      if(x!==null){
      console.log('Response :' + JSON.stringify(x))
      this.backlogs = x.filter((x) => x.status === 'backlog');
      this.progresses = x.filter((x) => x.status === 'progress');
      this.dones = x.filter((x) => x.status === 'done');
      }else if (x === null){
        this.backlogs = [];
        this.progresses = [];
        this.dones = [];
      }
      this.comm.setAction(false);
    }, e => { console.log(e);
    });

  }

  handleCreate(){

    const ref = this.dialog.open(CreateDialogComponent, {
      width: '75%',
      panelClass: 'custom'
    });

    ref.afterClosed().subscribe(message =>{
      console.log('Message :' + message);
      if ( message === true ){
        console.log('Refresh Called');

        this.refresh();
      }
    });





  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
      this.updateDone();
      this.updateBacklog();
      this.updateInProgress();

    }
  }

  updateDone(){
    if(this.dones.length > 0){
      for (const done of this.dones){
        done.status = 'done';
      }
      this.taskservice.saveAll(this.dones).subscribe(
        res => {
            console.log('After Saveing All' + res);

        });
    }
  }
  updateInProgress(){
    if(this.progresses.length > 0){
      for (const prog of this.progresses){
        prog.status = 'progress';
      }

      this.taskservice.saveAll(this.progresses).subscribe(
        res => {
            console.log('After Saveing All' + JSON.stringify(res));

        });
    }
  }
  updateBacklog(){
    if ( this.backlogs.length > 0){
      for (const back of this.backlogs){
        back.status = 'backlog';
      }
      this.taskservice.saveAll(this.backlogs).subscribe(
        res => {
            console.log('After Saveing All' + JSON.stringify(res));

        });
    }

  }

}
