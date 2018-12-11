import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase, AngularFireObject} from '@angular/fire/database'
import { Profile } from '../models/profile';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {ProfileService} from '../services/profile.service';


@Component({
  selector: 'app-root',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  errorMessage: string;
  filteredProfiles: Profile[];
  profiles: Profile[] = [];
  
  constructor(private _profileService: ProfileService, private afauth: AngularFireAuth, private afDatabase: AngularFireDatabase,
    ){
  }
  ngOnInit() {
    this._profileService.getProfiles().subscribe(profiles => {
      this.profiles = profiles,
      this.filteredProfiles = this.profiles
    },
      error => this.errorMessage = <any>error);
  }
}