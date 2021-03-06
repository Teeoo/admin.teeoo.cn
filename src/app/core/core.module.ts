import { NgModule, SkipSelf, Optional } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { PagesModule } from '../pages/pages.module';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    PagesModule,
    LoadingBarRouterModule,
    AppRoutingModule
  ],
  exports: [
    BrowserModule,
    CommonModule,
    SharedModule,
    LoadingBarRouterModule,
    AppRoutingModule
  ]
})
export class CoreModule {
  constructor(@SkipSelf() @Optional() core: CoreModule) {
    if (core) {
      throw new Error(`${CoreModule.name} has already been loaded. Import Core modules in the AppModule only.`);
    }
  }
}
