import { Injectable, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { IEvent } from '../event-list/event';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class EventsService implements OnInit{
  private _eventUrl = 'http://localhost/3000/events';

  eventsCollection: AngularFirestoreCollection<IEvent>;

  events: Observable<IEvent[]>

  //array to hold events
  filteredEvents: IEvent[];
  attendedEvents: string[] = [];
  allEvents: IEvent[];
  errorMessage: string;

  constructor(private _http: HttpClient, private _afs: AngularFirestore, private _eventsService: EventsService) {
    //connect to database
    this.eventsCollection =
     _afs.collection<IEvent>("events");
   }



   getEvents(): Observable<IEvent[]> {
     this.events = this.eventsCollection.snapshotChanges().pipe(
       map(actions => actions.map(a => {
         const data = a.payload.doc.data() as IEvent;
         console.log("getEvents:data" + JSON.stringify(data));
         const id = a.payload.doc.id;
         console.log("getEvents:id = " + id);
         return { id, ...data};
       }))
     );

     this.events.subscribe(data => console.log("getEvents" + data));
     return this.events;
   }

   addEvent(event: IEvent): void {
     this.eventsCollection.add(event);
   }

   deleteEvent(id:string): void {
    this.eventsCollection.doc(id).delete()
    .catch(error => {console.log("deleteEvent error: "+error); })
    .then(() => console.log('deleteEvent: name - '+id));
  }


  ngOnInit(){
    this._eventsService.getEvents().subscribe(events => {
      this.allEvents = events,
        this.filteredEvents = this.allEvents;
      },
        error => this.errorMessage = <any>error);
  }

  attendEvent(event: IEvent){
  var user = firebase.auth().currentUser;
  this._afs.collection(`users/${user.uid}/events`).add(event);

  let index = this.attendedEvents.indexOf(event.name);
  if (index == -1) {
    this.attendedEvents.push(event.name);
  }
  else if (this.attendedEvents.length === 0) {
    this.filteredEvents = this.allEvents;
  }
  else {
    this.filteredEvents = [];
    this.allEvents.forEach(event => {
      if (this.attendedEvents.includes(event.name)) {
        this.filteredEvents.push(event)
      }
    });
  }
  console.log(this.attendedEvents);
  }

}


