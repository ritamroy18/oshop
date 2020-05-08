import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // title = 'oshop';
  constructor(private authService:AuthService,route:Router,private userService:UserService){
    authService.user$.subscribe(user => {
      if (!user) return;
      // if(user){
      //   userService.save(user);
      //   let returnUrl = localStorage.getItem('returnUrl');
      //   if(returnUrl){
      //     localStorage.removeItem('returnUrl');
      //     route.navigateByUrl(returnUrl);
      //   }
      // }
        userService.save(user);
        let returnUrl = localStorage.getItem('returnUrl');
        if(!returnUrl)return;
          localStorage.removeItem('returnUrl');
          route.navigateByUrl(returnUrl);
    })
  }
}
