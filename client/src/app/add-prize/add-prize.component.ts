import { Component, OnInit } from '@angular/core';
import { CommunityComponent } from './../community/community.component';
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import { Prize } from '../prize-class';
function createPrize(group, name, description, points) {
  return gql`
    mutation {
      addPrize(
        name: "${group}"
        input: {
          name: "${name}"
          desc: "${description}"
          points: ${points}
          image: "https://banner2.kisspng.com/20180323/kte/kisspng-prize-competition-award-business-cricket-golden-cup-5ab5a5a55bab57.3099073215218538613755.jpg"
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
    let prize = new Prize(name, "https://banner2.kisspng.com/20180323/kte/kisspng-prize-competition-award-business-cricket-golden-cup-5ab5a5a55bab57.3099073215218538613755.jpg", description, karma);
    this.communityComponent.prizeAdded(prize);
    this.communityComponent.showAddPrize();
  }

}
