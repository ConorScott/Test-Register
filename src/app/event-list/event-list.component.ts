import { Component, OnInit } from '@angular/core';
import { IEvent } from './event';
import { EventsService } from '../services/events.service';
import { Observable } from 'rxjs';
import { single } from 'rxjs/operators';
import {Router} from '@Angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  pageTitle: string = "Sligo Sounds";
  errorMessage: string;
  events: IEvent[];
  filteredEvents: IEvent[];
  rockCheckBox = false;
  popCheckBox = false;
  technoCheckbox = false;
  tradCheckbox = false;
  otherCheckbox = false;
  selectedGenres: string[] = [];

  _listFilter: string;
  get listFilter(): string{
    return this._listFilter;
  }

  set listFilter(value: string){
    console.log("ListFilter: value = "+value);
    this._listFilter = value;
   this.filteredEvents = this.listFilter ? this.applyFilter(this.listFilter) : this.events;
  }

  applyFilter(filterBy: string): IEvent[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.events.filter((event: IEvent ) => event.name.toLocaleLowerCase().indexOf(filterBy) != -1);
}
  
  constructor(private _eventsService: EventsService, private _afs: AngularFirestore) {
  }

  doFilter(genre: string) {
    let index = this.selectedGenres.indexOf(genre);
    if (index == -1) {
      this.selectedGenres.push(genre);
    } else {
      this.selectedGenres.splice(index, 1);
    }
    if (this.selectedGenres.length === 0) {
      this.filteredEvents = this.events;
    }
    else {
      this.filteredEvents = [];
      this.events.forEach(event => {
        if (this.selectedGenres.includes(event.genre)) {
          this.filteredEvents.push(event)
        }
      });
    }
  }

  ngOnInit(): void {
    this._eventsService.getEvents().subscribe(events => {
    this.events = events,
      this.filteredEvents = this.events;
    },
      error => this.errorMessage = <any>error);
  }
  attendEvent(event: IEvent){
    var user = firebase.auth().currentUser;
    this._afs.collection(`users/${user.uid}/events`).add(event);
  }
}

