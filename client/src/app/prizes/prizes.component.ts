import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prizes',
  templateUrl: './prizes.component.html',
  styleUrls: ['./prizes.component.css']
})
export class PrizesComponent implements OnInit {

  status: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  toggle() {
    this.status = !this.status;
  }

}
