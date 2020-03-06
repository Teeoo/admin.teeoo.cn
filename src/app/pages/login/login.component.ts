import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { NotificationsService } from 'angular2-notifications';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.styl']
})
export class LoginComponent implements OnInit {
  public today: number = new Date().getFullYear();

  public hitokoto: any;

  public loginForm: FormGroup;

  constructor(
    private formbuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private apollo: Apollo,
    private _notyf: NotificationsService
  ) {
    this.loginForm = this.formbuilder.group({
      name: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.http.get('https://v1.hitokoto.cn').subscribe((data: any) => {
      this.hitokoto = data;
    });
  }
  onSubmit() {
    this.apollo
      .watchQuery({
        query: gql`
          query($data: LoginUserInput!) {
            SignIn(data: $data) {
              accessToken
              tokenType
              expiresIn
              User {
                name
              }
            }
          }
        `,
        variables: {
          data: this.loginForm.value
        }
      })
      .valueChanges
      .subscribe(
        ({ data, errors }) => {
          if (!errors) {
            this._notyf.success('提示', '欢迎回来!')
            this.router.navigate(['/']);
          }
        }
      );
  }
}
