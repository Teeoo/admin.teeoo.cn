import { SignIn } from './../../models/auth.model';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import gql from 'graphql-tag';
import { RootObject } from '../../models/auth.model';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public redirectUrl: string;

  private user: SignIn

  public currentSubject: BehaviorSubject<SignIn>;

  public currentUser: Observable<SignIn>

  constructor(private apollo: Apollo) {
    this.currentSubject = new BehaviorSubject<SignIn>(JSON.parse(localStorage.getItem('auth')))
    this.currentUser = this.currentSubject.asObservable()
  }

  public SignIn(data: { name: string, password: string }) {
    return this.apollo.watchQuery<RootObject>({
      query: gql`
      query($data: LoginUserInput!) {
        SignIn(data: $data) {
          accessToken
          tokenType
          expiresIn
          User {
            id
            order
            desc
            createdAt
            updatedAt
            name
            email
            avatar
            url
            screenName
            exInfo
            lastIp
            lastTime
          }
        }
      }
      `,
      variables: {
        data
      }
    })
      .valueChanges
      .pipe(
        map(result => {
          this.user = result.data.SignIn
          this.currentSubject.next(this.user)
          localStorage.setItem('auth', JSON.stringify(this.user))
          return this.user
        })
      )
  }

  public get authInfo(): SignIn | {} {
    return this.user?.User ?? {}
  }

  public get token(): string {
    return this.user?.accessToken ?? ''
  }

  public get currentUserValue(): SignIn {
    return this.currentSubject.value;
  }
}
