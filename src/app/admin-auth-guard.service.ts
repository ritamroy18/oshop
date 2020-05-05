import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { map, switchMap } from "rxjs/operators";
import { UserService } from './user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private authService: AuthService, private userService: UserService) { }
  //firebase.User is not tthe user in database ..it is authenticate user
  //we need tomap to app user object 
  //switchMap focus on the new obeservable not the old one 

  // canActivate(): Observable<boolean> {
  //   return this.authService.user$
  //     .pipe(switchMap(user => {
  //       return this.userService.get(user.uid).valueChanges()
  //     }),
  //       map(appUser => appUser.isAdmin));
  // }
  //After passing switchmap function to appUser$() in auth.service.ts Modification
  canActivate(): Observable<boolean> {
    return this.authService.appUser$.pipe(map(appUser => appUser.isAdmin))
  }
}
