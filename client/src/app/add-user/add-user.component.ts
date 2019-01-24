import { Component, OnInit } from '@angular/core';
import { CommunityComponent } from '../community/community.component';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(
    private communityComponent: CommunityComponent,
  ) { }

  ngOnInit() {
  }

  inviteUser() {
    this.communityComponent.showAddUser();
  }

}
