import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UserMainFeedComponent } from './user-main-feed/user-main-feed.component';
import { GridCardComponent } from './user-main-feed/grid-card/grid-card.component';
import { CarRentalComponent } from './user-main-feed/car-rental/car-rental.component';
import { ReceiptComponent } from './receipt/receipt.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { InventoryComponent } from './pages/inventory/inventory.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { UsersComponent } from './pages/users/users.component';

const routes: Routes = [
  { path: '', redirectTo: 'landing-page', pathMatch: 'full' },
  { path: 'landing-page', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'grid-card', component: GridCardComponent },
  { path: 'main-feed', component: UserMainFeedComponent },
  { path: 'car-rental', component: CarRentalComponent },
  { path: 'receipt', component: ReceiptComponent },
  { path: 'analytics', component: AnalyticsComponent },
  { path: 'inventory', component: InventoryComponent },
  { path: 'transactions', component: TransactionsComponent },
  { path: 'users', component: UsersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }