import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-venue-profile',
  templateUrl: './venue-profile.component.html',
  styleUrls: ['./venue-profile.component.scss']
})
export class VenueProfileComponent implements OnInit {

  user: User;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    let sub = this.auth.currentUser().subscribe(user => {
      this.user = user;
      sub.unsubscribe();
    })
    //this.users = this.af.list('/users');
    this.user = new User();
  }

}
