import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {UserService} from '../user/user.service';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
              private userService: UserService) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.userService.isAuthenticated().map(e => {
      if (e === true || e === null) {
        return true;
      } else {
        this.router.navigate(['/auth/login']);
        return false;
      }
    }).catch(_ => {
      this.router.navigate(['/auth/login']);
      return Observable.of(false);
    });
  }
}
