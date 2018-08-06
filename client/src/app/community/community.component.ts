import { Component, OnInit } from '@angular/core';
import { DeedService } from '../deed.service'
import { Task } from '../task-class';
import { Group } from '../group-class';
import { ActivatedRoute } from '@angular/router';
import { MenuService } from '../menu.service';
import { Location } from '@angular/common';

import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import { Subscription } from "apollo-client/util/Observable";


function getquery (name){
    return gql`
    {
      allTasks(group: "${name}") {
        _id
        group
        title
        content
        image
        status
        points
        userCompleted
        prove {
          text
          image
        }
      }
    }
  `;
}

function getqueryimage(group) {
    return gql`
      {
        allGroups(name: "${group}") {
          _id
          name
          type
          users
          delegates
          tasks
          icon
          coverPhoto
        }
      }
    `;
}

@Component({
  selector: "app-community",
  templateUrl: "./community.component.html",
  styleUrls: ["./community.component.css"]
})
export class CommunityComponent implements OnInit {
  goBack(): void {
    this.location.back();
  }
  group: string;
  tasks: Task[];
  loading: boolean;
  groupImage: string;

  private querySubscription: Subscription;

  // status: boolean = false;
  status2: boolean = false;

  showForm2() { //toggles display of Prizes
    if (this.menuService.addTask) this.menuService.addTask = !this.menuService.addTask
    this.status2 = !this.status2;
  }

  showForm() { //toggles display of new Task
    this.menuService.addTaskFunc();
    console.log(this.menuService.addTask);
  }


  getData() {
    this.querySubscription = this.apollo
      .watchQuery<any>({ query: getquery(this.group) })
      .valueChanges.subscribe(({ data, loading }) => {
        this.loading = loading;
        let notYetCompleted = [];
        for (let i = 0, k = 0; i < data.allTasks.length - k; i++) {
          if(data.allTasks[i].status !== "completed") notYetCompleted.push(data.allTasks[i]);
        }
        this.tasks = notYetCompleted;
      });
  }

  getImage() {
    this.querySubscription = this.apollo
      .watchQuery<any>({ query: getqueryimage(this.group) })
      .valueChanges.subscribe(({ data, loading }) => {
        this.loading = loading;
        this.groupImage = data.allGroups[0].icon;
      });
  }

  constructor(
    private menuService: MenuService,
    private deedService: DeedService,
    private route: ActivatedRoute,
    private location: Location,
    private apollo: Apollo
  ) {
    this.group = this.route.snapshot.params.group;
  }

  ngOnInit() {
    this.getData();
    this.getImage();
  }
}
