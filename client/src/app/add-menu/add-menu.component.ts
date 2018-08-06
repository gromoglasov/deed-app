import { Component, OnInit } from '@angular/core';
import { CommunityComponent } from './../community/community.component';

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.css']
})
export class AddMenuComponent implements OnInit {

  constructor(
    private communityComponent: CommunityComponent,
  ) { }

  ngOnInit() {
  }

  showAddTask() {
    this.communityComponent.addTaskFunc();
  }

  showAddUser() {


  }

  showAddPrizes() {


  }

}
