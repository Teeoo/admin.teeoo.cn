import { Apollo } from 'apollo-angular';
import { Component, OnInit } from '@angular/core';
import gql from 'graphql-tag';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.styl']
})
export class DashboardComponent implements OnInit {

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.apollo.watchQuery({
      query: gql`
      query{
        getAllCategory{
          id
          order
          desc
          createdAt
          updatedAt
          label
          slug
          cateNum
          archNum
          children
          parent
        }
      }`
    }).valueChanges.subscribe()
  }

}
