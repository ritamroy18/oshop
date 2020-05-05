import { Component, OnInit } from '@angular/core';
// import {AngularFireAuth} from 'angularfire2/auth';
// import * as firebase from 'firebase';
// import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss']
})
export class BsNavbarComponent implements OnInit {
  // user$: Observable<firebase.User>;
     appUser : AppUser;

  // constructor(private AngularFireAuth:AngularFireAuth) {
    constructor(private authService : AuthService,private route:Router) {
    // AngularFireAuth.authState.subscribe(user => this.user =user);
    // this.user$ = AngularFireAuth.authState;
      authService.appUser$.subscribe(appUser => this.appUser = appUser);
   }

  ngOnInit(): void {
  }

  logout(){
    // this.AngularFireAuth.auth.signOut()
    this.authService.logout();
    this.route.navigate(['/']);
  }

}
