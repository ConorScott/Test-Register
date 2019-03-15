import { Component, OnInit, HostListener } from '@angular/core';
import { NgModule } from '@angular/core';

import { EventsService } from '../services/events.service';
import { Router } from '@angular/router';
import { IEvent } from '../event-list/event';




@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']


})
export class AddEventComponent implements OnInit {
  pageTitle: string = "Sligo Sounds";

  eventId: number;
  eventName: string;
  eventVenue: string;
  eventDate: string;
  eventTime: string;
  eventGenre: string;
  eventDescription: string;
  image: string;

  constructor(private _eventService: EventsService, private router: Router) { 
   
  }

  ngOnInit() {
  }

  addEvent(): void {
    let event:IEvent = {
      eventId:this.eventId,
      name:this.eventName,
      date:this.eventDate,
      venue:this.eventVenue,
      time:this.eventTime,
      genre:this.eventGenre,
      description:this.eventDescription,
      image:this.image
    };
    this._eventService.addEvent(event);

    this.router.navigate(['/home']);

   
  }
}
