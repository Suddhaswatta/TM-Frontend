import { CommService } from './comm.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'task-dist-front';

  constructor(private comm: CommService){

  }

  public action = this.comm.getAction();
}
