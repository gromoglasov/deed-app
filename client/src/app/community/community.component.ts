import { Component, OnInit } from '@angular/core';
import { Task } from '../task-class';
import { Group } from '../group-class';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MenuService } from '../menu.service';
import { LoginService } from '../login.service';
import { Location } from '@angular/common';
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import { Subscription } from "apollo-client/util/Observable";
import { User } from './../user-class';
import { Prize } from './../prize-class';
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
          prizes {
            name
            image
            desc
            points
          }
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
    this.router.navigateByUrl('/profile');
  }
  group: string;
  tasks: Task[];
  prizes: Prize[];
  loading: boolean;
  groupImage: string;
  user: User;
  data: object;

  private querySubscription: Subscription;
  private querySubscription2: Subscription;
  addTask: boolean = false;
  showPrizes: boolean = false;
  addMenu: boolean = false;
  addUser: boolean = false;
  addPrize: boolean = false;
  taskBool: boolean = true;
  queryWatcher: any;
  queryWatcher2: any;
  counter: number = 1;

  showPrizesFunc() { //toggles display of Prizes
    this.queryWatcher2.refetch();
    if (this.addTask) this.addTask = !this.addTask;
    if (this.addMenu) this.addMenu = !this.addMenu;
    if (this.addUser) this.addUser = !this.addUser;
    if (this.addPrize) this.addPrize = !this.addPrize;
    if (this.taskBool) this.taskBool = !this.taskBool;
    this.showPrizes = !this.showPrizes;
      if (!this.addTask && !this.showPrizes && !this.addMenu && !this.addUser && !this.addPrize && !this.taskBool) this.taskBool = !this.taskBool;
  }

  addTaskFunc() { //toggles display of new Task
    if (this.showPrizes) this.showPrizes = !this.showPrizes;
    if (this.addMenu) this.addMenu = !this.addMenu;
    if (this.addUser) this.addUser = !this.addUser;
    if (this.addPrize) this.addPrize = !this.addPrize;
    if (this.taskBool) this.taskBool = !this.taskBool;
    this.addTask = !this.addTask;
    if (!this.addTask && !this.showPrizes && !this.addMenu && !this.addUser && !this.addPrize && !this.taskBool) this.taskBool = !this.taskBool;
  }

  showAddMenu() {
    if (this.addTask || this.addUser || this.addPrize) this.addMenu = this.addMenu;
    else this.addMenu = !this.addMenu;
    if (this.addTask) this.addTask = !this.addTask;
    if (this.showPrizes) this.showPrizes = !this.showPrizes;
    if (this.addUser) this.addUser = !this.addUser;
    if (this.addPrize) this.addPrize = !this.addPrize;
    if (this.taskBool) this.taskBool = !this.taskBool;
    if (!this.addTask && !this.showPrizes && !this.addMenu && !this.addUser && !this.addPrize && !this.taskBool) this.taskBool = !this.taskBool;
    console.log(this.prizes);
  }

  showAddUser() {
    if (this.addTask) this.addTask = !this.addTask;
    if (this.showPrizes) this.showPrizes = !this.showPrizes;
    if (this.addMenu) this.addMenu = !this.addMenu;
    if (this.addPrize) this.addPrize = !this.addPrize;
    if (this.taskBool) this.taskBool = !this.taskBool;
    this.addUser = !this.addUser;
    if (!this.addTask && !this.showPrizes && !this.addMenu && !this.addUser && !this.addPrize && !this.taskBool) this.taskBool = !this.taskBool;
  }

  showAddPrize() {

    if (this.addTask) this.addTask = !this.addTask;
    if (this.showPrizes) this.showPrizes = !this.showPrizes;
    if (this.addMenu) this.addMenu = !this.addMenu;
    if (this.addUser) this.addUser = !this.addUser;
    if (this.taskBool) this.taskBool = !this.taskBool;
    this.addPrize = !this.addPrize;
      if (!this.addTask && !this.showPrizes && !this.addMenu && !this.addUser && !this.addPrize && !this.taskBool) this.taskBool = !this.taskBool;
  }


  getTasks () {
    this.queryWatcher = this.apollo
      .watchQuery<any>({ query: getquery(this.group) })
    this.querySubscription = this.queryWatcher
      .valueChanges.subscribe(({ data, loading }) => {
        this.loading = loading;
        let notYetCompleted = [];
        for (let i = 0, k = 0; i < data.allTasks.length - k; i++) {
          if(data.allTasks[i].status !== "completed") notYetCompleted.push(data.allTasks[i]);
        }
        this.tasks = notYetCompleted;
        console.log(this.tasks.length);
      });
  }

  getGroupInfo () {
    this.queryWatcher2 = this.apollo
      .watchQuery<any>({ query: getqueryimage(this.group) })
    this.querySubscription2 = this.queryWatcher2
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.loading = loading;
        console.log(this.tasks);
        this.prizes = data.allGroups[0].prizes;
        this.groupImage = data.allGroups[0].icon;
      })
  }

  removeTask (index) {
    // this.tasks.splice(index, 1);
    this.queryWatcher.refetch();
  }

  taskAdded (task) {
    this.queryWatcher.refetch();
  }

  prizeAdded (prize) {
    this.queryWatcher2.refetch();
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
    this.querySubscription2.unsubscribe();
  }

  changeUserPoints(index) {
    // console.log(this.user.karmas[0].karmaPoint);
    if (this.user != this.loginService.getUserInfo()) {
    this.user = this.loginService.getUserInfo();
    this.counter--;
    }
  }

  constructor(
    private menuService: MenuService,
    private loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private apollo: Apollo,
  ) {
    this.group = this.route.snapshot.params.group;
  }

  ngOnInit() {
    if (this.tasks === undefined) {
      this.getTasks();
      this.getGroupInfo();
    }
    this.user = this.loginService.getUserInfo();
    if (this.user === undefined || this.apollo === undefined)  this.router.navigateByUrl('/');
  }

}
