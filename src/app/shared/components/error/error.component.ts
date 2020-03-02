import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.styl']
})
export class ErrorComponent implements OnInit {

  @Input() code:string
  @Input() title:string
  @Input() message:string

  constructor() { }

  ngOnInit(): void {
  }

}
