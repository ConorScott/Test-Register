import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { EventsService } from '../services/events.service';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { AngularFirestore } from '@angular/fire/firestore';
import { Profile } from '../models/profile';
import { AuthService } from '../services/auth.service';
import 'rxjs/add/operator/map';
import { subscribeOn } from 'rxjs/operators';
import {IEvent} from '../event-list/event';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  users: AngularFireList<any[]>;
  user: User;
  attendedEvents: string[] = [];

  constructor(private af: AngularFireDatabase, private afs : AngularFirestore, private auth: AuthService, private _eventsService: EventsService) { }

  ngOnInit() {
    let sub = this.auth.currentUser().subscribe(user => {
      this.user = user;
      sub.unsubscribe();
    })
    this.users = this.af.list('/users');
    this.attendedEvents = this._eventsService.attendedEvents
  }

  removeAttend(event: IEvent){
    this._eventsService.removeAttend(event);
}
}
