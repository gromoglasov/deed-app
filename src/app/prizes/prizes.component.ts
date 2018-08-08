import { Component, OnInit, Input } from '@angular/core';
import { CommunityComponent } from '../community/community.component';
import { Prize } from '../prize-class';
@Component({
  selector: 'app-prizes',
  templateUrl: './prizes.component.html',
  styleUrls: ['./prizes.component.css']
})
export class PrizesComponent implements OnInit {
  @Input() prizes: {
    name: string;
    image: string;
    description: string;
    points: number;
  }


  constructor(
    private communityComponent: CommunityComponent,
  ) {
  }

  ngOnInit() {
    console.log(this.prizes);
  }


}
