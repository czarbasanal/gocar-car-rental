import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../shared/firestore.service';

@Component({
  selector: 'app-user-main-feed',
  templateUrl: './user-main-feed.component.html',
  styleUrls: ['./user-main-feed.component.css']
})
export class UserMainFeedComponent implements OnInit {
  searchTerm: string = '';
  user: any;

  constructor(private route: ActivatedRoute, private userService: UserService) { }

  onSearchTermChanged(newTerm: string): void {
    this.searchTerm = newTerm;
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      const uid = params['userId'];
      this.userService.getUserDetails(uid).subscribe(user => {
        this.user = user;
      });
    });
  }
}
