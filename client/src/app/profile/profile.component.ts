import { Component, OnInit } from '@angular/core';
import { User } from '../user-class'
import { DeedService } from '../deed.service';

import { ActivatedRoute } from '@angular/router';

import { Location } from '@angular/common';

import { Apollo } from "apollo-angular";
import gql from 'graphql-tag';
import { Subscription } from 'apollo-client/util/Observable';

function createNewGroup (group, type, initKarma) {
  return gql`
    mutation {
      createGroup (
        name: "${group}"
        type: "${type}"
        initKarma: ${initKarma}
        icon: "https://www.appian.com/wp-content/uploads/2017/04/careers-icon-community.png"
      ) {
        _id
      }
    }
  `;

}

const queryies = gql`
  {
    allUsers(userName: "isadorabk") {
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
`;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  goBack(): void {
    this.location.back()
  }

  status: boolean = false;

  showForm() {
    this.status = !this.status;
  }

  updateUserGroups (user, group) {
    return gql`
      mutation {
        updateUserGroup(
          userName: "${user}"
          groups: "${group}"
        ) {
          _id
        }
      }
    `;
  }

updateKarma(user, group, karma) {
  return gql`
      mutation {
        updateKarma(
          userName: "${user}"
          input: {
            group: "${group}"
            karmaPoint: ${karma}
            image: "https://www.appian.com/wp-content/uploads/2017/04/careers-icon-community.png"
          }
        ) {
          _id
        }
      }
    `;
}




  createGroup(group, type, initKarma) {
    this.status = !this.status;
    this.apollo.mutate<any>({ mutation: createNewGroup(group, type, initKarma) })
      .subscribe()
    this.apollo.mutate<any>({ mutation: this.updateUserGroups(this.user.userName, group) })
        .subscribe()
    this.apollo.mutate<any>({ mutation: this.updateKarma(this.user.userName, group, initKarma) })
        .subscribe()
    window.location.reload();
  }



  user: User;
  loading: boolean;

  // fetch the user data and display it

  private querySubscription: Subscription;

  constructor(
    private deedService: DeedService,
    private route: ActivatedRoute,
    private location: Location,
    private apollo: Apollo,

  ) { }

  ngOnInit() {
    this.querySubscription = this.apollo.watchQuery<any>({
      query: queryies
    })
      .valueChanges
      .subscribe(({data, loading }) => {
        this.loading = loading;
        this.user = data.allUsers[0]
      });
  }

}
