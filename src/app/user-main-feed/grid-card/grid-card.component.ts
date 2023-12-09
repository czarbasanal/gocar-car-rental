import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Car } from 'src/app/shared/car.model';
import { UserService } from 'src/app/shared/firestore.service';


@Component({
  selector: 'app-grid-card',
  templateUrl: './grid-card.component.html',
  styleUrls: ['./grid-card.component.css']
})
export class GridCardComponent implements OnInit {
  user: any;
  cars: Car[] = [];
  displayedCars: Car[] = [];
  showSeeMoreButton: boolean = false;
  toggleButtonText: string = 'Show More Cars';
  carIds: string[] = [];
  currentCarID: string = '';
  currentUserID: string = '';
  

  constructor(private router: Router, private db: AngularFirestore, private route: ActivatedRoute, private userService: UserService) { }
  isCollapsed: boolean = true;

  ngOnInit() {
    this.route.params.subscribe(params => {
      const uid = params['userId'];
      this.currentUserID = uid;
      //console.log("User: ",this.currentUserID)
      this.userService.getUserDetails(uid).subscribe(user => {
        this.user = user;
        //console.log("Grid Card: ",user)
      });
    });
    this.fetchCars();
    //console.log("ALL Car ID: ",this.carIds);
  }

  fetchCars() {
  this.db.collection<Car>('car-inventory').snapshotChanges()
    .subscribe(carSnapshot => {
      this.cars = carSnapshot.map(carChange => {
        const carData = carChange.payload.doc.data() as Car;
        const carId = carChange.payload.doc.id;
        this.carIds.push(carId);
        //console.log("Car ID: ",carId);
        return { id: carId, ...carData } as Car;
      });

      this.showSeeMoreButton = this.cars.length > 6;
      this.updateDisplayedCars();
    });
  }


  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
    this.toggleButtonText = this.isCollapsed ? 'Show More Cars' : 'Show Less Cars';
    this.updateDisplayedCars();
  }

  updateDisplayedCars(): void {
    this.displayedCars = this.isCollapsed ? this.cars.slice(0, 6) : this.cars;
  }

  goToCarRental(index: number) {
    const carId = this.carIds[index];
    this.router.navigate(['/car-rental', this.currentUserID, carId]);
  }
}
