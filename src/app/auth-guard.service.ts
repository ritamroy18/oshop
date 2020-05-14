import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route, state: RouterStateSnapshot) {
    // map operator transform object user$ to boolean
    // queryParams is used for additional params
    return this.authService.user$.pipe(map(user => {
      if (user) { return true; }
      this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
      return false;
    }));
  }

}
