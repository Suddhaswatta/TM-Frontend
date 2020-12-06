import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from '../login.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  notify = new Subject();
  constructor(private loginservice: LoginService, private router: Router) { }
  isUserLoggedIn$ = this.loginservice.isUserLoggedIn();
  ngOnInit(): void {

  }

  handlelogout(){
    this.loginservice.logout$().pipe(takeUntil(this.notify)).subscribe(x => {
      console.log('logged out :' + x);

      this.router.navigate(['login']);

    });
  }

  ngOnDestroy(){
    this.notify.next();
    this.notify.complete();
  }
}
