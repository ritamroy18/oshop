import { Component, OnInit } from '@angular/core';
// import * as firebase from 'firebase';
import { AuthService } from 'shared/services/auth.service';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService :AuthService ) { }

  ngOnInit(): void {
  }

  login(){
    //redirect user like google,fb etc
    // this.AngularFireAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    this.authService.login();
  }

}
