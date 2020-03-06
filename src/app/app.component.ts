import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <simple-notifications></simple-notifications> 
    <router-outlet></router-outlet>
  `,
})
export class AppComponent { }
