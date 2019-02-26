import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service'
import { from } from 'rxjs';

export interface Venue {
    value: string;
    viewValue: string;
  }

@Component({
  selector: 'app-venue-sign-up',
  templateUrl: './venue-sign-up.html',
})
export class VenueSignUpComponent implements OnInit {

    venues: Venue[] = [
        {value: 'pub-0', viewValue: 'Pub'},
        {value: 'Nightclub-1', viewValue: 'NightClub'},
        {value: 'Bar/Restaurant-2', viewValue: 'Bar/Restaurant'}
      ];

  email: string;
  pwd: string;
  name: string;
  about: string;
  roles: boolean;
  venueType: string;
  building: string;
  street: string;
  city: string;
  hours: string;
  username = "";
  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  register() {
    this.auth.signupVenue(this.email, this.pwd, this.name, this.about, this.venueType, this.building, this.street, this.city, this.hours);
    console.log(this.email);
    console.log(this.pwd);
  }

}