import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-main-feed',
  templateUrl: './user-main-feed.component.html',
  styleUrls: ['./user-main-feed.component.css']
})
export class UserMainFeedComponent implements OnInit {
  searchTerm: string = '';
  onSearchTermChanged(newTerm: string): void {
    this.searchTerm = newTerm;

  }
  ngOnInit(): void {
  }
}
