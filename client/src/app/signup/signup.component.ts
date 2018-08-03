import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  
  goBack(): void {
    this.location.back();
  }

  constructor(
    private location: Location,

  ) {
  }

  ngOnInit() {
  }

}
