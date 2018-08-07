import { Component, OnInit } from '@angular/core';
import { DeedService } from '../deed.service'
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
    this.location.back();
  }
  group: string;
  tasks: Task[];
  prizes: Prize[];
  loading: boolean;
  groupImage: string;
  user: User;
  data: object;

  private querySubscription: Subscription;

  addTask: boolean = false;
  showPrizes: boolean = false;
  addMenu: boolean = false;
  addUser: boolean = false;
  addPrize: boolean = false;
  taskBool: boolean = true;


  showPrizesFunc() { //toggles display of Prizes
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

  getImage () {
    this.querySubscription = this.apollo.watchQuery<any>({
       query: getqueryimage(this.group)
     })
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.loading = loading;
        this.prizes = data.allGroups[0].prizes;
        this.groupImage = data.allGroups[0].icon;
        console.log(this.prizes);
        console.log(this.groupImage)
      })
  }


  constructor(
    private menuService: MenuService,
    private deedService: DeedService,
    private loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private apollo: Apollo,
  ) {
    this.group = this.route.snapshot.params.group;
  }

  ngOnInit() {
    this.getData();
    this.getImage();
    this.user = this.loginService.getUserInfo();
    if (this.user === undefined) this.router.navigateByUrl('/');
  }
}
