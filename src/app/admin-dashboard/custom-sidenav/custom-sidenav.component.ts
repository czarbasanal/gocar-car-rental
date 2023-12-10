import { Component, Input, computed, signal } from '@angular/core';
import { Router } from '@angular/router';

export type MenuItem = {
  icon: string;
  label: string;
  route: string;
}

@Component({
  selector: 'app-custom-sidenav',
  templateUrl: './custom-sidenav.component.html',
  styleUrls: ['./custom-sidenav.component.css']
})
export class CustomSidenavComponent {
  sideNavCollapsed = signal(false);
  @Input() set collapsed(val: boolean) {
    this.sideNavCollapsed.set(val);
  }

  constructor(private router: Router) { }

  menuItems = signal<MenuItem[]>([
    {
      icon: 'bar_chart',
      label: 'Analytics',
      route: 'analytics',
    },
    {
      icon: 'directions_car',
      label: 'Inventory',
      route: 'inventory',
    },
    {
      icon: 'swap_horiz',
      label: 'Transactions',
      route: 'transactions',
    },
    {
      icon: 'people',
      label: 'Users',
      route: 'users',
    },
  ]);

  profilePicSize = computed(() => this.sideNavCollapsed() ? '40' : '100');

  logout() {
    this.router.navigate(['landing-page']);
  }

}
