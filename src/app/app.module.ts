import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SignupDetailsComponent } from './signup-details/signup-details.component';
import { SignupDetails2Component } from './signup-details-2/signup-details-2.component';
import { SignupCommunicationService } from './signup-communication.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    SignupDetailsComponent,
    SignupDetails2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [SignupCommunicationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
