import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommService {

  takeaction = new BehaviorSubject<any>(null);
  constructor() { }

  setAction(action){
    this.takeaction.next(action);
  }

  getAction(){
    return this.takeaction.asObservable();
  }

}
