import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { IEvent } from '../event-list/event';
import { EventsService } from '../services/events.service';

@Component({
  selector: 'app-delete-event',
  templateUrl: './delete-event.component.html',
  styleUrls: ['./delete-event.component.scss']
})
export class DeleteEventComponent implements OnInit {
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

  constructor(private _eventsService: EventsService, private _db: AngularFireDatabase ) { }


  ngOnInit(): void {
    this._eventsService.getEvents().subscribe(events => {
      this.events = events,
        this.filteredEvents = this.events;
      },
        error => this.errorMessage = <any>error);
    }
  }
