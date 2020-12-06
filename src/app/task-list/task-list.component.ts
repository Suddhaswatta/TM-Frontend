import { Role } from './../role';
import { AssignComponent } from './../assign/assign.component';
import { TaskService } from './../task.service';
import { CommService } from './../comm.service';
import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Task } from '../task';
import { MatDialog } from '@angular/material/dialog';
import { CreateDialogComponent } from '../create-dialog/create-dialog.component';
import { User } from '../user';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TaskListComponent implements OnInit {

  isOpen;
  trigger;
  isAdmin;
  @Input()
  task: Task;
  panelOpenState: boolean;

  deadline: Date;
  constructor(public dialog: MatDialog,
              private taskservice: TaskService,
              private comm: CommService) { }

  ngOnInit(): void {

    this.hadRoleAdmin();
    console.log(`Task : ${JSON.stringify(this.task)}`);

  }
  handleAssign(){
      this.dialog.open(AssignComponent,{data: this.task});
  }
  handleDelete(id){
    this.taskservice.delete(id).subscribe(x =>
      {
      this.comm.setAction('update');
      console.log(x);

    }, e => {
      console.log(e);

    });
  }
  handleEdit(){

    const ref = this.dialog.open(CreateDialogComponent,

      {
        width: '75%',
        data: this.task,
        panelClass: 'custom'

      });
    ref.afterClosed().subscribe(
        message =>
        {

          console.log(message);
        });

  }

  hadRoleAdmin(){
    let user: User;
    user = JSON.parse(sessionStorage.getItem('user'));
    for (const role of user.roles){
        if( role.roleName === 'ROLE_ADMIN' ){
          this.isAdmin = true;
        }
    }
  }

}
