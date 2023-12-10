import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Car } from 'src/app/shared/car.model';
import { UserService } from 'src/app/shared/firestore.service';


@Component({
  selector: 'app-grid-card',
  templateUrl: './grid-card.component.html',
  styleUrls: ['./grid-card.component.css']
})
export class GridCardComponent implements OnInit, OnChanges {
  @Input() searchTerm: string = '';

  ngOnChanges(changes: SimpleChanges) {
    if (changes['searchTerm']) {
      this.updateDisplayedCars();
    }
  }

  user: any;

  cars: Car[] = [];
  displayedCars: Car[] = [];

  showSeeMoreButton: boolean = false;
  toggleButtonText: string = 'Show More Cars';
  carIds: string[] = [];
  currentCarID: string = '';
  currentUserID: string = '';
  maxPrice: number = Infinity;

  filterCriteria = {
    types: new Set<string>(),
    capacities: new Set<number>(),
  };


  constructor(private router: Router, private db: AngularFirestore, private route: ActivatedRoute, private userService: UserService) { }
  isCollapsed: boolean = true;

  ngOnInit() {
    this.route.params.subscribe(params => {
      const uid = params['userId'];
      this.currentUserID = uid;
      this.userService.getUserDetails(uid).subscribe(user => {
        this.user = user;
      });
    });
    this.fetchCars();
  }

  fetchCars() {
    const modelFilter = (car: Car) => !car.isRented;

    this.db.collection<Car>('car-inventory').snapshotChanges()
      .subscribe(carSnapshot => {

        const filteredCars = carSnapshot.map(carChange => {
          const carData = carChange.payload.doc.data() as Car;
          return { id: carChange.payload.doc.id, ...carData };
        }).filter(modelFilter);

        this.carIds = filteredCars.map(car => car.id);
        this.cars = filteredCars;
  
        this.showSeeMoreButton = this.cars.length > 6;
        this.updateDisplayedCars();
      }
    );
  }

  fetchFilteredCarIds(displayedCars: Car[]): void {
    const modelFilter = (car: Car) => displayedCars.some(displayedCar => displayedCar.model === car.model);

    this.db.collection<Car>('car-inventory').snapshotChanges()
      .subscribe(carSnapshot => {
        const filteredCars = carSnapshot.map(carChange => {
          const carData = carChange.payload.doc.data() as Car;
          return { id: carChange.payload.doc.id, ...carData };
        })
        .filter(modelFilter);
  
        this.carIds = filteredCars.map(car => car.id);
      }
    );
  }
  

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
    this.toggleButtonText = this.isCollapsed ? 'Show More Cars' : 'Show Less Cars';
    this.updateDisplayedCars();
  }

  setFilterCriteria(types: Set<string>, capacities: Set<number>): void {
    this.filterCriteria.types = types;
    this.filterCriteria.capacities = capacities;
    this.updateDisplayedCars();
  }
  setMaxPrice(price: number): void {
    this.maxPrice = price;
    this.updateDisplayedCars();
  }

  updateDisplayedCars(): void {
    let filteredCars = this.cars;

    if (this.searchTerm) {
      filteredCars = filteredCars.filter(car => this.matchesSearchTerm(car, this.searchTerm));
    }

    if (this.filterCriteria.types.size > 0) {
      filteredCars = filteredCars.filter(car => this.filterCriteria.types.has(car.carType));
    }

    if (this.filterCriteria.capacities.size > 0) {
      filteredCars = filteredCars.filter(car => this.filterCriteria.capacities.has(car.maxSeats));
    }

    filteredCars = filteredCars.filter(car => car.rentPrice <= this.maxPrice);

    this.displayedCars = this.isCollapsed ? filteredCars.slice(0, 6) : filteredCars;
    
    this.showSeeMoreButton = filteredCars.length > 6;

    this.fetchFilteredCarIds(this.displayedCars);

  }

  private matchesSearchTerm(car: Car, term: string): boolean {
    term = term.toLowerCase();

    return Object.entries(car).some(([key, value]) => {
      if (typeof value === 'string') {
        return value.toLowerCase().includes(term);
      } else if (typeof value === 'number') {
        const numTerm = Number(term);
        return isNaN(numTerm) ? false : value === numTerm;
      }
      return false;
    });
  }

  goToCarRental(index: number) {
    const carId = this.carIds[index];
    this.router.navigate(['/car-rental', this.currentUserID, carId]);
  }
}
