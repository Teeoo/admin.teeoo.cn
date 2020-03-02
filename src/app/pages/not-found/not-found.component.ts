import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `<app-error
      code="404"
      [title]="'Page not found!'"
      [message]="'This is not the web page you are looking for.'"
  ></app-error>`,
  styleUrls: ['./not-found.component.styl']
})
export class NotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
