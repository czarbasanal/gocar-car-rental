import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GridCardComponent } from './user-main-feed/grid-card/grid-card.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SignupDetailsComponent } from './signup-details/signup-details.component';
import { SignupDetails2Component } from './signup-details-2/signup-details-2.component';
import { SignupCommunicationService } from './signup-communication.service';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { UserMainFeedComponent } from './user-main-feed/user-main-feed.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    GridCardComponent,
    LoginComponent,
    SignupComponent,
    SignupDetailsComponent,
    SignupDetails2Component,
    UserMainFeedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [SignupCommunicationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
