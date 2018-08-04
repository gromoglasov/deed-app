import { Injectable } from '@angular/core';
import { Apollo } from "apollo-angular";
import gql from 'graphql-tag';
import { User } from './user-class';
import { Subscription } from 'apollo-client/util/Observable';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
   getUserData(username) {
     return gql`
      {
        allUsers(userName: "${username}") {
          firstName
          userName
          lastName
          city
          image
          groups
          karmas {
            group
            karmaPoint
            image
          }
        }
      }
    `
   };

   private user;
   loading: boolean;

   // fetch the user data and display it

   private querySubscription: Subscription;

   loginUser (username) {
     console.log(username);
     this.querySubscription = this.apollo.watchQuery<any>({
       query: this.getUserData(username)
     })
       .valueChanges
       .subscribe(({data, loading }) => {
         console.log(data);
         this.loading = loading;
         this.user = data.allUsers[0];
         this.router.navigateByUrl('/profile');
         console.log(this.user);
       });

   }

   getUserInfo () {
     return this.user;
   }

  constructor(
    private apollo: Apollo,
    private router:Router,
  ) { }
}
