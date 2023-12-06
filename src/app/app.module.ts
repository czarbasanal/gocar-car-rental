import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GridCardComponent } from './user-main-feed/grid-card/grid-card.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SignupDetailsComponent } from './signup-details/signup-details.component';
import { SignupDetails2Component } from './signup-details-2/signup-details-2.component';
import { SignupCommunicationService } from './signup-communication.service';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { UserMainFeedComponent } from './user-main-feed/user-main-feed.component';
import { LandingNavComponent } from './landing-nav/landing-nav.component';
import { ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { UserSidebarComponent } from './user-main-feed/user-sidebar/user-sidebar.component';
import { UserNavbarComponent } from './user-main-feed/user-navbar/user-navbar.component';
import { FooterComponent } from './footer/footer.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminSidebarComponent } from './admin-dashboard/admin-sidebar/admin-sidebar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    AppComponent,
    GridCardComponent,
    LoginComponent,
    SignupComponent,
    LandingPageComponent,
    LandingNavComponent,
    SignupDetailsComponent,
    SignupDetails2Component,
    UserMainFeedComponent,
    UserSidebarComponent,
    UserNavbarComponent,
    FooterComponent,
    AdminDashboardComponent,
    AdminSidebarComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    MatSidenavModule,
    MatIconModule,
  ],
  providers: [SignupCommunicationService, ScreenTrackingService, UserTrackingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
