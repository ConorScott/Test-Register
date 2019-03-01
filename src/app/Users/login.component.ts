import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { firestore } from 'firebase';
import { AngularFireDatabase, snapshotChanges } from '@angular/fire/database';
import * as firebase from 'firebase/';
import { FirebaseApp } from '@angular/fire';
import {User} from '../models/user';
import {ProfileService} from '../services/profile.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']

})
export class LoginComponent implements OnInit {
  errorMessage: string;
  form;
  //userType;
  userId;
  
  users: Observable<User>;

  constructor(private fb: FormBuilder, private myRoute: Router,
    private auth: AuthService, private afAuth: AngularFireAuth, private _profileService: ProfileService ) {
     this.form = fb.group ({
       email: ['', [Validators.required, Validators.email]],
       password: ['', Validators.required],
       
     });
    //  firebase.auth().onAuthStateChanged( user => {
    //   if (user) { this.userId = user.uid
    //   console.log(user);}
    // });
    // var ref = firebase.database().ref("users");

    // ref.on("value", function(snapshot) {
    //   snapshot.forEach(function(childSnapshot) {
    //     var childData = childSnapshot.val();
    //     var type = childData.userType;
    //     console.log(childData);
    //   });
    // });
     }

  ngOnInit() {
    
  }
 
  login() {

    
      this.auth.doLogin(this.form.value)
    .then(res => {
      this.myRoute.navigate(['/home']);
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
    })

   

    } 


    

    
  }


