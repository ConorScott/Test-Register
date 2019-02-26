import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { tap, map, take } from 'rxjs/operators';
import {AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore'
import {User} from '../models/user';
import * as firebase from 'firebase';
import { BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import 'rxjs/add/operator/switchMap';
import * as _ from 'lodash'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  title: string = "Login";

  isLoggedIn: boolean;
  isUser: Observable<boolean>;
  userCollection: AngularFirestoreCollection<User>;
  user: Observable<User>;
  isUser1: boolean;
  user1: BehaviorSubject<User> = new BehaviorSubject(null)
  userRoles: Array<string>;//roles of currently logged in user

  constructor(private afs: AngularFirestore, private auth: AuthService, private myRoute: Router, private afAuth: AngularFireAuth) { 
    auth.user.map(user => {
      /// Set an array of user roles, ie ['admin', 'author', ...]
      return this.userRoles = _.keys(_.get(user, 'roles'))
    })
    .subscribe()
  }

  userLoggedIn(): boolean {
    this.isLoggedIn = this.auth.isLoggedIn();
    return this.isLoggedIn

  }
  get userStatus(): boolean {
    const allowed = ['user']
    return this.matchingRole(allowed)
  }

  private matchingRole(allowedRoles): boolean {
    return !_.isEmpty(_.intersection(allowedRoles, this.userRoles))
  }
 
  // userStatus(): Observable<boolean> | boolean{

  //    return  this.auth.user.pipe(
  //      take(1),
  //      map(user => user && user.roles.venue ? true : false),
  //      tap(isVenue => {
  //        if (isVenue == false) {
  //         this.isUser = this.auth.isUser();
  //         return this.isUser;     
  //        }
  //      })
  //    );
      
  // }

  onLogout() {
    this.auth.doLogout();
    this.isLoggedIn = this.auth.isLoggedIn();
    this.myRoute.navigate(["login"]);
  }
   

  ngOnInit() {
    this.isLoggedIn = this.auth.isLoggedIn();
    this.isUser1 = this.auth.isUser()
    var user = firebase.auth().currentUser;
    this.userCollection = this.afs.collection<User>("users");
    
  }

}
