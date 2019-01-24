import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../task-class';
import { ActivatedRoute } from '@angular/router';
import { CommunityComponent } from '../community/community.component';
import { Location } from '@angular/common';
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import { Subscription } from "apollo-client/util/Observable";


function changeTaskStatus(id) {
  return gql`
    mutation {
      updateTask(
        _id: "${id}"
        input: {
          status: "completed"
          userCompleted: "isadora"
          prove: {
            image: "none"
            text: "none"
          }
        }
      ) {
        _id
      }
    }
  `
} ;

function addKarma(id, points) {
  return gql`
    mutation {
      updateTaskPoints(
        _id: "${id}"
        input: {
          points: ${points}
        }
      ) {
        _id
      }
    }
  `
}

function deductKarma(user, group, points, image) {
  return gql`
    mutation {
      updateKarma(
        userName: "${user}"
        input: {
          group: "${group}"
          image: "${image}"
          karmaPoint: ${points}
        }
      ) {
        _id
      }
    }
  `
}


@Component({
  selector: "app-task",
  templateUrl: "./task.component.html",
  styleUrls: ["./task.component.css"]
})
export class TaskComponent implements OnInit {
  @Input() task: Task;
  _id: string;
  group: string;
  points: number;
  content: string;
  status:boolean = false;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private apollo: Apollo,
    private communityComponent: CommunityComponent,
  ) {
    this.task = this.route.snapshot.params.task;
  }

  addPoints (id, points) {
    this.points = this.points + 1;
    this.apollo.mutate<any>({ mutation: addKarma(this._id, this.points) }).subscribe();
    let index = 0;
    for (; index < this.communityComponent.user.karmas.length; index++) if (this.communityComponent.user.karmas[index].group == this.group) break;
    let userPoints = this.communityComponent.user.karmas[index].karmaPoint - this.communityComponent.counter;
    this.communityComponent.counter++;
    this.apollo.mutate<any>({ mutation: deductKarma(this.communityComponent.user.userName, this.group, userPoints, this.communityComponent.groupImage) }).subscribe();
    this.communityComponent.changeUserPoints(index);
  }

  completeTask() {
    let kindex = 0;
    for (; kindex < this.communityComponent.user.karmas.length; kindex++) if (this.communityComponent.user.karmas[kindex].group == this.group) break;
    let userPoints = this.communityComponent.user.karmas[kindex].karmaPoint + this.points;
    this.apollo.mutate<any>({ mutation: deductKarma(this.communityComponent.user.userName, this.group, userPoints, this.communityComponent.groupImage) }).subscribe();
    let index = 0;
    for(; index<this.communityComponent.tasks.length; index++) if (this._id == this.communityComponent.tasks[index]._id) break;
    this.apollo.mutate<any>({ mutation: changeTaskStatus(this.task._id) }).subscribe();
    this.communityComponent.removeTask(index);
  }

  ngOnInit() {
    this.points =  this.task.points;
    this._id = this.task._id;
    this.group = this.task.group;
  }
}
