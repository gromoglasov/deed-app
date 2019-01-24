import { Injectable } from '@angular/core';
import { Apollo } from "apollo-angular";
import gql from 'graphql-tag';
import { User } from './user-class';
import { Subscription } from 'apollo-client/util/Observable';
import { Router } from '@angular/router';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private apollo: Apollo,
    private router:Router,
  ) { }

   getUserData(username) {
     return gql`
      {
        myUser(userName: "${username}") {
          firstName
          userName
          token
          lastName
          city
          image
          token
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

   user: User;
   loading: boolean;
   // fetch the user data and display it

   private querySubscription: Subscription;
   private queryWatcher: any;
   private _ : any;

   loginUser (username) {

     this.queryWatcher = this.apollo.watchQuery<any>({
       query: this.getUserData(username)
     });
     this.querySubscription = this.queryWatcher
       .valueChanges
       .subscribe(({data, loading }) => {

         console.log(data);
         this.loading = loading;
         this.user = data.myUser;
         if (data.myUser.token) localStorage.setItem('token', data.myUser.token);
         if (this.user && this.router.url === '/') this.router.navigateByUrl('/profile');
         // console.log(this.user);
       });
   }

   getUserInfo () {
     return this.user;
   }

   refetcher() {
     if (this.queryWatcher !== undefined) this.queryWatcher.refetch()
   }

}
