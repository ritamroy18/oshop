import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable, empty } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from './models/app-user';
import { UserService } from './user.service';
import { switchMap } from 'rxjs/operators';
import { of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.User>;
  //authState is a obserbable which describes current authebtication state of the user

  constructor(private AngularFireAuth:AngularFireAuth,private route:ActivatedRoute,private userService:UserService) {
    this.user$ = AngularFireAuth.authState;
   }

  login(){
    let returnUrl= this.route.snapshot.queryParamMap.get('returnUrl') || '/' ;   
    localStorage.setItem('returnUrl',returnUrl);
    this.AngularFireAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout(){
    this.AngularFireAuth.auth.signOut()
  }

  get appUser$():Observable<AppUser>{
    return this.user$
      .pipe(switchMap(user => {
        if(user){
          return this.userService.get(user.uid).valueChanges();
        }       
       return of(null);            
      }))
  }
}
