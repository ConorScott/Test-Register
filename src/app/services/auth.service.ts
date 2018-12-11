import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { NotificationService } from './notification.service';
import * as firebase from 'firebase/app';
import {User} from '../models/user';
import {switchMap,} from 'rxjs/operators';
import {AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore'


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  user$: Observable<firebase.User>;
  loggedInStatus: boolean = false;
  user: Observable<User>;

  userCollection: AngularFirestoreCollection<User>;

  constructor(private afs: AngularFirestore,
     private _firebaseAuth: AngularFireAuth,
      private router: Router,
       private notifier: NotificationService,
       ) {
        this.userCollection = afs.collection<User>("users");
        this.user = this._firebaseAuth.authState
        .pipe(switchMap(user => {
          if(user) {
            return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
          } else{
            return of(null)
          }
        }))

       }
  
       private setVenueDoc(user){
         const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

         const data: User = {
           uid: user.uid,
           email: user.email,
           roles: {
            venue: true
          }
         }
         return userRef.set(data)
       }
       private setUserDoc(user){
        const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

        const data: User = {
          uid: user.uid,
          email: user.email,
          roles: {
           user: true
         }
        }
        return userRef.set(data)
      }
  

  signup(email: string, password: string) {
    // clear all messages
    this.notifier.display(false, '');
    this._firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        // this.updateUserData(res.user);
        this.sendEmailVerification();
        const message = 'A verification email has been sent, please check your email and follow the steps!';
        this.notifier.display(true, message);
        return this.setUserDoc(user.user)
          .then(() => {
            firebase.auth().signOut();
            this.router.navigate(['login']);
          })
          
      })
  }

  signupVenue(email: string, password: string) {
    // clear all messages
    this.notifier.display(false, '');
    this._firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        // this.updateUserData(res.user);
        this.sendEmailVerification();
        const message = 'A verification email has been sent, please check your email and follow the steps!';
        this.notifier.display(true, message);
        return this.setVenueDoc(user.user)
          .then(() => {
            firebase.auth().signOut();
            this.router.navigate(['login']);
          })
          
      })
      .catch(err => {
        console.log(err);
        this.notifier.display(true, err.message);
      });
  }
    


  sendEmailVerification() {
    this._firebaseAuth.authState.subscribe(user => {
      user.sendEmailVerification()
        .then(() => {
          console.log('email sent');
        });
    });
  }

  doRegister(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }

  doLogin(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
        this.loggedInStatus = true;
      
      }, err => reject(err))
    })
  }

  doLogout(){
    return new Promise((resolve, reject) => {
      if(firebase.auth().currentUser){
        this._firebaseAuth.auth.signOut()
        resolve();
      }
      else{
        reject();
      }
      this.loggedInStatus = false;

    });
  }

  isLoggedIn():boolean {
      return this.loggedInStatus;
  }
}