import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NgModule } from '@angular/core';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { environment } from '../../../environments/environment';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { NotifyService } from '../components/notify/notify.service';
import { HttpHeaders } from '@angular/common/http';

const uri = environment.GraphQL;

@NgModule({
  exports: [ApolloModule, HttpLinkModule]
})
export class GraphQLModule {
  constructor(
    apollo: Apollo,
    httpLink: HttpLink,
    private _notyf: NotifyService,
    private authService: AuthService,
    private router: Router
  ) {

    const auth: ApolloLink = new ApolloLink((operation, forward) => {
      operation.setContext({
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.authService.currentUserValue?.accessToken}`
        })
      });
      return forward(operation);
    });
    const link = onError(({ graphQLErrors, networkError }) => {
      graphQLErrors?.map(({ message }) => {
        const messageError: any | string = message;
        const error = messageError.message;
        this._notyf.error('GraphQL error', error ?? messageError.error);
        if (messageError.statusCode === 401) {
          this._notyf.error('GraphQL error', `登录失效,请重新登录!`);
          this.router.navigateByUrl('login')
          this.authService.logout()
        }
        console.log(
          '%c[GraphQL error]',
          'background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;',
          JSON.stringify(message)
        );
      });
      if (networkError) {
        console.log(
          '%c[Network error]',
          'background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;',
          networkError
        );
      }
    });
    apollo.create({
      link: ApolloLink.from([link, auth, httpLink.create({ uri })]),
      cache: new InMemoryCache(),
      // defaultOptions: {
      //   watchQuery: {
      //     fetchPolicy: 'network-only',
      //     errorPolicy: 'all'
      //   }
      // }
    });
  }
}
