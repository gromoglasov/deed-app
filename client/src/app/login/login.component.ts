import { Component, OnInit } from '@angular/core';
import { getLocaleDateFormat } from '@angular/common';
import { LoginService } from '../login.service';
import { Apollo } from 'apollo-angular';
//import { Observable } from 'rxjs/Observable';
// import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import gql  from 'graphql-tag';

import { User } from '../user-class';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  gimme():void{ this.apollo.query({ query:
    gql`{allUsers{userName}}`}).subscribe(console.log)
  }

  login(e, username) {
    e.preventDefault();
    this.loginService.loginUser(username);
  }

  constructor(
    private apollo: Apollo,
    private loginService: LoginService,
    private router:Router,

  ) { }


  ngOnInit() {

  }


};
