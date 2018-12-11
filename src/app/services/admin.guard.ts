import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import { tap, map, take } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private auth: AuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean{

     return this.auth.user.pipe(
       take(1),
       map(user => user && user.roles.venue ? true : false),
       tap(isVenue => {
         if (!isVenue) {
           console.error('Access denied - Venues only');
           
         }
       })
     );
      
  }
}