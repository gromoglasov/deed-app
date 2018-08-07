import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CommunityComponent } from './community/community.component';
import { ProfileComponent } from './profile/profile.component';
import { TaskComponent } from './task/task.component';
import { AppRoutingModule } from './/app-routing.module';
import { MiniCommunityComponent } from './mini-community/mini-community.component';
import { SignupComponent } from './signup/signup.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { PrizesComponent } from './prizes/prizes.component';
import { AddMenuComponent } from './add-menu/add-menu.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AddPrizeComponent } from './add-prize/add-prize.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { SettingsComponent } from './settings/settings.component';
import { PrizeComponent } from './prize/prize.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CommunityComponent,
    ProfileComponent,
    TaskComponent,
    MiniCommunityComponent,
    SignupComponent,
    AddTaskComponent,
    PrizesComponent,
    AddMenuComponent,
    AddUserComponent,
    AddPrizeComponent,
    LeaderboardComponent,
    StatisticsComponent,
    SettingsComponent,
    PrizeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(
    apollo: Apollo,
    httpLink: HttpLink
  ) {
    apollo.create({
      link: httpLink.create({ uri: 'http://localhost:3000/graphql'}),
      cache: new InMemoryCache()
    })
  }
}
