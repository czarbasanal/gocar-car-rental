import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserMainFeedComponent } from './user-main-feed/user-main-feed.component';
import { GridCardComponent } from './user-main-feed/grid-card/grid-card.component';

const routes: Routes = [
  { path: 'grid-card', component: GridCardComponent },
  { path: 'main-feed', component: UserMainFeedComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }