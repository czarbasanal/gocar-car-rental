import { Component, HostListener, ElementRef, Renderer2, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.css']
})
export class UserNavbarComponent {
  isProfileDropdownOpen = false;
  isCarDropdownOpen = false;
  isFavDropdownOpen = false;
  isNotifDropdownOpen = false;

  cars = [
    { name: 'Car 1', image: 'car1.png' },
    { name: 'Car 2', image: 'car2.png' },
    { name: 'Car 3', image: 'car3.png' }
  ];

  favorites = [
    { name: 'Fav 1', image: 'fav1.png' },
    { name: 'Fav 2', image: 'fav2.png' },
    { name: 'Fav 3', image: 'fav3.png' }
  ];

  notifications = [
    { name: 'Notif 1', image: 'notif.png' },
    { name: 'Notif 2', image: 'notif.png' },
    { name: 'Notif 3', image: 'notif.png' }
  ];
  @Output() searchTermChanged = new EventEmitter<string>();
  searchTerm: string = '';

  onSearchTermChange(event: Event) {
    const inputElement = event.target as HTMLInputElement | null;
    if (inputElement) {
      this.searchTerm = inputElement.value;
      this.searchTermChanged.emit(this.searchTerm);
    }
  }
  openProfileDropdown(): void {
    this.isProfileDropdownOpen = true;
  }

  closeProfileDropdown(): void {
    this.isProfileDropdownOpen = false;
  }

  openCarDropdown(): void {
    this.isCarDropdownOpen = true;
  }

  closeCarDropdown(): void {
    this.isCarDropdownOpen = false;
  }
  openFavDropdown(): void {
    this.isFavDropdownOpen = true;
  }

  closeFavDropdown(): void {
    this.isFavDropdownOpen = false;
  }

  openNotifDropdown(): void {
    this.isNotifDropdownOpen = true;
  }

  closeNotifDropdown(): void {
    this.isNotifDropdownOpen = false;
  }
  clearSearch(): void {
    this.searchTerm = '';
    this.searchTermChanged.emit(this.searchTerm);
  }
}
