import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UserMainFeedComponent } from './user-main-feed/user-main-feed.component';
import { GridCardComponent } from './user-main-feed/grid-card/grid-card.component';
import { CarRentalComponent } from './user-main-feed/car-rental/car-rental.component';
import { ReceiptComponent } from './receipt/receipt.component';

const routes: Routes = [
  { path: '', redirectTo: 'landing-page', pathMatch: 'full' },
  { path: 'landing-page', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'grid-card', component: GridCardComponent },
  { path: 'main-feed', component: UserMainFeedComponent },
  { path: 'car-rental', component: CarRentalComponent},
  { path: 'receipt', component: ReceiptComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }