import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { RootObject, SignIn } from '@models/auth.model';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs';
import { QUERY_SIGNIN } from '@shared/graphql/queries/auth-queries';

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
      query: QUERY_SIGNIN,
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

  public logout() {
    localStorage.removeItem('auth')

    this.user = null;

    this.currentSubject.next(null);
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
