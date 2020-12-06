import { User } from './user';
import { Observable } from 'rxjs';
import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from './task';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  baseurl = environment.SERVER_URL;

  getAllTasks(): Observable<Task[]>{

    return this.http.get<Task[]>(`${this.baseurl}tasks`);

  }

  saveTask(task): Observable<Task>{

    return this.http.post<Task>(`${this.baseurl}tasks`, task );

  }

  deleteTask(id){

    return this.http.delete(`${this.baseurl}delete/${id}`);

  }

  saveAll(tasks): Observable<Task[]>{

    return this.http.post<Task[]>(`${this.baseurl}saveAll`, tasks);

  }

  delete(id){
    return this.http.delete(`${this.baseurl}delete/${id}`);
  }

  getUserOptions(): Observable<any>{

    return this.http.get<any>(`${this.baseurl}admin/userOptions`);

  }

  changeAssignment(username,task){
    return this.http.post(`${this.baseurl}admin/assignTask?username=${username}`, task);
  }

}
