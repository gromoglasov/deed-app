import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";

function createUser(username, firstname, lastname, city, email, password) {
  return gql`
    mutation {
      createUser(
        userName: "${username}"
        firstName: "${firstname}"
        lastName: "${lastname}"
        password: "${password}"
        email: "${email}"
        city: "${city}"
        image: "https://image.flaticon.com/icons/png/512/149/149071.png"
      ) {
        _id
      }
    }
  `
} ;


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  goBack(): void {
    this.location.back();
  }

  signUp(e, username, firstname, lastname, city, email, password) {
    e.preventDefault();
    this.apollo.mutate<any>({ mutation: createUser(username, firstname, lastname, city, email, password) }).subscribe();
    console.log(username);
    this.goBack();
  }


  constructor(
    private location: Location,
    private apollo: Apollo
  ) {

  }

  ngOnInit() {

  }

}
