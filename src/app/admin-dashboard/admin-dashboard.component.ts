import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {

  collapsed = signal(false);
  sidenavWidth = computed(() => this.collapsed() ? '75px' : '320px');
}
