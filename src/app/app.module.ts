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

import { LandingNavComponent } from './landing-nav/landing-nav.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { initializeAppCheck, ReCaptchaEnterpriseProvider, provideAppCheck } from '@angular/fire/app-check';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { getPerformance, providePerformance } from '@angular/fire/performance';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getRemoteConfig, provideRemoteConfig } from '@angular/fire/remote-config';
import { UserNavComponent } from './user-nav/user-nav.component';

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
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp({ "projectId": "gocar-car-rental", "appId": "1:169518381093:web:0e76125945044ecccc67cc", "storageBucket": "gocar-car-rental.appspot.com", "apiKey": "AIzaSyC60E1uP0vTRkhwGmRm4KWglTJDrNTmogU", "authDomain": "gocar-car-rental.firebaseapp.com", "messagingSenderId": "169518381093" })),
    provideAuth(() => getAuth()),
    provideAnalytics(() => getAnalytics()),
    // provideAppCheck(() => {
    //   // TODO get a reCAPTCHA Enterprise here https://console.cloud.google.com/security/recaptcha?project=_
    //   const provider = new ReCaptchaEnterpriseProvider(/* reCAPTCHA Enterprise site key */);
    //   return initializeAppCheck(undefined, { provider, isTokenAutoRefreshEnabled: true });
    // }),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
    provideFunctions(() => getFunctions()),
    provideMessaging(() => getMessaging()),
    providePerformance(() => getPerformance()),
    provideStorage(() => getStorage()),
    provideRemoteConfig(() => getRemoteConfig())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
