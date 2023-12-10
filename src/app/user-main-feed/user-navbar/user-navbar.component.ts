import { Component, HostListener, ElementRef, Renderer2, Output, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/shared/firestore.service';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.css']
})
export class UserNavbarComponent implements OnInit {
  isProfileDropdownOpen = false;
  isCarDropdownOpen = false;
  isFavDropdownOpen = false;
  isNotifDropdownOpen = false;

  cars = [
    { name: 'Car 1', image: 'car1.png' },
    { name: 'Car 2', image: 'car2.png' },
    { name: 'Car 3', image: 'car3.png' }
  ];

  // favorites = [
  //   { name: 'Fav 1', image: 'fav1.png' },
  //   { name: 'Fav 2', image: 'fav2.png' },
  //   { name: 'Fav 3', image: 'fav3.png' }
  // ];

  notifications = [
    { name: '1', image: 'notif.png' },
    { name: 'Notif 2', image: 'notif.png' },
    { name: 'Notif 3', image: 'notif.png' }
  ];
  @Output() searchTermChanged = new EventEmitter<string>();
  searchTerm: string = '';
  user: any;
  carIds: string[] = [];
  userFavorites: any[] = [];
  currentUserID: string = '';
  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const uid = params['userId'];
      this.currentUserID = uid; // Store the current user ID

      this.userService.getUserDetails(uid).subscribe(user => {
        this.user = user;

        this.userService.getUserFavorites(uid).subscribe(favorites => {
          this.userFavorites = favorites;
          console.log(this.userFavorites)
          // Populate the carIds array based on userFavorites

          console.log(this.userFavorites.map(fav => fav.id));

          this.carIds = this.userFavorites.map(fav => fav.id);

          console.log(this.carIds);
        });
      });
    });
  }

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
  goToCarRental(favoriteCar: any): void {
    const carId = favoriteCar.id;
    console.log(carId);
    if (carId && this.currentUserID) {
      this.router.navigate(['/car-rental', this.currentUserID, carId]);
    }
  }

}
