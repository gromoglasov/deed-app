import { Component, OnInit } from '@angular/core';
import { getLocaleDateFormat } from '@angular/common';
import { LoginService } from '../login.service';
import { Apollo } from 'apollo-angular';
import { ApolloLink, RequestHandler, Operation, NextLink, FetchResult } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { Router } from '@angular/router';
import gql  from 'graphql-tag';
import { User } from '../user-class';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private authLink: ApolloLink;
  private authcb: any = (_:any, { headers }: any): any => { console.log('default'); return {}};

  constructor(
    private apollo: Apollo,
    private loginService: LoginService,
    private router:Router,
    private httpLink: HttpLink,

  ) {
    const authLink = new ApolloLink((operation, forward):any => {
      const { ...request } = operation;

      return new Observable(observer => {
        let handle;
        Promise.resolve(request)
          .then(req => this.authcb(req, operation.getContext()))
          .then(operation.setContext)
          .then(() => {
            handle = forward(operation).subscribe({
              next: observer.next.bind(observer),
              error: observer.error.bind(observer),
              complete: observer.complete.bind(observer),
            });
          })
          .catch(observer.error.bind(observer));

        return () => {
          if (handle) handle.unsubscribe();
        }
      })
    });
    this.authLink = authLink.concat(this.httpLink.create({ uri: 'http://localhost:3000/graphql'}));
  }

  login(e, username, password) {
    e.preventDefault();
    this.initialiseConnection(username, password);
    this.loginService.loginUser(username);
    e.srcElement[0].value = '';
    e.srcElement[1].value = '';
  }

  autoLogin(username) {
    this.loginService.loginUser(username);
  }

  initialiseConnection(username, password) {
    this.authcb = (_, { headers }):any => {
      const token = localStorage.getItem('token');
      const encrypted = btoa(`${username}:${password}`)
      const auth = token ? `Bearer ${token}` : `Basic ${encrypted}`;
      return {
        headers: {
          ...headers,
          authorization: auth,
        }
      }
    };

    const apolloClient = this.apollo.getClient();
    if (!apolloClient)  {
      this.apollo.create({
        link: this.authLink,
        cache: new InMemoryCache()
      })
    } else {
      apolloClient.link = this.authcb;
    }
  }

  ngOnInit() {
    if(localStorage.getItem('token')) {
      this.initialiseConnection('', '');
      this.autoLogin('CONVERT_FROM_TOKEN');
    }
  }


};
