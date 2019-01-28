import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireObject, AngularFireList,} from '@angular/fire/database';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {User} from '../models/user';
import {Profile} from '../models/profile';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  userCollection: AngularFirestoreCollection<User>;

  users: Observable<User[]>

  constructor(private af : AngularFireDatabase, private _http: HttpClient, private _afs: AngularFirestore) {
    this.userCollection = _afs.collection<User>("/users");

   }

  getUser(uid: string): AngularFireObject<User>{
    return this.af.object('/users' + uid);

  }

  getUsers() : AngularFireList<User[]>{
    return this.af.list('/users');
  }

  addUser(user: User): void{
    this.userCollection.add(user);
  }
}
