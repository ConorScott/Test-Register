import { Component, OnInit } from '@angular/core';
import { Profile } from '../models/profile';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/database';
import { auth } from 'firebase';
import {Router} from '@angular/router';
import { ProfileService } from '../services/profile.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  

  username: string;
  firstname: string;
  lastname: string;
  listFilter: string;

  constructor(private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase, private myRoute: Router,
    private _profileService: ProfileService) { }

  ngOnInit() {

  }

  createProfile(): void{
    let profile:Profile = {
      username:this.username,
      firstname:this.firstname,
      lastname:this.lastname,
    
    };
    this._profileService.addProfile(profile);

    this.myRoute.navigate(['/success'])
  }

}
