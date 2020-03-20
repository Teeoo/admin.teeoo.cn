import { SignIn } from 'src/app/models/auth.model';
import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { NotifyService } from '../../shared/components/notify/notify.service';
import { GraphQLError } from 'graphql';

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
    private _notyf: NotifyService,
    private authService: AuthService
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
    this.authService
      .SignIn(this.loginForm.value)
      .subscribe(
        (result: SignIn) => {
          this._notyf.info(`提示`, `欢迎 ${result.User.name} 回来,上次登录时间 ${new Date(result.User.lastTime).getFullYear()}-${new Date(result.User.lastTime).getMonth() + 1}-${new Date(result.User.lastTime).getDate()}`)
          this.router.navigateByUrl(this.authService.redirectUrl ?? `/`)
        },
        err => { }
      )
  }
}
