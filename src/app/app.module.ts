import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GridCardComponent } from './user-main-feed/grid-card/grid-card.component';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { UserMainFeedComponent } from './user-main-feed/user-main-feed.component';
import { UserSidebarComponent } from './user-main-feed/user-sidebar/user-sidebar.component';
import { UserNavbarComponent } from './user-main-feed/user-navbar/user-navbar.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    UserNavbarComponent,
    GridCardComponent,
    UserMainFeedComponent,
    UserSidebarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
