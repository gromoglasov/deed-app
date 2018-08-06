import { Component, OnInit } from '@angular/core';
import { CommunityComponent } from './../community/community.component';
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";

function createPrize(group, name, description, points) {
  return gql`
    mutation {
      addPrize(
        name: "${group}"
        input: {
          name: "${name}"
          desc: "${description}"
          points: ${points}
        }
      ) {
        _id
      }
    }
  `
} ;


@Component({
  selector: 'app-add-prize',
  templateUrl: './add-prize.component.html',
  styleUrls: ['./add-prize.component.css']
})
export class AddPrizeComponent implements OnInit {

  constructor(
    private communityComponent: CommunityComponent,
    private apollo: Apollo,
  ) { }

  ngOnInit() {
  }

  addPrize(name, description, karma) {
    this.apollo.mutate<any>({ mutation: createPrize(this.communityComponent.group, name, description, karma) }).subscribe();
    this.communityComponent.getData();
    this.communityComponent.showAddPrize();
  }

}
