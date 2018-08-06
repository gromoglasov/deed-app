import { Component, OnInit } from '@angular/core';
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import { CommunityComponent } from '../community/community.component';
import { MenuService } from '../menu.service';
function createTask(title, content, points, group) {
  return gql`
    mutation {
      createTask(
        group: "${group}"
        title: "${title}"
        content: "${content}"
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYj1pL1Z0wPCagDhG93HyaXFClCA-d5jwuRDspPoNMNRcvfdFn"
        status: "To do"
        points: ${points}
      ) {
        _id
      }
    }
  `
} ;

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  submit(title, content, points) {
    this.apollo.mutate<any>({ mutation: createTask(title, content, points, this.communityComponent.group) }).subscribe();
    this.menuService.addTaskFunc();
    this.communityComponent.getData();
    this.communityComponent.addTaskFunc();
  }

  constructor(
      private menuService: MenuService,
      private apollo: Apollo,
      private communityComponent: CommunityComponent,
    ) { }

  ngOnInit() {
  }

}
