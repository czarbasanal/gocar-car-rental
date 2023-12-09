import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../shared/firestore.service';

@Component({
  selector: 'app-user-main-feed',
  templateUrl: './user-main-feed.component.html',
  styleUrls: ['./user-main-feed.component.css']
})
export class UserMainFeedComponent implements OnInit {
  user: any;

  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const uid = params['userId'];
      this.userService.getUserDetails(uid).subscribe(user => {
        this.user = user;
      });
    });
  }
}
