import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import {MatDrawer, MatListModule, MatCardModule, MatInputModule, MatToolbarModule, MatExpansionModule, MatButtonModule, MatListSubheaderCssMatStyler, MatProgressSpinnerModule, MatMenuModule, MatSelect, MatSelectModule, MatFormFieldModule, MatCheckboxModule, MatSidenavModule, } from '@angular/material';

import {FlexLayoutModule} from '@angular/flex-layout';
import { NotificationService } from './services/notification.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth.guard';
import {environment} from '../environments/environment';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {RouterModule, Routes} from '@angular/router';
import {AngularFireDatabaseModule} from "@angular/fire/database"
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NavbarModule, WavesModule, ButtonsModule, DropdownModule } from 'angular-bootstrap-md'


import { AppComponent } from './app.component';
import { LoginComponent } from './Users/login.component';
import {SignupComponent} from './Registration/signup.component';
import { NotificationComponent } from './Notification/notification.component';
import { NavbarComponent } from './Nav-bar/navbar.component';
import { VenueSignUpComponent } from './Registration/venue/venue-sign-up';
import {AdminGuard} from './services/admin.guard';
import { AddEventComponent } from './add-event/add-event.component';
import { EventListComponent } from './event-list/event-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserService } from './services/user.service';
import { VenueProfileComponent } from './venue-profile/venue-profile.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full', canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'venueSignUp', component: VenueSignUpComponent, },
  {path: 'profile', component: UserProfileComponent, },
  {path: 'venue-profile', component: VenueProfileComponent, },
  {path: 'add-event', component: AddEventComponent, canActivate:[AdminGuard]},
  {path: 'home', component: EventListComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: 'login', canActivate: [AuthGuard]},

];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    NotificationComponent,
    NavbarComponent,
    VenueSignUpComponent,
    AddEventComponent,
    EventListComponent,
    UserProfileComponent,
    VenueProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    RouterModule.forRoot(routes),
    MatCardModule,
    MatExpansionModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatSelectModule,
    AngularFireDatabaseModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatSidenavModule,
    MDBBootstrapModule,
    NavbarModule,
    WavesModule,
    ButtonsModule,
    DropdownModule,
    MatCardModule,
    FlexLayoutModule,
    MatInputModule,
    MatListModule
  ],
  providers: [AuthService, AuthGuard,NotificationService, AdminGuard, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
