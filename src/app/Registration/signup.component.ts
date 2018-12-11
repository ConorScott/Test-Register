import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service'
import { from } from 'rxjs';
import {User} from '../models/user';
import {ProfileService} from "../services/profile.service";
import { Profile } from '../models/profile';
import * as firebase from 'firebase/';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
})
export class SignupComponent implements OnInit {
  

  email: string;
  pwd: string;
  name: string;
  description: string;
  venue: string;
  roles: boolean;
  uid: string;
  
  

  constructor(private auth: AuthService, _profileService: ProfileService, private afs: AngularFirestore) { }

  ngOnInit() {
  }

  register() {
    this.auth.signup(this.email, this.pwd);
    console.log(this.email);
    console.log(this.pwd);

    
         
    }
  

}
