import { Component, OnInit } from '@angular/core';
import { CommunityComponent } from '../community/community.component';
@Component({
  selector: 'app-prizes',
  templateUrl: './prizes.component.html',
  styleUrls: ['./prizes.component.css']
})
export class PrizesComponent implements OnInit {

  constructor(
    private communityComponent: CommunityComponent,
  ) { }

  ngOnInit() {
  }


}
