import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <!-- loading bar for router -->
    <ngx-loading-bar></ngx-loading-bar>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent { }
