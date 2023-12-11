import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GridCardComponent } from './user-main-feed/grid-card/grid-card.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SignupDetailsComponent } from './signup/signup-details/signup-details.component';
import { SignupDetails2Component } from './signup/signup-details-2/signup-details-2.component';
import { SignupCommunicationService } from './shared/signup-communication.service';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorage, AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from 'src/environments/environment';
import { UserMainFeedComponent } from './user-main-feed/user-main-feed.component';
import { LandingNavComponent } from './landing-nav/landing-nav.component';
import { ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { UserSidebarComponent } from './user-main-feed/user-sidebar/user-sidebar.component';
import { UserNavbarComponent } from './user-main-feed/user-navbar/user-navbar.component';
import { FooterComponent } from './footer/footer.component';
import { CarRentalComponent } from './user-main-feed/car-rental/car-rental.component';
import { ReceiptComponent } from './receipt/receipt.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CustomSidenavComponent } from './admin-dashboard/custom-sidenav/custom-sidenav.component';
import { AdminAddCarComponent } from './admin-dashboard/admin-add-car/admin-add-car.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgChartsModule } from 'ng2-charts';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { InventoryComponent } from './pages/inventory/inventory.component';
import { UsersComponent } from './pages/users/users.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { ConfirmationDialogComponent } from './admin-dashboard/confirmation-dialog/confirmation-dialog.component';
import { EditProfileComponent } from './user-main-feed/edit-profile/edit-profile.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { TransacDialogComponent } from './dialogs/transac-dialog/transac-dialog.component';
import { UsersDialogComponent } from './dialogs/users-dialog/users-dialog.component';


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
    CarRentalComponent,
    ReceiptComponent,
    AdminDashboardComponent,
    CustomSidenavComponent,
    AnalyticsComponent,
    InventoryComponent,
    UsersComponent,
    TransactionsComponent,
    AdminAddCarComponent,
    ConfirmationDialogComponent,
    EditProfileComponent,
    ForgotPasswordComponent,
    TransacDialogComponent,
    UsersDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    NgChartsModule,
    MatCardModule,
    FlexLayoutModule
  ],
  providers: [SignupCommunicationService, ScreenTrackingService, UserTrackingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
