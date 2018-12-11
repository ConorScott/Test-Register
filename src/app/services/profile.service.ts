import {Injectable} from '@angular/core';
import {AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore'
import {Profile} from '../models/profile';
import {Observable} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { User } from 'firebase';

@Injectable({
    providedIn: 'root'
})
export class ProfileService{

    profileCollection: AngularFirestoreCollection<Profile>;

    profiles: Observable<Profile[]>


    userCollection: AngularFirestoreCollection<User>;
    users: Observable<User>;
    //array to hold profiles

    allProfiles: Profile[];
    errorMessage: string;

    constructor(private _http: HttpClient, private _afs: AngularFirestore){

        this.profileCollection = _afs.collection<Profile>("profile")
        ;
        this.userCollection = _afs.collection<User>("users");
    }

    

    getProfiles(): Observable<Profile[]> {
        this.profiles = this.profileCollection.snapshotChanges().pipe(
            map(actions => actions.map(a => {
                const data = a.payload.doc.data() as Profile;
                console.log("getProfiles:data" + JSON.stringify(data));
                const id = a.payload.doc.id;
                console.log("getProfiles:id =" + id);
                return {id, ...data};
            }))
        );

        this.profiles.subscribe(data => console.log("getProfiles" + data));
        return this.profiles
    }

    addProfile(profile: Profile): void {
        this.profileCollection.add(profile);
    }

    
}