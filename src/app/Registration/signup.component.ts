import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {AuthService} from '../services/auth.service'
import { from } from 'rxjs';
import {User} from '../models/user';
import {ProfileService} from "../services/profile.service";
import { Profile } from '../models/profile';
import * as firebase from 'firebase/';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { UserService} from "../services/user.service";
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  currentUser: User;
  email: string;
  pwd: string;
  name: string;
  description: string;
  venues: string;
  artists: string;
  username: string;
  roles: boolean;
  uid: string;
  date: string;
  
  @Output()
  creatingUserEvent = new EventEmitter<boolean>();

  @Output()
  createUserEvent = new EventEmitter<User>();

  creatingUser: boolean;

  constructor(private auth: AuthService, _profileService: ProfileService, private afs: AngularFirestore, private _userService: UserService, private db: AngularFireDatabase ) {
   }

  ngOnInit() {
  }

  register(): void {
    this.auth.signup(this.email, this.pwd, this.name, this.description, this.venues, this.artists, this.username, this.date);
    console.log(this.email);
    console.log(this.pwd);
    console.log(this.name); 

    
    }
  
}
