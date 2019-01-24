import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-prize',
  templateUrl: './prize.component.html',
  styleUrls: ['./prize.component.css']
})
export class PrizeComponent implements OnInit {
  @Input() prize: {
    name: string;
    image: string;
    description: string;
    points: number;
  }[]

  constructor() { }

  ngOnInit() {
  }

}
