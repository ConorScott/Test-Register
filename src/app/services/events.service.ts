import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { IEvent } from '../event-list/event';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private _eventUrl = 'http://localhost/3000/events';

  eventsCollection: AngularFirestoreCollection<IEvent>;

  events: Observable<IEvent[]>

  //array to hold events
  allEvents: IEvent[];
  errorMessage: string;
  constructor(private _http: HttpClient, private _afs: AngularFirestore) {
    //connect to database
    this.eventsCollection = _afs.collection<IEvent>("events");
    //this.addAllEvents();
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
}


