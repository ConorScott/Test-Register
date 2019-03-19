import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { IEvent } from '../event-list/event';
import { EventsService } from '../services/events.service';
import { AngularFireDatabase } from '@angular/fire/database';


@Component({
  selector: 'app-venue-profile',
  templateUrl: './venue-profile.component.html',
  styleUrls: ['./venue-profile.component.scss']
})
export class VenueProfileComponent implements OnInit {

  user: User;

  constructor(private auth: AuthService, private _eventsService: EventsService, private _db: AngularFireDatabase) { }

  events: IEvent[];
  filteredEvents: IEvent[];
  selectedGenres: string[] = [];
  errorMessage: string;


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

deleteEvent(id: string): void {
  this._eventsService.deleteEvent(id);
}




  ngOnInit() {
    let sub = this.auth.currentUser().subscribe(user => {
      this.user = user;
      sub.unsubscribe();
    })
    //this.users = this.af.list('/users');
    this.user = new User();

    this._eventsService.getEvents().subscribe(events => {
      this.events = events,
        this.filteredEvents = this.events;
      },
      error => this.errorMessage = <any>error);
  }

}
